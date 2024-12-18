import * as React from "react";
import { cn } from "@/lib/utils";

export default function CardField() {
  return (
    <>
      <ul className=" border mt-4 bg-white rounded-md p-3 md:w-[400px] lg:w-[500px]">
        <li className="">
          <a
            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md"
            href="/"
          >
            <div className="mb-1 mt-1 text-lg font-medium">shadcn/ui</div>
            <p className="text-sm leading-tight text-muted-foreground">
              Beautifully designed components that you can copy and paste into
              your apps. Accessible. Customizable. Open Source.
            </p>
          </a>
        </li>
      </ul>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </li>
  );
});
ListItem.displayName = "ListItem";
