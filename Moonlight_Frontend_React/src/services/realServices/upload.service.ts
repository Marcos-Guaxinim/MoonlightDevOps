import { api } from "../api";

type UploadContext = 'games' | 'categories' | 'studios';

async function uploadImage(file: File, context: UploadContext): Promise<string> {
    const formData = new FormData();
    formData.append('image', file); // 'image' precisa bater com upload.single('image') no backend

    const response = await api.post<{ url: string }>(`/api/uploads/${context}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data.url;
}

export const uploadGameImage = (file: File): Promise<string> => uploadImage(file, 'games');
export const uploadCategoryImage = (file: File): Promise<string> => uploadImage(file, 'categories');
