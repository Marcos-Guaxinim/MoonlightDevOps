import { ArrowLeftIcon } from "@phosphor-icons/react";
import { Card, CardHeader } from "../../../components/common/Generic/Card";
import { Button } from "../../../components/common/Generic/Button/Button";
import { useLocation, useParams } from "react-router-dom";
import { UserForm } from "./sections/UserForm";
import type { UserResponseDTO } from "../../../@types/user/user.dto";
import { useFetchUser } from "../../../hooks/fetchItems/fetchOne/useFetchUser";


export function UserEditPage() {
    const { id_user } = useParams();
    const { state } = useLocation();

    function handleUser() : UserResponseDTO | undefined {
      const userFromState: UserResponseDTO | null = state != null ? state.user : null;

      const { user: userFromApi } = useFetchUser(Number(id_user), {
        enabled: state == null
      });

      return userFromState ?? userFromApi;
    }

    const user = handleUser();
    if(!user) return;

    return(
        <main className="py-10 min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base">
            <Card variant="primary" className="flex flex-col mb-10 gap-10 border py-8 container justify-self-center">
                <CardHeader className="flex items-center gap-4">
                    <Button as="link" href="/admin/users" icon={<ArrowLeftIcon size={32} weight="thin" />} className="bg-white/10 p-2 text-white rounded-xl hover:bg-white/20"/>
                    <h1 className="text-2xl">Editar Usuario:</h1>
                </CardHeader>
                <hr />
                <UserForm mode="edit" user={user}/>
            </Card>
        </main>
    )
}
