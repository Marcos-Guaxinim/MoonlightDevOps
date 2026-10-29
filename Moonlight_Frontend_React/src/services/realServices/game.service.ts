import type { PaginatedResponse } from "../../@types/common/pagination";
import type { GameResponseDTO } from "../../@types/game/game.dto";
import type { GamePaginatedQueryPayload, GamePayload } from "../../@types/game/game.payload";
import { sanitizeData } from "../../utils/sanitizer/sanitizer";
import { api } from "../api";
import { fetchGameByIdMock } from "../fakeServices/game.fakeservice";


export async function fetchGamesPaginated(query: GamePaginatedQueryPayload): Promise<PaginatedResponse<GameResponseDTO>> {

    const response = await api.get(`/api/games/pag`, { params: query });
    return response.data;
}

export async function fetchGamesPaginatedAdmin(query: GamePaginatedQueryPayload): Promise<PaginatedResponse<GameResponseDTO>> {

    const response = await api.get(`/api/games/pagadmin`, { params: query });
    return response.data;
}

export async function fetchGameById(id_game: number): Promise<GameResponseDTO> {
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return fetchGameByIdMock(id_game);
    }
    const response = await api.get(`/api/games/${id_game}`);
    return response.data;
}

export async function fetchGamesByTitle(title: string): Promise<GameResponseDTO[] | GameResponseDTO> {
    const response = await api.get(`/api/games`, {
        params: { title }
    });

    return response.data;
}

export async function createGame(data: GamePayload): Promise<Response>{
    const cleanData = sanitizeData(data);
    const response = await api.post(`/api/games`, cleanData);
    return response.data;
}


export async function updateGame(id_game: number, data: GamePayload): Promise<Response> {
    const cleanData = sanitizeData(data);
    const response = await api.put(`/api/games/${id_game}`, cleanData);
    return response.data;
}

export async function deleteGame(id_game: number): Promise<Response> {
    const response = await api.delete(`/api/games/${id_game}`);
    return response.data;
}
