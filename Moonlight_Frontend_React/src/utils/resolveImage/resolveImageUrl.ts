// utils/resolveImageUrl.ts
import { API_URL } from "../../config";

export function resolveImageUrl(path?: string): string | undefined {
    if (!path) return undefined;
    if (path.startsWith('http://') || path.startsWith('https://')) return path; // já é absoluta (seed antigo)
    return `${API_URL}${path}`; // caminho relativo (upload novo)
}
