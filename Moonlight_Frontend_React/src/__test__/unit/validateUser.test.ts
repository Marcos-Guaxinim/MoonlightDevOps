import { describe, it, expect } from 'vitest';
import { validateUser } from '../../utils/Validation/Admin/ValidateUser';

describe('validateUser Unit Test', () => {

  const validUser = {
    name: 'Arthur Pelito',
    email: 'arthur@teste.com',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    cpf: '12345678901', // Supondo que isCPFValid aceite apenas números
    id_roles: [1]
  };

  it('deve retornar isValid: false se as senhas não coincidirem', () => {
    const data = { ...validUser, confirmPassword: 'outraSenha' };
    const { isValid } = validateUser(data);
    expect(isValid).toBe(false);
  });

  it('deve retornar isValid: false se o e-mail for inválido', () => {
    const data = { ...validUser, email: 'email-invalido' };
    const { isValid } = validateUser(data);
    expect(isValid).toBe(false);
  });

  it('deve retornar isValid: false se o nome exceder 16 caracteres', () => {
    const data = { ...validUser, name: 'Um Nome Muito Grande Que Passa do Limite' };
    const { isValid } = validateUser(data);
    expect(isValid).toBe(false);
  });

  it('deve retornar isValid: false se a senha for fraca (strengthLevel <= 4)', () => {
    // Supondo que uma senha curta resulte em um nível baixo de força
    const data = { ...validUser, password: '123', confirmPassword: '123' };
    const { isValid } = validateUser(data);
    expect(isValid).toBe(false);
  });

  it('deve retornar isValid: false se algum campo obrigatório estiver vazio', () => {
    const data = { ...validUser, cpf: '' };
    const { isValid } = validateUser(data);
    expect(isValid).toBe(false);
  });

  it('deve validar corretamente o limite de caracteres do e-mail (max 30)', () => {
    const data = { ...validUser, email: 'um_email_muito_longo_mesmo_@teste.com' }; // > 30 caracteres
    const { isValid } = validateUser(data);
    expect(isValid).toBe(false);
  });
});
