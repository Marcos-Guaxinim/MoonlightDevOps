/**
 * Paginação
 */

export interface PaginatedQuery {
  page?: number,
  limit: number
}

/**
 * para discernir do que é resposta de paginação e não é.
 */
export interface PaginatedResponse<RowData> {
    data: RowData[];
    total: number;
    page: number;
    totalPages: number;
}
