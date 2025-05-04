import { Metadata } from "next";
import TicketSearch from "./TicketSearch";

import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";
import TicketTable from "./TicketTable";

export const metadata: Metadata = {
  title: "Tickets",
};

const Tickets = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { searchText } = await searchParams;

  if (!searchText) {
    const results = await getOpenTickets();
    return (
      <div className="flex flex-col gap-5">
        <TicketSearch />
        {results.length ? (
          <TicketTable data={results} />
        ) : (
          <h2 className="text-2xl mb-2">No Tickets</h2>
        )}
      </div>
    );
  }

  const results = await getTicketSearchResults(searchText);

  return (
    <div className="flex flex-col gap-5">
      <TicketSearch />
      <h2 className="text-2xl mb-2">Search Results</h2>
      {results.length ? (
        <TicketTable data={results} />
      ) : (
        <h2 className="text-2xl mb-2">No Tickets</h2>
      )}
    </div>
  );
};

export default Tickets;
