import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameForm } from '../../hooks/validation/Admin/useGameForm'; // Ajuste o caminho se necessário

// 1. Mock do useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// 2. Mock dos serviços de Game (intercepta a chamada antes de carregar o arquivo real)
vi.mock('../../../services/realServices/game.service', () => ({
  createGame: vi.fn(() => Promise.resolve({ data: {} })),
  updateGame: vi.fn(() => Promise.resolve({ data: {} })),
}));

describe('useGameForm Integration', () => {
  it('deve inicializar com valores vazios no modo create', () => {
    const { result } = renderHook(() => useGameForm('create'));

    expect(result.current.fields.title).toBe("");
    expect(result.current.fields.price).toBe("0.00");
    expect(result.current.fields.active).toBe("true");
  });

  it('deve atualizar campos de texto corretamente', () => {
    const { result } = renderHook(() => useGameForm('create'));

    act(() => {
      result.current.setField('title')('Elden Ring');
    });

    expect(result.current.fields.title).toBe('Elden Ring');
  });

  it('deve gerenciar a seleção de categorias (toggleCategory)', () => {
    const { result } = renderHook(() => useGameForm('create'));

    act(() => {
      result.current.toggleCategory(1); // Adiciona
      result.current.toggleCategory(2); // Adiciona
    });
    expect(result.current.fields.categories).toEqual([1, 2]);

    act(() => {
      result.current.toggleCategory(1); // Remove
    });
    expect(result.current.fields.categories).toEqual([2]);
  });

  it('deve ativar o estado de loading e submetido ao tentar salvar um jogo válido', async () => {
    const initialData = {
      title: "Dark Souls",
      description: "You died",
      price: "150.00",
      image: "ds.jpg",
      banner_image: "ds_banner.jpg",
      link: "http://ds.com",
      launch_date: "2011-09-22",
      active: "true",
      categories: [1],
    };

    const { result } = renderHook(() => useGameForm('create', initialData));

    // Verificamos se o hook reconhece como válido
    expect(result.current.isValid).toBe(true);

    await act(async () => {
      result.current.handleSubmit();
    });

    expect(result.current.ui.submitted).toBe(true);
    expect(result.current.ui.loading).toBe(false);
  });
});
