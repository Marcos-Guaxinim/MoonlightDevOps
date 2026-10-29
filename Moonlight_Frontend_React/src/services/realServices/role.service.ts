import type { RoleResponseDTO } from "../../@types/role/role.dto";
import { api } from "../api";

export async function fetchRoles(): Promise<RoleResponseDTO[]> {

    const response = await api.get(`/api/roles`);
    return response.data;
}
