import { useState } from "react";
import toast from "react-hot-toast";
import { uploadCategoryImage, uploadGameImage } from "../../services/realServices/upload.service";

type ResourceType = 'category' | 'game';

const uploadersByResource: Record<ResourceType, (file: File) => Promise<string>> = {
  game: uploadGameImage,
  category: uploadCategoryImage,
};

export function useImageUpload(resource: ResourceType, onUploaded: (url: string) => void) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function validateFile(file: File | undefined): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
    const maxSize = 5 * 1024 * 1024; //5MB

    if (!file) return false;

    if (file.size > maxSize) {
      toast.error('Arquivo muito grande. Tamanho máximo: 5MB');
      return false;
    }
    if (!allowedTypes.includes(file.type)) {
      toast.error('Tipo de arquivo não permitido. Apenas JPEG, PNG, GIF, AVIF e WebP são aceitos.');
      return false;
    }

    return true;
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>): Promise<void>{
    const file = event.target.files?.[0];
    const isFileValid = validateFile(file);
    if (!isFileValid) return;

    setPreviewUrl(URL.createObjectURL(file!)); // preview local
    setUploading(true);

    try {
      const url = await uploadersByResource[resource](file!);
      onUploaded(url); // avisa o formulário: "a imagem está pronta, aqui está a URL"
    } catch {
      toast.error('Erro ao enviar imagem.');
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  return { handleFileUpload, uploading, previewUrl };
}
