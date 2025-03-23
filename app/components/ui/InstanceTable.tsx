import React from "react";
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
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "app/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "app/components/ui/table";
import { useSearchParams, useNavigate } from "@remix-run/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Button } from "./button";
import { ArrowUpDown, ShoppingCart } from "lucide-react";
import { Filter } from "./Filter";
import useTotalPriceStore from "~/hooks/priceStore";

type Instance = {
  id: string;
  instancetype: string;
  vcpu: number;
  memory: number;
  ondemandprice: number | null;
};

export const Columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          InstanceType
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
    accessorKey: "instancetype",
    size: 124,
  },
  {
    accessorKey: "vcpu",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          vCPU
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
    size: 124,
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "memory",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Memory
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
    size: 124,
    meta: {
      filterVariant: "range",
    },
  },
  {
    header: ({ column }) => {
      return (
        <>
          <Button
            variant="ghost"
            className="pl-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price(hour/$)
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        </>
      );
    },
    accessorKey: "ondemandprice",
    cell: ({ row }) => {
      return (
        <div>
          <span>$</span>
          {row.getValue("ondemandprice")}
        </div>
      );
    },
    size: 112,
    meta: {
      filterVariant: "range-few",
    },
  },
  {
    id: "action",
    size: 64,
    cell: ({ row }) => {
      const appendSKU = useTotalPriceStore((state) => state.append);
      return (
        <Button
          className="h-8 w-8"
          onClick={() => {
            appendSKU({
              id: "",
              sku: row.original.id,
              displayName: row.original.instancetype,
              type: "ec2",
              state: {},
              price: row.original.ondemandprice,
              number: 1,
            });
          }}
          size="icon"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      );
    },
  },
];

interface DataTableProps<TData, TValue> {
  data: TData[];
}

export function InstanceTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate(); // useNavigate フックを追加
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const lastPage = Math.ceil(data.length / pagination.pageSize) - 1;

  const memoizedData = React.useMemo(() => data, [data]);
  const memoizedColumns = React.useMemo(() => Columns, [Columns]);

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    state: {
      pagination,
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col gap-4 mx-4 h-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              {headerGroup.headers.map((header) => {
                return (
                  header.column.id !== "id" && (
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.getSize(),
                        height: "72px",
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
                      {header.column.getCanFilter() && (
                        <Filter column={header.column} />
                      )}
                    </TableHead>
                  )
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow
                key={row.original.id}
                className="px-2"
                style={{
                  display: "flex",
                  width: "100%",
                }}
                onClick={() => {
                  // SPAでページ遷移し、クエリパラメータを保持
                  navigate(`/price/aws/ec2/instance/${row.original.id}`, {
                    replace: true,
                    state: {
                      from: window.location.pathname + window.location.search,
                    },
                  });
                }}
              >
                {row.getAllCells().map((cell) =>
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                setPagination({
                  pageIndex: 1,
                  pageSize: pagination.pageSize,
                });
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setPagination({
                  pageIndex:
                    pagination.pageIndex == 0 ? 0 : pagination.pageIndex - 1,
                  pageSize: pagination.pageSize,
                });
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setPagination({
                  pageIndex:
                    pagination.pageIndex == lastPage
                      ? lastPage
                      : pagination.pageIndex + 1,

                  pageSize: pagination.pageSize,
                });
              }}
            ></PaginationNext>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              onClick={() => {
                setPagination({
                  pageIndex: lastPage,
                  pageSize: pagination.pageSize,
                });
              }}
            >
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
