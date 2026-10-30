import type { AuthUserResponseDTO } from "../auth/auth.dto";
import type { ApiResponse } from "../common/apiResponse";
import type { RoleName } from "../role/role.types";

export interface UserResponseDTO {
  id_user: number;
  name: string;
  email: string;
  cpf: string;
  roles: RoleName[]
}

export interface UpdateMeResponseDTO extends ApiResponse {
    user: AuthUserResponseDTO
}
