import { SheetClose } from "@/components/ui/sheet";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const NavItemMobile = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <SheetClose asChild>
      <Link
        to={href}
        className={clsx(
          "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
          {
            "text-black text-foreground": pathname === href,
          }
        )}
      >
        {children}
        {label}
      </Link>
    </SheetClose>
  );
};

export default NavItemMobile;
