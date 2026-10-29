import { describe, it, expect, vi } from 'vitest';
import { isPriceValid, maskPrice } from '../../utils/Validation/dataRules/Game/gamePrice';
import { validateGame } from '../../utils/Validation/Admin/ValidateGame';

// Mock das regras individuais para isolar o teste do validateGame
vi.mock('../dataRules/Game/gameTitle', () => ({
  isTitleValid: vi.fn((title) => title.length > 0 && title.length <= 50)
}));

describe('Game Validation Logic', () => {

  describe('isPriceValid', () => {
    it('deve aceitar preços positivos e zero', () => {
      expect(isPriceValid("49.90")).toBe(true);
      expect(isPriceValid("0")).toBe(true);
    });

    it('deve rejeitar preços negativos ou strings não numéricas', () => {
      expect(isPriceValid("-10")).toBe(false);
      expect(isPriceValid("grátis")).toBe(false);
    });
  });

  describe('maskPrice (Máscara de Input)', () => {
    it('deve formatar "4990" para "49.90"', () => {
      expect(maskPrice("4990")).toBe("49.90");
    });

    it('deve retornar "0.00" se o valor for vazio', () => {
      expect(maskPrice("")).toBe("0.00");
    });
  });

  describe('validateGame', () => {
    it('deve validar um jogo com dados corretos', () => {
      const validGame = {
        title: 'Elden Ring',
        price: '249.90',
        launch_date: '2022-02-25',
        active: "false"
      };

      const result = validateGame(validGame);
      expect(result.isValid).toBe(true);
    });

    it('deve invalidar se o preço for negativo', () => {
      const invalidGame = {
        title: 'Counter Strike',
        price: '-1',
        launch_date: '2023-09-27',
        active: false
      };

      const result = validateGame(invalidGame);
      expect(result.isValid).toBe(false);
    });

    it('deve invalidar se a data de lançamento estiver vazia', () => {
      const result = validateGame({
        title: 'Game',
        price: '10',
        launch_date: ' ', // Trim vai pegar isso
        active: false
      });
      expect(result.isValid).toBe(false);
    });
  });
});
