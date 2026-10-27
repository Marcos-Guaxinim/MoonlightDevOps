import type { PaginatedQuery } from "../common/pagination";

export type UserPayload = {
  name: string;
  email: string;
  password?: string;
  cpf: string;
  id_roles: number[]
};


/***
 * Payload de Query Paginada de Usuario
 *
 * vai usar só nas tabelas de admin
 */

export interface UserPaginatedQueryPayload extends PaginatedQuery{
  name?: string | undefined,
  email?: string | undefined,
  cpf?: string | undefined,
  role?: string | undefined
}


export type UpdateMePayload = {
  name: string;
  password: string;
  cpf: string;
};
