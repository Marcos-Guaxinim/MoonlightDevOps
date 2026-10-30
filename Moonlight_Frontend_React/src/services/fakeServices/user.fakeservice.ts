
import type { ApiResponse } from "../../@types/common/apiResponse";
import type { PaginatedResponse } from "../../@types/common/pagination";
import type { UpdateMeResponseDTO, UserResponseDTO } from "../../@types/user/user.dto";
import type { UpdateMePayload, UserPayload } from "../../@types/user/user.payload";
import { isCPFValid } from "../../utils/Validation/dataRules/User/userCpf";
import { isEmailValid } from "../../utils/Validation/dataRules/User/userEmail";
import { mockUserItems } from "./mockItems/mockUserItems";

export async function fetchUsersMock(page: number, limit: number): Promise<PaginatedResponse<UserResponseDTO>>{
    await new Promise(resolve => setTimeout(resolve, 500));
    const offset = (page - 1) * limit;
    const paginated = mockUserItems.slice(offset, offset + limit); // fatia o array igual o OFFSET do SQL

    return {
        data: paginated,
        total: mockUserItems.length,
        page,
        totalPages: Math.ceil(mockUserItems.length / limit)
    };
}

export async function fetchUserByIdMock(id_user: number): Promise<UserResponseDTO> {
  await new Promise(resolve => setTimeout(resolve, 500));

    const user = mockUserItems.find(user => user.id_user === id_user);

    if(!user){
      throw new Error("Usuario não encontrado");
    }

    return user;
}

export async function createUserMock(data: UserPayload): Promise<ApiResponse>{
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('[MOCK] createUser:', data);

    if(!data.name || data.name.length > 16 || data.name == "" ){
        throw new Error("Nome de Usuário inválido ou obrigatório!");
    }

    if(!data.email || !isEmailValid(data.email)){
        throw new Error("Email inválido ou obrigatório!");
    }

    const mockedDatabase = ["juan@yahoo.com"];
    const userExists = mockedDatabase.includes(data.email.toLowerCase());

    if (userExists) {
        throw new Error('Usuário já existe com esse email!');
    }

    if(!isCPFValid(data.cpf)){
        throw new Error('CPF inválido!');
    }

    if(!data.password || data.password == "" || data.password.length > 16 || data.password.length < 8){
        throw new Error('Senha inválida ou obrigatória!');
    }

    return { message: "Usuário cadastrado com sucesso." };
}

export async function updateMeMock(data: UpdateMePayload): Promise<UpdateMeResponseDTO>{

    console.log('[MOCK] updateMe:', data);

    if(!data.name || data.name.length > 16 || data.name == "" ){
        throw new Error("Nome de Usuário inválido ou obrigatório!");
    }

    if(!isCPFValid(data.cpf)){
        throw new Error('CPF inválido!');
    }

    if(!data.password || data.password == "" || data.password.length > 16 || data.password.length < 8){
        throw new Error('Senha inválida ou obrigatória!');
    }

  return { message: "Usuário editado com sucesso.", user: { id_user: 4, name: data.name, email: "update@gmail.com", cpf: data.cpf, roles: ["customer"] } };
}
