import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
// import { getSession } from "~/service/sessions.server";
import { useSubmit } from "@remix-run/react";
import { ArrowUpDown, ShoppingCart } from "lucide-react";
import { Input } from "~/components/ui/input";
// import useTotalPriceStore from "../totalPriceStore/totalPriceStore";

type Instance = {
  id: string;
  instancetype: string;
  vcpu: number;
  memory: number;
  storage: string;
  ondemandprice: number | null;
};

export const EC2Columns: ColumnDef<Instance>[] = [
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
    size: 108,
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
    size: 108,
    meta: {
      filterVariant: "range",
    },
  },
  {
    id: "clockspeed",
    accessorKey: "clockspeed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Clock Speed
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
    size: 112,
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
  //   {
  //     id: "action",
  //     size: 64,
  //     cell: ({ row }) => {
  //       const appendSKU = useTotalPriceStore((state) => state.append);
  //       return (
  //         <Button
  //           className="h-8 w-8"
  //           onClick={() => {
  //             appendSKU({
  //               sku: row.original.id,
  //               type: "ec2",
  //               state: {},
  //               totalPrice: 0,
  //             });
  //           }}
  //           size="icon"
  //         >
  //           <ShoppingCart className="h-4 w-4" />
  //         </Button>
  //       );
  //     },
  //   },
];
