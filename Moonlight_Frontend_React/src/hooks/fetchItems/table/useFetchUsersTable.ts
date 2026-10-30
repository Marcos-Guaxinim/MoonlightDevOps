import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchUsersPaginated } from "../../../services/realServices/user.service";
import type { UserPaginatedQueryPayload } from "../../../@types/user/user.payload";
import type { UserResponseDTO } from "../../../@types/user/user.dto";

export function useFetchUsersTable(query: UserPaginatedQueryPayload){
    const [users, setUsers] = useState<UserResponseDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalRows, setTotalRows] = useState(0);
    const [internalPage, setInternalPage] = useState(1);
    const [version, setVersion] = useState(0);

    const {limit, cpf, email, name, role} = query

    useEffect(() => {
        setUsers([]);
        setInternalPage(1);
    }, [limit, cpf, email, name, role]);

    useEffect(() => {
        let isMounted = true;

        // eslint-disable-next-line react-hooks/exhaustive-deps
        setIsLoading(true)

        const queryPayload: UserPaginatedQueryPayload = {
            ...query,
            page: internalPage,
        };

        fetchUsersPaginated(queryPayload)
        .then((response) => {
          if (isMounted) {

            if (internalPage > response.totalPages) {
              setInternalPage(internalPage - 1);
              return;
            }

            setUsers(response.data);
            setTotalRows(response.total);
          }
        }).catch(() =>
            toast.error("Não foi possivel carregar os usuarios.")
        ).finally(() => {
            if(isMounted) setIsLoading(false)
        });
        return () => { isMounted = false; };

    }, [internalPage, limit, cpf, email, name, role, version]);

    const refetch = () => setVersion(v => v + 1);

    return { users, isLoading, totalRows, internalPage, setInternalPage, refetch }
}
