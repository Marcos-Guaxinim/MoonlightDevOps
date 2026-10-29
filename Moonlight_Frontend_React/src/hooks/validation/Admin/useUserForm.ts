import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../../utils/Validation/Admin/ValidateUser";
import { getUserFormErrors } from "../../../utils/Validation/formErrors/Admin/getFormErrorsAdmin";
import { createUser, updateUser } from "../../../services/realServices/user.service";
import type { UserPayload } from "../../../@types/user/user.payload";

type UserFormData = "create" | "edit";

type InitialData = {
    name: string,
    email: string,
    cpf: string,
    password: string,
    confirmPassword: string,
    id_roles: number[]
}

const emptyFields: InitialData = {
    name: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    id_roles: [] as number[]
}

/**
 *
 * @param mode modo do formulario, se é create ou edit
 * @param initialData dados iniciais, se for update resgata os dados da row que a tabela recebe ou então começa com campos vazios mesmo.
 * @returns retorna muitos objetos para auxiliar o formulario sem encher de logica no componente.
 */
export function useUserForm(mode: UserFormData, initialData?: InitialData){
    const navigate = useNavigate();
    const [fields, setFields] = useState<InitialData>(initialData ?? emptyFields);
    const hasHydratedRoles = useRef(false);

    useEffect(() => {
      if (!hasHydratedRoles.current && initialData && initialData.id_roles.length > 0) {
        setFields(prev => ({ ...prev, id_roles: initialData.id_roles }));
        hasHydratedRoles.current = true;
      }
    }, [initialData?.id_roles]);

    const [ui, setUi] = useState({
        showPassword: false, showConfirm: false,
        loading: false, submitted: false,
        success: false, apiError: null as string | null,
    });
    const [touched, setTouched] = useState({
        name: false, email: false, cpf: false,
        password: false, confirmPassword: false,
        id_roles: false
    });

    const toggleRole = (id_role: number) => {
        // Atualizo o estado mantendo a imutabilidade
        setFields(prev => ({
            ...prev, // recupero todos os campos anteriores

            // Verifico se o ID da role já existe no array de roles
            id_roles: prev.id_roles.includes(id_role)
                ? // CASO JÁ EXISTA: Filtra o array e remove o ID que desobedesce a condição de comparação, ou seja o id que ja existe. (Desmarca a role)
                prev.id_roles.filter(id => id !== id_role)
                : // CASO NÃO EXISTA: Cria um novo array com os IDs antigos + o novo (Marcar)
                [...prev.id_roles, id_role]
        }));
    };

    const { isValid } = validateUser(fields);
    const showErrors = getUserFormErrors(fields, touched, ui.submitted);

    const setField = (field: keyof typeof fields) => (value: string) => {
        setFields(prev => ({ ...prev, [field]: value }));
        setUi(prev => ({ ...prev, apiError: null }));
    };

    const handleBlur = (field: keyof typeof touched) => () =>
        setTouched(prev => ({ ...prev, [field]: true }));

    const toggleShowPassword = () =>
        setUi(prev => ({ ...prev, showPassword: !prev.showPassword }));

    const toggleShowConfirm = () =>
        setUi(prev => ({ ...prev, showConfirm: !prev.showConfirm }));

    const buildPayload = (): UserPayload => ({
        name: fields.name,
        email: fields.email,
        cpf: fields.cpf,
        password: fields.password,
        id_roles: fields.id_roles
    });

    const handleSubmit = async (id_user?: number) => {
        setUi(prev => ({ ...prev, submitted: true, apiError: null }));
        if (!isValid) return;

      try {
            setUi(prev => ({ ...prev, loading: true }));
            if(mode === "edit" && id_user){
                await updateUser(id_user, buildPayload());
            } else{
                await createUser(buildPayload());
            }
            setUi(prev => ({ ...prev, success: true }));
            setTimeout(() => navigate("/admin/users"), 1500);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro inesperado.";
            setUi(prev => ({ ...prev, apiError: message }));
        } finally {
            setUi(prev => ({ ...prev, loading: false }));
        }
    };

    return {
        fields, ui, showErrors,
        setField, handleBlur, toggleRole,
        toggleShowPassword, toggleShowConfirm, handleSubmit
    };
}
