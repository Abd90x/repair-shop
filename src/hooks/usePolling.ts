import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function usePolling(ms: number = 60000, searchParams: string | null) {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!searchParams) router.refresh();
    }, ms);

    return () => clearInterval(interval);
  }, [ms, searchParams]); // eslint-disable-line react-hooks/exhaustive-deps
}
