import { useUpdateUrlParam } from "../../updateUrlParam/useUpdateUrlParam";

export function useUserFilters() {
  const { searchParams, updateURLParam, updateURLParams} = useUpdateUrlParam();

  const filters = {
    name: searchParams.get("name") ?? undefined,
    cpf: searchParams.get("cpf") ?? undefined,
    email: searchParams.get("email") ?? undefined,
    role: searchParams.get("role") ?? undefined,
    onChangeCpf: (cpf: string) => updateURLParam("cpf", cpf),
    onChangeEmail: (email: string) => updateURLParam("email", email),
    onChangeRole: (role: string) => updateURLParam("role", role),
    onConfirmFilters: (cpf: string, email: string) =>
      updateURLParams({ cpf: cpf, email: email, }),
    onCleanUpFilters: () =>
      updateURLParams({ cpf: undefined, email: undefined }),
  };

  return {
    filters
  };
}
