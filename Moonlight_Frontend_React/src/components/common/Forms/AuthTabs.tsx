import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../Generic/Button/Button";

export function AuthTabs(){
    const navigate = useNavigate();
    const {pathname} = useLocation();

    return(
        <div className="flex mb-4 border-b border-white/10">
            <Button
                onClick={() => (navigate("/login"))}
                variant="primary"
                className={`flex-1 pb-3 pt-3 text-xs tracking-widest uppercase transition-all duration-300
                    ${pathname === "/login" ? "text-white border-b border-white -mb-px" : "text-white/30 hover:text-white/60 mb-0"}`}
            >
                Entrar
            </Button>
            <Button
                onClick={() => (navigate("/register"))}
                variant="primary"
                className={`flex-1 pb-3 pt-3 text-xs tracking-widest uppercase transition-all duration-300
                    ${pathname === "/register" ? "text-white border-b border-white -mb-px" : "text-white/30 hover:text-white/60 mb-0"}`}
            >
                Criar conta
            </Button>
        </div>
    )
}
