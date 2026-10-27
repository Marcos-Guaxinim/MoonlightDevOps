import { AddressBookIcon, CoffeeIcon, EnvelopeIcon, UserIcon } from "@phosphor-icons/react";
import { Card, CardHeader } from "../../../../../components/common/Generic/Card";
import { useAuth } from "../../../../../hooks/auth/useAuth";
import { formatCPF } from "../../../../../utils/Validation/dataRules/User/userCpf";

export function ProfileData() {
    const {user} = useAuth();
    const isAdmin = user!.roles.includes("admin");

    return(
          <Card className="flex flex-col gap-10 border p-8">
            <CardHeader><h1 className="text-2xl text-center">Meu Perfil:</h1></CardHeader>
            { user && (
              <div className="flex flex-col items-center">
                <p className="flex items-center"><UserIcon size={32} weight="thin" /> Nome: {user.name}</p>
                <p className="flex items-center"><EnvelopeIcon size={32} weight="thin" /> Email: {user.email}</p>
                <p className="flex items-center"><AddressBookIcon size={32} weight="thin" /> Cpf: {formatCPF(user.cpf)}</p>
                {isAdmin && (
                  <p className="flex items-center"><CoffeeIcon size={32} weight="thin" /> Admin</p>
                )}
              </div>
            )}
          </Card>
    )
}
