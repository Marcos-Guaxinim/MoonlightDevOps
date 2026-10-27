import { Fragment, useState } from "react";
import { Spinner } from "../Spinner";
import { paginationOptions } from "./TraducaoTabela";
import { flexRender, useTable, type ColumnDef, type PaginationState} from "@tanstack/react-table";
import { appTableFeatures } from "../../../../utils/tableFeatures";
import { Button } from "../Button/Button";

/**
 * RowData serve para dizer qual é o tipo de dados que o typescript pode esperar de cada linha (row) ou coluna (column),
 * então ao inserir dados do tipo "User" ele sabe que cada linha é "User".
 * O typescript tambem infere sozinho sem precisar dizer quando ele recebe o tipo diretamente no componente.
 * Aqui é preciso pois estou definindo um contrato, não posso usar TableColumn sem passar Generic (nao posso usar coluna sem passar o tipo generico do array).
 */

type TableProps<TRowData extends Record<string, any>> = {
  columns: ColumnDef<typeof appTableFeatures, TRowData>[];
  data: TRowData[];
  isLoading: boolean;
  subHeader?: boolean;
  subHeaderComponent?: React.ReactNode;
  noDataComponent?: React.ReactNode;

  // paginação server-side
  totalRows?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;

  // linhas expansíveis
  expandableRows?: boolean;
  renderExpandedRow?: (row: TRowData) => React.ReactNode;
}

export function Table<TRowData extends Record<string, any>>(props: TableProps<TRowData>) {
  const { columns, data, isLoading, totalRows, currentPage = 1, onPageChange, pageSize = 5, ...rest } = props;


  const [expanded, setExpanded] = useState({});

  const isServerSide = totalRows !== undefined;

  const table = useTable({
    features: appTableFeatures,
    data,
    columns,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
      expanded
    },
    onPaginationChange: (updater) => {
      const next: PaginationState = typeof updater === "function"
        ? updater({ pageIndex: currentPage - 1, pageSize })
        : updater;
      onPageChange?.(next.pageIndex + 1);
    },
    onExpandedChange: setExpanded,
    getRowCanExpand: () => !!props.expandableRows,
    manualPagination: isServerSide,
    pageCount: isServerSide ? Math.ceil((totalRows ?? 0) / pageSize) : undefined
  });

  const rows = table.getRowModel().rows;

  return (
    <div className="w-full rounded-lg overflow-hidden border border-white/10">
      {props.subHeader && props.subHeaderComponent && (
        <div className="bg-white/10 min-h-[52px] flex items-center px-2">
          {props.subHeaderComponent}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-white text-sm bg-transparent">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-white/10 border-b border-white/15">
                {props.expandableRows && <th className="w-10" />}
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-left py-3 px-4 text-xs font-medium">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + (props.expandableRows ? 1 : 0)} className="py-10">
                  <div className="flex justify-center"><Spinner /></div>
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (props.expandableRows ? 1 : 0)} className="py-6">
                  {props.noDataComponent ?? <p className="text-white/50 text-center">Nenhum registro encontrado</p>}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <Fragment key={row.id}>
                  <tr className="border-b border-white/10 hover:bg-white/8 transition-colors">
                    {props.expandableRows && (
                      <td className="w-10 text-center">
                        <Button
                          variant="cta"
                          onClick={row.getToggleExpandedHandler()}
                          className="p-4"
                        >
                          {row.getIsExpanded() ? "−" : "+"}
                        </Button>
                      </td>
                    )}
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-2 px-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {props.expandableRows && row.getIsExpanded() && props.renderExpandedRow && (
                    <tr>
                      <td colSpan={columns.length + 1} className="bg-transparent">
                        {props.renderExpandedRow(row.original)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isServerSide && (
        <div className="bg-white/10 flex items-center justify-end gap-2 px-4 py-2">
          <span className="text-xs text-white/70">
            {paginationOptions.rowsPerPageText} {pageSize}
          </span>
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="rounded-full h-9 w-9 flex items-center justify-center text-white hover:bg-white/8 disabled:text-gray-500 disabled:cursor-default"
          >
            ‹
          </Button>
          <span className="text-xs text-white/70">
            {table.state.pagination.pageIndex + 1} {paginationOptions.rangeSeparatorText} {table.getPageCount()}
          </span>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="rounded-full h-9 w-9 flex items-center justify-center text-white hover:bg-white/8 disabled:text-gray-500 disabled:cursor-default"
          >
            ›
          </Button>
        </div>
      )}
    </div>
  )
}
