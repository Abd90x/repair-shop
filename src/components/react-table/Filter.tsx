import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "./DebouncedInput";

type Props<T> = {
  column: Column<T>;
  filteredRows: string[];
};

export default function Filter<T>({ column, filteredRows }: Props<T>) {
  const columnFilterValue = column.getFilterValue();
  const uniqueFilteredValues = new Set(filteredRows);
  const sortedUbniqueValues = Array.from(uniqueFilteredValues).sort();

  return (
    <p>
      <datalist id={column.id + "list"}>
        {sortedUbniqueValues.map((value, idx) => (
          <option key={`${idx}-${column.id}`} value={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${uniqueFilteredValues.size})`}
        list={column.id + "list"}
        className="w-full border shadow rounded bg-card"
      />
    </p>
  );
}
