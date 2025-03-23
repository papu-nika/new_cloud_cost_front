import React from "react";
import { Input } from "../ui/input";

export const Filter = React.memo(function Filter({
  column,
}: {
  column: Column<any, unknown>;
}) {
  const { filterVariant } = column.columnDef.meta ?? {};
  const step = filterVariant === "range-few" ? 0.001 : 1;
  const width = column.columnDef.accessorKey == "ondemandprice" ? 9 : 10;

  return filterVariant === "range" || filterVariant === "range-few" ? (
    <div className="pl-0">
      <div className="flex space-x-0.5">
        <DebouncedInput
          type="number"
          initialValue=""
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min`}
          className={`h-8 w-14 pl-1 pr-0`}
          step={step}
        />
        <DebouncedInput
          type="number"
          initialValue=""
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
          className={`h-8 w-14 pl-1 pr-0`}
          step={step}
        />
      </div>
      <div className="h-1.5" />
    </div>
  ) : (
    <div className="pl-0">
      <DebouncedInput
        type="text"
        onChange={(value) => column.setFilterValue(value)}
        initialValue=""
        placeholder={`Search...`}
        list={column.id + "list"}
        className="h-8 w-24"
      />
      <div className="h-1.5" />
    </div>
  );
});

export function DebouncedInput({
  initialValue: initialValue,
  onChange,
  //   debounce = 250,
  ...props
}: {
  initialValue: string | number;
  onChange: (value: string | number) => void;
  //   debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);
  //   const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  //   React.useEffect(() => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }

  //     timeoutRef.current = setTimeout(() => {
  //       onChange(value);
  //     }, debounce);

  //     return () => {
  //       if (timeoutRef.current) {
  //         clearTimeout(timeoutRef.current);
  //       }
  //     };
  //   }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
}
