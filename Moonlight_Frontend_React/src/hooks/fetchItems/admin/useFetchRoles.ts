import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { RoleResponseDTO } from "../../../@types/role/role.dto";
import { fetchRoles } from "../../../services/realServices/role.service";

export function useFetchRoles() {
  const [roles, setRoles] = useState<RoleResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsLoading(true);
    fetchRoles()
      .then((response) => {
        if (isMounted) {
          setRoles(response || []);
          setIsLoading(false);
        }
      })
      .catch(() => {
        console.log(roles);
        toast.error("Não foi possivel carregar os Cargos.")
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { roles, isLoading };
}
