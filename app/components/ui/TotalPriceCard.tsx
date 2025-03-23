import React from "react";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import useTotalPriceStore from "~/hooks/priceStore";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { DeleteIcon, LucideDelete } from "lucide-react";
import { Input } from "./input";

interface Price {
  id: string;
  sku: string;
  displayName: string;
  number: number;
  price: number;
}

interface PriceTableProps {
  prices: Price[];
}

const PriceTable = React.memo(({ prices }: PriceTableProps) => {
  const priceStore = useTotalPriceStore();

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>
          Total:{" "}
          {prices
            .reduce((acc, price) => acc + price.price * price.number || 0, 0)
            .toLocaleString()}{" "}
          USD
        </CardTitle>
      </CardHeader>
      <CardContent className="h-52 overflow-y-scroll">
        <Table className="">
          <TableBody>
            {prices.map((price) => (
              <TableRow key={price.sku} className="p-0">
                <TableCell className="font-sans text-[12px] py-1">
                  {price.displayName}
                </TableCell>

                <TableCell className="font-sans text-[12px] py-1">
                  {price.price}
                </TableCell>
                <TableCell className="p-1">
                  <Input
                    type="number"
                    defaultValue={price.number}
                    onChange={(value) => {
                      priceStore.update(price.id, value.target.valueAsNumber);
                    }}
                    className={`h-6 w-14 pl-1 pr-0`}
                    step={1}
                  />
                </TableCell>
                <TableCell className="p-1">
                  <Button
                    className="font-sans h-6 w-10 py-0 my-0"
                    size={"sm"}
                    onClick={() => {
                      priceStore.remove(price.id);
                    }}
                  >
                    <LucideDelete className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
});

export default PriceTable;
