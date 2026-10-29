import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { UserResponseDTO } from "../../../@types/user/user.dto";
import { fetchUserById } from "../../../services/realServices/user.service";

type UseFetchUserOptions = {
  enabled?: boolean;
};

export function useFetchUser(id_user: number, options: UseFetchUserOptions = {}){
    const { enabled = true } = options;
    const [user, setUser] = useState<UserResponseDTO>();
    const [isLoading, setIsLoading] = useState(enabled);

    useEffect(() => {
        if (!enabled) return;

        fetchUserById(id_user)
        .then(response => {
            setUser(response);
        }).catch(() =>
            toast.error("Não foi possivel encontrar o usuario ou ele não existe.")
        ).finally(() =>
            setIsLoading(false)
        );
    }, [id_user]);

    return { user, isLoading }
}
