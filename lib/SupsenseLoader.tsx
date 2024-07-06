import { Loader2 } from "lucide-react";
import { ComponentProps, Suspense } from "react";

export const SuspenseLoader = (props: ComponentProps<typeof Suspense>) => <Suspense
  fallback={<Loader2 className="animate-spin" size={ 20} />}
  {...props} />



