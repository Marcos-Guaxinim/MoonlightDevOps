import { useEffect, useState } from "react";
import type { CategoryResponseDTO } from "../../../@types/category/category.dto";
import { fetchCategoryById } from "../../../services/realServices/category.service";
import toast from "react-hot-toast";

type UseFetchCategoryOptions = {
  enabled?: boolean;
};

export function useFetchCategory(id_category: number, options: UseFetchCategoryOptions = {}){
    const { enabled = true } = options;
    const [category, setCategory] = useState<CategoryResponseDTO>();
    const [isLoading, setIsLoading] = useState(enabled);

    useEffect(() => {
        if (!enabled) return;

        fetchCategoryById(id_category)
        .then(response => {
            setCategory(response);
        }).catch(() =>
            toast.error("Não foi possivel encontrar a categoria ou ele não existe.")
        ).finally(() =>
            setIsLoading(false)
        );
    }, [id_category]);

    return { category, isLoading }
}
