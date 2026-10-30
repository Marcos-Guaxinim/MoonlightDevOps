import { isCPFValid } from "../dataRules/User/userCpf";
import { isEmailValid } from "../dataRules/User/userEmail";
import { isNameValid } from "../dataRules/User/userName";
import { getPasswordVerifiedLevel } from "../dataRules/User/userPassword";
import { hasSelectedRole } from "../dataRules/User/userRole";

export function validateUser(data: { name: string, email: string, password: string, confirmPassword: string, cpf: string, id_roles: number[]}): { isValid: boolean } {

    const { name, email, password, confirmPassword, cpf, id_roles } = data;

    const nameValid = isNameValid(name);
    const emailValid = isEmailValid(email);
    const strengthLevel = getPasswordVerifiedLevel(password);
    const passwordMatch = password === confirmPassword;
    const cpfValid = isCPFValid(cpf);
    const roleValid = hasSelectedRole(id_roles);

    const isFormFilled = !!(
        name && name.length <= 16 &&
        email && email.length <= 30 &&
        password && password.length <= 16 &&
        confirmPassword &&
        cpf &&
        id_roles
    );

    const passwordValid = passwordMatch && strengthLevel > 4;

    const isValid = isFormFilled && passwordValid && emailValid && nameValid && cpfValid && roleValid;

    return{
        isValid
    }


}
