// import type { RoleName } from "../../../../@types/role/role.types";

// export const ROLE_NAMES: readonly RoleName[] = ['customer', 'admin', 'studio'];

// export function isValidRoleName(roleName: string): roleName is RoleName {
//     return (ROLE_NAMES as readonly string[]).includes(roleName);
// }

// export function areValidRoleNames(rolesNames: string[]): rolesNames is RoleName[]{
//   return rolesNames.length > 0 && rolesNames.every(isValidRoleName);
// }

export function hasSelectedRole(roleIds: number[]): boolean {
    return roleIds.length > 0;
}
