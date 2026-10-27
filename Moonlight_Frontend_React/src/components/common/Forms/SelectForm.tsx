import type { ComponentPropsWithoutRef } from "react";

const variantClass = {
    primary: "bg-base text-white rounded-md border border-white/10",
    secondary: "bg-white text-black rounded-md border border-white/10",
    terciary: "bg-black text-white border rounded-md transition-all duration-300 ",
    soft: "bg-base-soft rounded-md border border-white/10",
};

type OptionsData = {
    value: string,
    label: string
}

type SelectFormProps = ComponentPropsWithoutRef<"select"> & {
    onChangeState?: (value: string) => void;
    id: string;
    icon?: React.ReactNode;
    label: string;
    variant: "primary" | "secondary" | "terciary" | "soft";
    options: OptionsData[];
}

export function SelectForm({ id, label, onChange, onChangeState, icon, options, variant, className = "", ...rest } : SelectFormProps){

    return(
        <>
            <label htmlFor={id} id={id}>
                {label}
            </label>
            <div className={`flex items-center gap-3 bg-white/5 border rounded-md px-4 py-3 transition-all duration-300 focus-within:border-white/40 focus-within:bg-white/8`}>
                {icon}
                <select
                    id={id}
                    className={`${variantClass[variant]} ${className} w-full pl-2`}
                    onChange={(event) => {
                        // o ? é "só chama se existir", ou seja, se eu chamar no componente.
                        onChange?.(event); // comportamento padrão (recebo evento inteiro => SyntheticEvent { target: select, value: "carlos", ... })
                        onChangeState?.(event.target.value); // comportamento simplificado (recebo só o valor do evento => "carlos")
                    }}
                    {...rest}
                >
                    <option value={""}>Selecione uma Opção</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}
