import { useLogout } from "@/api/services";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGeneralHook } from "@/hooks/generalHook";
import { useEffect } from "react";
import { User2 } from 'lucide-react';

const User = () => {
  const { logoutMutation } = useLogout();
  const { setIsConnect } = useGeneralHook();
  const storedUserObj = localStorage.getItem("USER_OBJ");

  /*useEffect(() => {
    if (storedUserObj !== null) {
      setIsConnect(true);
    } else {
      setIsConnect(false);
    }
  }, []);*/

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <img
            src="/images/placeholder-user.jpg"
            alt="Avatar"
            className="w-[36px]  h-[36px] overflow-hidden rounded-full"
          />
        </Button> */}
          <User2 className="h-6 w-6 text-gray-700" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={() => logoutMutation()}>Sign Out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
