import type { ApiResponse } from "../../@types/common/apiResponse";
import type { PaginatedResponse } from "../../@types/common/pagination";
import type { UpdateMeResponseDTO, UserResponseDTO } from "../../@types/user/user.dto";
import type { UpdateMePayload, UserPaginatedQueryPayload, UserPayload } from "../../@types/user/user.payload";
import { sanitizeData } from "../../utils/sanitizer/sanitizer";
import { api } from "../api";
import { createUserMock, fetchUserByIdMock, updateMeMock } from "../fakeServices/user.fakeservice";


export async function fetchUsersPaginated(query: UserPaginatedQueryPayload): Promise<PaginatedResponse<UserResponseDTO>> {

    const response = await api.get(`/api/users/pag`, { params: query });
    return response.data;
}

export async function fetchUserById(id_user: number): Promise<UserResponseDTO> {
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return fetchUserByIdMock(id_user);
    }
    const response = await api.get(`/api/users/${id_user}`);
    return response.data;
}

export async function createUser(data: UserPayload): Promise<ApiResponse>{
    const cleanData = sanitizeData(data);
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return createUserMock(cleanData);
    }
    console.log(cleanData);
    const response = await api.post(`/api/users`, cleanData);
    return response.data;
}


export async function updateUser(id_user: number, data: UserPayload): Promise<ApiResponse> {
    const cleanData = sanitizeData(data);
    const response = await api.put(`/api/users/${id_user}`, cleanData);
    return response.data;
}

export async function deleteUser(id_user: number): Promise<ApiResponse> {
    const response = await api.delete(`/api/users/${id_user}`);
    return response.data;
}


// /me para edição permitida do usuario
export async function updateMe(data: UpdateMePayload): Promise<UpdateMeResponseDTO> {

    const cleanData = sanitizeData(data);
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return updateMeMock(cleanData);
    }

    const response = await api.put(`/api/users/me`, cleanData);
    return response.data;
}
