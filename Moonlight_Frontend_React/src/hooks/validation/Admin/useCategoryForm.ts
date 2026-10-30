import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateCategory } from "../../../utils/Validation/Admin/ValidateCategory";
import { createCategory, updateCategory } from "../../../services/realServices/category.service";
import { getCategoryFormErrors } from "../../../utils/Validation/formErrors/Admin/getFormErrorsAdmin";
import type { CategoryPayload } from "../../../@types/category/category.payload";

type CategoryFormData = "create" | "edit";

type InitialData = {
    name: string,
    description: string,
    image: string
}

const emptyFields: InitialData = {
    name: "",
    description: "",
    image: "",
}

/**
 *
 * @param mode modo do formulario, se é create ou edit
 * @param initialData dados iniciais, se for update resgata os dados da row que a tabela recebe ou então começa com campos vazios mesmo.
 * @returns retorna muitos objetos para auxiliar o formulario sem encher de logica no componente.
 */
export function useCategoryForm(mode: CategoryFormData, initialData?: InitialData){
    const navigate = useNavigate();
    const [fields, setFields] = useState<InitialData>(initialData ?? emptyFields);

    const [ui, setUi] = useState({
        showPassword: false, showConfirm: false,
        loading: false, submitted: false,
        success: false, apiError: null as string | null,
    });

    const [touched, setTouched] = useState({
        name: false, description: false, image: false
    });

    const { isValid } = validateCategory(fields); // mesma validação
    const showErrors = getCategoryFormErrors(fields, touched, ui.submitted); // mesmos erros

    const setField = (field: keyof typeof fields) => (value: string) => {
        setFields(prev => ({ ...prev, [field]: value }));
        setUi(prev => ({ ...prev, apiError: null }));
    };

    const handleBlur = (field: keyof typeof touched) => () =>
        setTouched(prev => ({ ...prev, [field]: true }));

    const buildPayload = (): CategoryPayload => ({
        name: fields.name,
        description: fields.description,
        image: fields.image || undefined
    });

    const handleSubmit = async (id_game?: number) => {
        setUi(prev => ({ ...prev, submitted: true, apiError: null }));
        if (!isValid) return;

        try {
            setUi(prev => ({ ...prev, loading: true }));
            if(mode === "edit" && id_game){
                await updateCategory(id_game, buildPayload());
            } else{
                await createCategory(buildPayload());
            }
            setUi(prev => ({ ...prev, success: true }));
            setTimeout(() => navigate("/admin/categories"), 1500);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro inesperado.";
            setUi(prev => ({ ...prev, apiError: message }));
        } finally {
            setUi(prev => ({ ...prev, loading: false }));
        }
    };

    return {
        fields, ui, showErrors, isValid,
        setField, handleBlur, handleSubmit
    };
}
