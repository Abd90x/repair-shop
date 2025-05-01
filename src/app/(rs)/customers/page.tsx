import { Metadata } from "next";
import CustomerSearch from "./CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";
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

  const results = await getCustomerSearchResults(searchText);

  return (
    <>
      <CustomerSearch />
      <h2 className="text-2xl mb-2">Search Results</h2>
      {JSON.stringify(results)}
    </>
  );
};

export default Customers;
