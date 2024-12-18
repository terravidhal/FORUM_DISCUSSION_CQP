import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

interface FormFieldProps {
  buttonName?: string;
  dialogTitle?: string;
  handleSubmit?: (ev: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  defaultName?: string;
  defaultDescript?: string;
  children?: any;
}

export default function FormField({
  buttonName,
  dialogTitle,
  handleSubmit,
  isOpen,
  setIsOpen,
  defaultName,
  defaultDescript,
  children,
}: FormFieldProps) {
  const handleOpenChange = (open: boolean) => {
    if (setIsOpen) {
      setIsOpen(open);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {buttonName ? (
        <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="text-white h-3.5 w-3.5" />
            <span className="sr-only text-white sm:not-sr-only sm:whitespace-nowrap">
              {buttonName}
            </span>
          </Button>
        </DialogTrigger>
      ) : null}

      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            Make changes to your field here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={defaultName}
                placeholder="ex : web developement"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                defaultValue={defaultDescript}
                placeholder="learn best programms"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="text-white" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
