import { tableFeatures, rowPaginationFeature, rowExpandingFeature, createExpandedRowModel, columnVisibilityFeature } from "@tanstack/react-table";

export const appTableFeatures = tableFeatures({
  rowPaginationFeature,
  rowExpandingFeature,
  columnVisibilityFeature,
  expandedRowModel: createExpandedRowModel(),
});
