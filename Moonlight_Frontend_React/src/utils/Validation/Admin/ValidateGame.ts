import { isLaunchDateValid } from "../dataRules/Game/gameLaunchDate";
import { isPriceValid } from "../dataRules/Game/gamePrice";
import { isTitleValid } from "../dataRules/Game/gameTitle";


export function validateGame(data: { title: string, price: string, launch_date: string, active: string }): { isValid: boolean } {
    const titleValid = isTitleValid(data.title); //(o titulo do jogo tem que ser maior que 0 caracteres) ou (menor ou igual a 50 caracteres)
    const priceValid = isPriceValid(data.price); //(preço tem que ser um numero e ser maior ou igual a 0)
    const launchDateValid = isLaunchDateValid(data.launch_date); //(a data de lançamento tem de ser maior que 0, ou seja, tem de estar marcada.)
    const activeValid = data.active === "true" || data.active === "false" //(active tem de estar marcado.)

    const isValid = titleValid && priceValid && launchDateValid && activeValid;
    return { isValid };
}
