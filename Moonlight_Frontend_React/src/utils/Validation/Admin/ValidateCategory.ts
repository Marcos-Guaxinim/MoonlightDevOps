import { isDescriptionValid } from "../dataRules/Category/categoryDescription";
import { isCategoryNameValid } from "../dataRules/Category/categoryName";

export function validateCategory(data: { name: string, description: string}): { isValid: boolean } {
    const nameValid = isCategoryNameValid(data.name);
    const descriptionValid = isDescriptionValid(data.description);

    const isValid = nameValid && descriptionValid;
    return { isValid };
}
