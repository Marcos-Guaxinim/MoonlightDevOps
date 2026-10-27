import { useState } from "react";
import { Button } from "./Button/Button";

type CollapseProps = {
    children: React.ReactNode;
    label: string; // texto do botão
}

export function Collapse({children, label} : CollapseProps){
    const [open, setOpen] = useState(false);
    return(
        <div className="w-full bg-base-soft/60 text-white transition-all duration-200 animate-fade-in">
            <Button className="w-full p-6 block max-lg:active:scale-105 lg:hover:scale-105" variant="cta" onClick={() => setOpen(!open)}>
                {label}
            </Button>
            {open &&
                <div className="justify-self-center flex flex-col gap-4 p-8 animate-fade-in">
                    {open && children}
                </div>
            }
        </div>
    )
}
