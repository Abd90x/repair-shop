import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-background/80">
      <div className="w-full h-dvh grid place-content-center">
        <LoaderCircle className="animate-spin text-foreground/20 size-52 max-w-full p-8" />
      </div>
    </div>
  );
}
