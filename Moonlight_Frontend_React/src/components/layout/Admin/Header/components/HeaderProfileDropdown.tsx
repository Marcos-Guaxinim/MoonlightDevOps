import { useState } from "react";
import { Button } from "../../../../common/Generic/Button/Button";
import { CaretDownIcon } from "@phosphor-icons/react";
import { useAuth } from "../../../../../hooks/auth/useAuth";
import { Dropdown } from "../../../../common/Generic/Dropdown";
import { WarmWelcomeTime } from "./WarmWelcomeTime";

export function HeaderProfileDropdown(){
    const [confirmLogout, setConfirmLogout] = useState(false);
    const {logout, user} = useAuth();
    const isAdmin = user!.roles.includes("admin");


    return(
        <Dropdown alignment={"middle"}
            backgroundActive="on"
            trigger={(open) => (
                <Button variant="cta" as="button" className="max-lg:active:bg-blue-600 max-lg:active:scale-95 lg:rounded-md lg:p-2 lg:w-fit flex w-full transition-all duration-300 lg:hover:bg-blue-600 justify-center items-center">
                    <WarmWelcomeTime/>
                    <CaretDownIcon size={20} className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`} />
                </Button>
            )}
        >
            {!confirmLogout
                ?(
                    <div>
                        <Button as="link" variant="primary" href="/profile" className={`rounded-t-md max-lg:active:bg-white max-lg:active:text-base lg:hover:bg-white lg:hover:text-base transition-all duration-300 w-full block px-4 py-2 text-sm`}>Perfil</Button>
                        <Button as="link" variant="primary" href="/library" className={`max-lg:active:bg-white max-lg:active:text-base lg:hover:bg-white lg:hover:text-base transition-all duration-300 w-full block px-4 py-2 text-sm`}>Biblioteca</Button>
                        <Button as="link" variant="primary" href="/orders" className={`max-lg:active:bg-white max-lg:active:text-base lg:hover:bg-white lg:hover:text-base transition-all duration-300 w-full block px-4 py-2 text-sm`}>Pedidos</Button>
                        {isAdmin &&
                            <Button as="link" variant="primary" href="/" className={`max-lg:active:bg-white max-lg:active:text-base lg:hover:bg-white lg:hover:text-base transition-all duration-300 w-full block px-4 py-2 text-sm`}>Loja</Button>
                        }
                        <Button as="button" onClick={() => setConfirmLogout(true)} variant="primary" className={`rounded-b-md max-lg:active:bg-white max-lg:active:text-base lg:hover:bg-white lg:hover:text-base transition-all duration-300 w-full block px-4 py-2 text-sm`}>
                            Sair
                        </Button>
                    </div>
                )
                :(
                    <div className="p-4">
                        <p className="text-white">Tem certeza?</p>
                        <div className="flex justify-evenly gap-2">
                            <Button className="rounded-md border p-2 border-white/25 max-lg:active:bg-white max-lg:active:text-base lg:hover:bg-white lg:hover:text-base transition-all duration-300" onClick={logout}>Sim</Button>
                            <Button className="rounded-md border p-2 border-white/25 max-lg:active:bg-white max-lg:active:text-base lg:hover:bg-white lg:hover:text-base transition-all duration-300" onClick={() => setConfirmLogout(false)}>Não</Button>
                        </div>
                    </div>
                )
            }

        </Dropdown>
    )
}
