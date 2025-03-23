import * as React from "react";
import { cn } from "app/lib/utils";
import { LoaderCircleIcon, LoaderIcon, LucideLoaderCircle } from "lucide-react";

const spinnerVariants = "w-6 h-6 rounded-full animate-spin opacity-70";

interface LoadingSpinnerProps extends React.HTMLAttributes<SVGSVGElement> {
  className?: string;
}

const LoadingSpinner = React.forwardRef<SVGSVGElement, LoadingSpinnerProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <LucideLoaderCircle
        ref={ref}
        className={cn(spinnerVariants, className)}
        {...rest}
      />
    );
  }
);

LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner };
