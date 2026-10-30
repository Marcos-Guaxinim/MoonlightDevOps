import { formatCurrency } from "../../../utils/currencyFormatter/formatCurrency";
import { statusTranslation } from "./TraducaoDoStatus";
import type { OrderResponseDTO } from "../../../@types/order/order.dto";
import { createColumnHelper } from "@tanstack/react-table";
import type { appTableFeatures } from "../../../utils/tableFeatures";

const columnHelper = createColumnHelper<typeof appTableFeatures, OrderResponseDTO>();

export function useMyOrdersTable() {

  const OrderColumns = columnHelper.columns([
    columnHelper.accessor("order_date", {
      header: "Data",
      cell: (info) => new Date(info.getValue()).toLocaleDateString('pt-BR')
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const label = statusTranslation[info.getValue().toLowerCase()] || info.getValue().toLowerCase();
        return(
            <span className={`px-2 py-1 rounded-full text-xs ${
                info.getValue() === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
            }`}>
                {label.toUpperCase()}
            </span>
        )
      }
    }),
    columnHelper.accessor("total", {
      header: "Total",
      cell: (info) => formatCurrency(info.getValue()),
    })
  ])


  return { OrderColumns };
}
