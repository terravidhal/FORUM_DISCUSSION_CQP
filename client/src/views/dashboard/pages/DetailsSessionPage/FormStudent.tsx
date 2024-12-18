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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormStudentProps } from "@/interfaces/interfaces";
import { PlusCircle } from "lucide-react";




export default function FormStudent({
  buttonName,
  dialogTitle,
  handleSubmit,
  isOpen,
  setIsOpen,
  defaultName,
  defaultLevel,
  defaultSchoolBoarding,
  defaultCertif,
  emailNone,
  children,
}: FormStudentProps) {

  
  const handleOpenChange = (open : boolean) => {
    if (setIsOpen) {
      setIsOpen(open);
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {
          buttonName ?
          <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1 text-white">
                <PlusCircle className="h-3.5 w-3.5" />
                <span  className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {buttonName}
                </span>
              </Button>
           </DialogTrigger>
           : null
        }

      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            Make changes to your student here. Click save when you're done.
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
                placeholder="ex : Vidhal"
                className="col-span-3"
              />
            </div>
            {
              !emailNone ?
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ex : vidhalelame@gmail.com"
                className="col-span-3"
              />
            </div> : null
            }
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="levelStudent" className="text-right">
                Level
              </Label>
              <Select defaultValue={defaultLevel} name="levelStudent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Level</SelectLabel>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="totalAmount" className="text-right">
                School Boarding
              </Label>
              <Input
                id="totalAmount"
                name="totalAmount"
                placeholder="ex : 250000"
                className="col-span-3"
                type="number"
                defaultValue={defaultSchoolBoarding}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="typeOfCertif" className="text-right">
                Certification Model
              </Label>
              <Select defaultValue={defaultCertif} name="typeOfCertif">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select type Of Certif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>type Of Certif</SelectLabel>
                    <SelectItem value="Seven_Academy">Seven Academy</SelectItem>
                    <SelectItem value="Seven_Kids_Code">
                      Seven Kids Code
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button className="text-white" type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
