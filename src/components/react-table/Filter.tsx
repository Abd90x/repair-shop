import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "./DebouncedInput";

type Props<T> = {
  column: Column<T>;
};

export default function Filter<T>({ column }: Props<T>) {
  const columnFilterValue = column.getFilterValue();

  const sortedUbniqueValues = Array.from(
    column.getFacetedUniqueValues().keys()
  ).sort();

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
        placeholder={`Search... (${
          [...column.getFacetedUniqueValues()].filter((arr) => arr[0]).length
        })`}
        list={column.id + "list"}
        className="w-full border shadow rounded bg-card"
      />
    </p>
  );
}
