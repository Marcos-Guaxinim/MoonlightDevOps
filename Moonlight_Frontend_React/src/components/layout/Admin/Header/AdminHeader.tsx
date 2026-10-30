import { ListIcon, XIcon } from "@phosphor-icons/react";
import { Button } from "../../../common/Generic/Button/Button";
import { useState } from "react";
import { useBreakpoint } from "../../../../hooks/breakpoints/useBreakpoint";
import { getAnimationState } from "../../../../utils/ui/animation/animationState";
import { HeaderProfileDropdown } from "./components/HeaderProfileDropdown";
import moonlightMenor from "@/assets/MoonlightMenor.png";

export function AdminHeader(){
    const [hamburguerIsOpen, setHamburguerIsOpen] = useState(false); //como está false, ao fazer !hamburguerisOpen é true.
    const {isMobile, isTablet} = useBreakpoint();
    const animIsHamburguerOpen = getAnimationState(hamburguerIsOpen);

    /* o header é 120px */

    // const stringCenterEffect = "relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0";

    return(
        <header className="fixed top-0 left-0 relative bg-base w-full flex z-11">

                <Button className="justify-items-center w-1/2 pl-5 lg:pl-0 lg:w-1/3" as="link" href="/admin" variant="transparent">
                    <img src={moonlightMenor} className="h-auto w-auto" alt="Moonlight Logo" />
                </Button>

                <Button
                    className="w-1/2 justify-items-end pr-5 lg:hidden"
                    onClick={() => setHamburguerIsOpen(!hamburguerIsOpen)}
                >
                    <div className="relative w-7 h-7">
                        <ListIcon
                            size={28}
                            className={`
                            absolute transition-all duration-300
                            ${animIsHamburguerOpen.styles.fadeOutOpacity} ${animIsHamburguerOpen.styles.rotate} ${animIsHamburguerOpen.styles.scaleLess}
                            `}
                        />

                        <XIcon
                            size={28}
                            className={`
                            absolute transition-all duration-300
                            ${animIsHamburguerOpen.styles.fadeInOpacity} ${animIsHamburguerOpen.styles.scaleMore}
                            `}
                        />
                    </div>
                </Button>

                <nav className={`${hamburguerIsOpen && isTablet || hamburguerIsOpen && isMobile ? "block" : "hidden"} bg-base absolute top-full left-0 w-full
           flex-col items-center lg:flex lg:w-2/3 lg:bg-transparent lg:static lg:flex-row`}>
                    <div className="flex w-full justify-center flex-col text-center lg:flex-row lg:static lg:w-1/2 lg:gap-6.25">
                        <Button
                          className="max-lg:active:bg-white max-lg:active:text-base max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent lg-fx-underline"
                          as="link"
                          href="/admin"
                          variant="transparent">
                            Home
                        </Button>
                        <Button
                          className="max-lg:active:bg-white max-lg:active:text-base max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent lg-fx-underline"
                          as="link"
                          href="/admin/users"
                          variant="transparent">
                            Usuarios
                        </Button>
                        <Button
                          className="max-lg:active:bg-white max-lg:active:text-base max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent lg-fx-underline"
                          as="link"
                          href="/admin/games"
                          variant="transparent">
                            Jogos
                        </Button>
                        <Button
                          className="max-lg:active:bg-white max-lg:active:text-base max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent lg-fx-underline"
                          as="link"
                          href="/admin/categories"
                          variant="transparent">
                            Categorias
                        </Button>
                        <Button
                          className="max-lg:active:bg-white max-lg:active:text-base max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent lg-fx-underline"
                          as="link"
                          href="/"
                          variant="transparent">
                            Loja
                        </Button>
                    </div>
                    <div className="flex w-full flex-col justify-center text-center items-center lg:flex-row lg:static lg:w-1/2 lg:gap-6.25 ">
                        <HeaderProfileDropdown/>
                    </div>
                </nav>

        </header>
    )
}
