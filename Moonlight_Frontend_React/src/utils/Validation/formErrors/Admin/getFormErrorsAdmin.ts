import { isCPFValid } from "../../dataRules/User/userCpf";
import { isEmailValid } from "../../dataRules/User/userEmail";
import { isLaunchDateValid } from "../../dataRules/Game/gameLaunchDate";
import { isPriceValid } from "../../dataRules/Game/gamePrice";
import { isTitleValid } from "../../dataRules/Game/gameTitle";
import { isNameValid } from "../../dataRules/User/userName";
import { getPasswordVerifiedLevel } from "../../dataRules/User/userPassword";
import type { CategoryFormData, CategoryTouched, GameFormData, GameTouched, UserFormData, UserTouched } from "./formErrorsTypesAdmin";
import { isDescriptionValid } from "../../dataRules/Category/categoryDescription";
import { isCategoryNameValid } from "../../dataRules/Category/categoryName";
import { hasSelectedRole } from "../../dataRules/User/userRole";

export function getUserFormErrors(data: UserFormData, touched: UserTouched, submitted: boolean){
     /* validações para mostrar erro */
    const nameValid = isNameValid(data.name);
    const cpfValid = isCPFValid(data.cpf);
    const emailValid = isEmailValid(data.email);
    const strengthLevel = getPasswordVerifiedLevel(data.password);
    const passwordMatch = data.password === data.confirmPassword;
    // const typeValid = isUserTypeValid(data.type);
    const roleValid = hasSelectedRole(data.id_roles);

    return {
        showErrorUser: (touched.name || submitted) && !nameValid,
        showErrorEmail: (touched.email || submitted) && !emailValid,
        showErrorCpf: (touched.cpf || submitted) && !cpfValid,
        showErrorPassword: (touched.password || submitted) && strengthLevel < 5,
        showErrorConfirmPass: (touched.confirmPassword || submitted) && !passwordMatch,
        // showErrorUserType: (touched.type || submitted) && !typeValid
        showErrorUserRoles: (touched.id_roles || submitted) && !roleValid
    }
}

export function getGameFormErrors(data: GameFormData, touched: GameTouched, submitted: boolean){
     /* validações para mostrar erro */

    const titleValid = isTitleValid(data.title);
    const priceValid = isPriceValid(data.price); //(preço tem que ser um numero e ser maior ou igual a 0)
    const launchDateValid = isLaunchDateValid(data.launch_date); //(a data de lançamento tem de ser maior que 0, ou seja, tem de estar marcada.)
    const activeValid = data.active === "true" || data.active ===  "false"; //(active tem de estar marcado.)

    return {
        showErrorTitle: (touched.title || submitted) && !titleValid,
        showErrorPrice: (touched.price || submitted) && !priceValid,
        showErrorLaunchDate: (touched.launch_date || submitted) && !launchDateValid,
        showErrorActive: (touched.active || submitted) && !activeValid
    }
}

export function getCategoryFormErrors(data: CategoryFormData, touched: CategoryTouched, submitted: boolean){
     /* validações para mostrar erro */

    const nameValid = isCategoryNameValid(data.name);
    const descriptionValid = isDescriptionValid(data.description); //(preço tem que ser um numero e ser maior ou igual a 0)

    return {
        showErrorName: (touched.name || submitted) && !nameValid,
        showErrorDescription: (touched.description || submitted) && !descriptionValid,
    }
}
