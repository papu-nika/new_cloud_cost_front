import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedMinMaxValues,
  Row,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useSearchParams } from "@remix-run/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
// import useTotalPriceStore from "../totalPriceStore/totalPriceStore";
// import { Filter } from "./Filter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const memoizedData = React.useMemo(() => data, [data]);
  const memoizedColumns = React.useMemo(() => columns, [columns]);

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const { rows } = table.getRowModel();

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 48,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    getScrollElement: () => tableContainerRef.current,
    overscan: 1,
  });

  return (
    <div
      ref={tableContainerRef}
      className="relative overflow-auto h-64 lg:h-96 max-w-full"
    >
      <Table style={{ display: "grid" }}>
        <TableHeader className="sticky top-0 bg-gray-50 z-10 rounded-md px-4 ">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              style={{ display: "flex", width: "100%" }}
            >
              {headerGroup.headers.map((header) => {
                return (
                  header.column.id !== "id" && (
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.getSize(),
                        height: "64px",
                      }}
                    >
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                      {/* {header.column.getCanFilter() && (
                        <Filter column={header.column} />
                      )} */}
                    </TableHead>
                  )
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody
          style={{
            display: "grid",
            height: `${virtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<any>;
            return (
              <TableRow
                key={row.original.id}
                className="px-2"
                data-index={virtualRow.index}
                ref={(node) => virtualizer.measureElement(node)}
                style={{
                  display: "flex",
                  position: "absolute",
                  transform: `translateY(${virtualRow.start}px)`,
                  width: "100%",
                }}
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("detail", row.original.id);
                    return prev;
                  });
                }}
              >
                {row.getVisibleCells().map((cell) =>
                  cell.column.id === "id" ? (
                    <React.Fragment key={cell.id} />
                  ) : (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                      }}
                      className="flex items-center"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  )
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
