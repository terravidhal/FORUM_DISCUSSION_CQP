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

interface FormSessionProps {
  buttonName?: string;
  dialogTitle?: string;
  handleSubmit?: (ev: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  defaultName?: string;
  defaultDateStart?: string;
  defaultDateEnd?: string;
  defaultDateIssue?: string;
  children?: any;
}

export default function FormSession({
  buttonName,
  dialogTitle,
  handleSubmit,
  isOpen,
  setIsOpen,
  defaultName,
  defaultDateStart,
  defaultDateEnd,
  defaultDateIssue,
  children,
}: FormSessionProps) {
  const handleOpenChange = (open: boolean) => {
    if (setIsOpen) {
      setIsOpen(open);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {buttonName ? (
        <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1 text-white">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
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
            Make changes to your session here. Click save when you're done.
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
                placeholder="ex : session march 2024"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateOfConductStart" className="text-right">
                Start
              </Label>
              <Input
                id="dateOfConductStart"
                name="dateOfConductStart"
                type="date"
                defaultValue={defaultDateStart}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateOfConductEnd" className="text-right">
                End
              </Label>
              <Input
                id="dateOfConductEnd"
                name="dateOfConductEnd"
                type="date"
                defaultValue={defaultDateEnd}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateOfCertif" className="text-right">
                Date of issue
              </Label>
              <Input
                id="dateOfCertif"
                name="dateOfCertif"
                type="date"
                defaultValue={defaultDateIssue}
                placeholder="date final Of Certif"
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
