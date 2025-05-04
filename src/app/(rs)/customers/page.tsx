import { Metadata } from "next";
import CustomerSearch from "./CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";
import * as Sentry from "@sentry/nextjs";
import CustomerTable from "./CustomerTable";

export const metadata: Metadata = {
  title: "Customers",
};

const Customers = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { searchText } = await searchParams;

  if (!searchText) return <CustomerSearch />;

  const span = Sentry.startInactiveSpan({
    name: "getCustomerSearchResults-1",
  });
  const results = await getCustomerSearchResults(searchText);

  span.end();

  return (
    <div className="flex flex-col gap-5">
      <CustomerSearch />
      <h2 className="text-2xl">Search Results</h2>
      {results.length ? (
        <CustomerTable data={results} />
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Customers;
