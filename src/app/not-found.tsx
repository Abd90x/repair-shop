import { Button } from "@/components/ui/button";
import { Ship } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center gap-4">
      <Ship className="size-32" />
      <h2 className="text-5xl font-bold">Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/tickets">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
