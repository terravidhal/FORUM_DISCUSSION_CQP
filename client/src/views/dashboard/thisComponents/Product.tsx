import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";

const Product = ({ product }: { product: any }) => {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <img
          src="/images/placeholder-user.jpg"
          alt="Product image"
          className="w-[64px]  h-[64px] aspect-square rounded-md object-cover"
        />
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {product.status ?? "test"}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${
        product.price ?? "test"
      }`}</TableCell>
      <TableCell className="hidden md:table-cell">
        {product.stock ?? "test"}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {product.availableAt.toLocaleDateString("en-US") ?? "test"}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action="">
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default Product;
