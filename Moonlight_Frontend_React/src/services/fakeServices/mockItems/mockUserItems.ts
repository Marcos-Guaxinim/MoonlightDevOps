import type { UserResponseDTO } from "../../../@types/user/user.dto";

export const mockUserItems: UserResponseDTO[] = [
  {
    id_user: 1,
    name: "Admin Principal",
    email: "admin@sistema.com",
    cpf: "123.456.789-00",
    roles: ["admin"]
  },
  {
    id_user: 2,
    name: "João Silva",
    email: "joao.silva@email.com",
    cpf: "234.567.890-11",
    roles: ["customer"]
  },
  {
    id_user: 3,
    name: "Maria Oliveira",
    email: "maria.o@provedor.net",
    cpf: "345.678.901-22",
    roles: ["customer"]
  },
  {
    id_user: 4,
    name: "Suporte Técnico",
    email: "suporte@empresa.com",
    cpf: "456.789.012-33",
    roles: ["admin"]
  },
  {
    id_user: 5,
    name: "Carlos Eduardo",
    email: "cadu.dev@gmail.com",
    cpf: "567.890.123-44",
    roles: ["customer"]
  },
  {
    id_user: 6,
    name: "Ana Beatriz",
    email: "ana.beatriz@outlook.com",
    cpf: "678.901.234-55",
    roles: ["customer"]
  },
  {
    id_user: 7,
    name: "Gerente de Vendas",
    email: "vendas@lojaexemplo.com",
    cpf: "789.012.345-66",
    roles: ["admin"]
  },
  {
    id_user: 8,
    name: "Ricardo Souza",
    email: "ricardo.souza@yahoo.com",
    cpf: "890.123.456-77",
    roles: ["customer"]
  },
  {
    id_user: 9,
    name: "Luciana Costa",
    email: "lu.costa@tech.io",
    cpf: "901.234.567-88",
    roles: ["customer"]
  },
  {
    id_user: 10,
    name: "Fernando Mendes",
    email: "fernando.m@bol.com.br",
    cpf: "012.345.678-99",
    roles: ["customer"]
  }
];
