import type { CategoryResponseDTO } from "../../@types/category/category.dto";
import type { CategoryPaginatedQueryPayload, CategoryPayload } from "../../@types/category/category.payload";
import type { ApiResponse } from "../../@types/common/apiResponse";
import type { PaginatedResponse } from "../../@types/common/pagination";
import { sanitizeData } from "../../utils/sanitizer/sanitizer";
import { api } from "../api";
import { fetchCategoryByIdMock, fetchCategoryMock } from "../fakeServices/category.fakeservice";

export async function fetchCategories(): Promise<CategoryResponseDTO[]> {
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return fetchCategoryMock();
    }

    const response = await api.get(`/api/categories`);
    return response.data;
}

export async function fetchPaginatedCategories(query: CategoryPaginatedQueryPayload): Promise<PaginatedResponse<CategoryResponseDTO>> {

    const response = await api.get(`/api/categories/pag`, { params: query });
    return response.data;
}


export async function fetchCategoryById(id_category: number): Promise<CategoryResponseDTO> {
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return fetchCategoryByIdMock(id_category);
    }

    const response = await api.get(`/api/categories/${id_category}`);
    return response.data;
}

export async function createCategory(data: CategoryPayload): Promise<ApiResponse> {
    const cleanData = sanitizeData(data);
    const response = await api.post(`/api/categories`, cleanData);
    return response.data;
}

export async function updateCategory(id_category: number, data: CategoryPayload): Promise<ApiResponse> {
    const cleanData = sanitizeData(data);
    const response = await api.put(`/api/categories/${id_category}`, cleanData);
    return response.data;
}

export async function deleteCategory(id_category: number): Promise<ApiResponse> {
    const response = await api.delete(`/api/categories/${id_category}`);
    return response.data;
}
