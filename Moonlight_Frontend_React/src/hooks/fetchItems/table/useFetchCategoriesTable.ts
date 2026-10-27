import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchPaginatedCategories } from "../../../services/realServices/category.service";
import type { CategoryPaginatedQueryPayload } from "../../../@types/category/category.payload";
import type { CategoryResponseDTO } from "../../../@types/category/category.dto";

export function useFetchCategoriesTable(query: CategoryPaginatedQueryPayload){
    const [categories, setCategories] = useState<CategoryResponseDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalRows, setTotalRows] = useState(0);
    const [internalPage, setInternalPage] = useState(1);
    const [version, setVersion] = useState(0);

    const {limit, name, random} = query

    useEffect(() => {
        setCategories([]);
        setInternalPage(1);
    }, [limit, name, random]);

    useEffect(() => {
        let isMounted = true;

        // eslint-disable-next-line react-hooks/exhaustive-deps
        setIsLoading(true)

        const queryPayload: CategoryPaginatedQueryPayload = {
            ...query,
            page: internalPage,
        };

        fetchPaginatedCategories(queryPayload)
          .then((response) => {
            if (isMounted) {

              if (internalPage > response.totalPages) {
                setInternalPage(internalPage - 1);
                return;
              }

              setCategories(response.data);
              setTotalRows(response.total);
            }
        }).catch(() =>
            toast.error("Não foi possivel carregar as categorias.")
        ).finally(() => {
            if(isMounted) setIsLoading(false)
        });
        return () => { isMounted = false; };
    }, [limit, internalPage, name, random, version]);

    const refetch = () => setVersion(v => v + 1);

    return { categories, isLoading, totalRows, internalPage, setInternalPage, refetch }
}
