import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateGame } from "../../../utils/Validation/Admin/ValidateGame";
import { getGameFormErrors } from "../../../utils/Validation/formErrors/Admin/getFormErrorsAdmin";
import { createGame, updateGame } from "../../../services/realServices/game.service";
import type { GamePayload } from "../../../@types/game/game.payload";

type GameFormData = "create" | "edit";

type InitialData = {
  title: string,
  description: string,
  price: string,
  image: string,
  banner_image: string,
  link: string,
  launch_date: string,
  active: string,
  categories: number[],
}

const emptyFields: InitialData = {
  title: "",
  description: "",
  price: "0.00",
  image: "",
  banner_image: "",
  link: "",
  launch_date: "",
  active: "true",
  categories: [] as number[],
}

/**
 *
 * @param mode modo do formulario, se é create ou edit
 * @param initialData dados iniciais, se for update resgata os dados da row que a tabela recebe ou então começa com campos vazios mesmo.
 * @returns retorna muitos objetos para auxiliar o formulario sem encher de logica no componente.
 */
export function useGameForm(mode: GameFormData, initialData?: InitialData) {
  const navigate = useNavigate();
  const [fields, setFields] = useState<InitialData>(initialData ?? emptyFields);
  const hasHydratedCategories = useRef(false);

  useEffect(() => {
    if (!hasHydratedCategories.current && initialData && initialData.categories.length > 0) {
      setFields(prev => ({ ...prev, categories: initialData.categories }));
      hasHydratedCategories.current = true;
    }
  }, [initialData?.categories]);

  const [ui, setUi] = useState({
      showPassword: false, showConfirm: false,
      loading: false, submitted: false,
      success: false, apiError: null as string | null,
  });

  const [touched, setTouched] = useState({
      title: false, price: false, launch_date: false, active: false
  });

  const toggleCategory = (id_category: number) => {
      // Atualizo o estado mantendo a imutabilidade
      setFields(prev => ({
          ...prev, // recupero todos os campos anteriores (title, price, etc.)

          // Verifico se o ID da categoria já existe no array de categorias
          categories: prev.categories.includes(id_category)
              ? // CASO JÁ EXISTA: Filtra o array e remove o ID que desobedesce a condição de comparação, ou seja o id que ja existe. (Desmarca a categoria)
              prev.categories.filter(id => id !== id_category)
              : // CASO NÃO EXISTA: Cria um novo array com os IDs antigos + o novo (Marcar)
              [...prev.categories, id_category]
      }));
  };

  const { isValid } = validateGame(fields); // mesma validação
  const showErrors = getGameFormErrors(fields, touched, ui.submitted); // mesmos erros

  const selectOptions = [
      {
          value: "false",
          label: "Não"
      },
      {
          value: "true",
          label: "Sim"
      }
  ]

  const setField = (field: keyof typeof fields) => (value: string) => {
      setFields(prev => ({ ...prev, [field]: value }));
      setUi(prev => ({ ...prev, apiError: null }));
  };

  const handleBlur = (field: keyof typeof touched) => () =>
      setTouched(prev => ({ ...prev, [field]: true }));

  const buildPayload = (): GamePayload => ({
      title: fields.title,
      description: fields.description || undefined,
      price: parseFloat(fields.price),
      image: fields.image || undefined,
      banner_image: fields.banner_image || undefined,
      link: fields.link || undefined,
      launch_date: new Date(fields.launch_date).toISOString().split("T")[0],
      active: fields.active === "true",
      categories: fields.categories,
  });

  const handleSubmit = async (id_game?: number) => {
      setUi(prev => ({ ...prev, submitted: true, apiError: null }));
      if (!isValid) return;

      try {
          setUi(prev => ({ ...prev, loading: true }));
          if(mode === "edit" && id_game){
              await updateGame(id_game, buildPayload());
          } else{
              await createGame(buildPayload());
          }
          setUi(prev => ({ ...prev, success: true }));
          setTimeout(() => navigate("/admin/games"), 1500);
      } catch (err) {
          const message = err instanceof Error ? err.message : "Erro inesperado.";
          setUi(prev => ({ ...prev, apiError: message }));
      } finally {
          setUi(prev => ({ ...prev, loading: false }));
      }
  };

  return {
      fields, selectOptions, ui, showErrors, isValid,
      setField, handleBlur, toggleCategory, handleSubmit
  };
}
