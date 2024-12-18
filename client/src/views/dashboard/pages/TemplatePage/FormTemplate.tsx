import { useTemplates } from "@/api/services";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpFromLine, FileUp } from "lucide-react";
import { toast } from "sonner";
import { useGeneralHook } from "@/hooks/generalHook";

export default function FormTemplate() {
  const {
    isOpenFormTemplate, 
    setIsOpenTemplate,
    createTemplateMutation,
  } = useTemplates();

  const {
    isUploaded,
    setIsUploaded,
  } = useGeneralHook();

 

  const handleOpenChange = (open: boolean) => {
    if (setIsOpenTemplate) {
      setIsOpenTemplate(open);
      setIsUploaded(false);
    }
  };

  const handleFileValidation = (ev:any) => {
    const file = ev.target.files[0];
  
    if (file) {
      const validFileType = ".hbs";
  
      if (!file.name.endsWith(validFileType)) {
        toast.error("Please upload a valid .hbs file");
        ev.target.value = ""; // Reset the input value
        setIsUploaded(false);
        return;
      }
  
      setIsUploaded(true);
    } else {
      setIsUploaded(false);
    }
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const receiptTemplate = formData.get("template");
  
    // Check if the template is a valid File and has a size
    const isValidTemplate = receiptTemplate instanceof File && receiptTemplate.size > 0;
  
    if (!isValidTemplate) {
      toast.error("please field is required");
      !isValidTemplate && toast.error("The Template field is required and must be a valid .hbs file");
      return;
    }
  
    console.log(formData);
    createTemplateMutation(formData);
    handleOpenChange(false);
  };


  

  return (
    <Dialog open={isOpenFormTemplate} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-white shadow hover:bg-primary/90 h-9 px-4 py-2">
          <FileUp className="h-5 w-5" />
          Upload
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Add New Template</DialogTitle>
          <DialogDescription>
            Enter new template. Click 'Save' when you're ready to proceed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid gap-4 py-4 overflow-y-auto max-h-[190px] px-[10px] ">
            <div className="flex items-center gap-4">
              <Label
                htmlFor={`template`}
                className={`flex gap-2 items-center cursor-pointer text-sm px-4 text-right py-2 rounded-md ${
                  isUploaded ? "bg-primary" : "bg-slate-500"
                } text-white`}
              >
                <ArrowUpFromLine size="15px" /> Template
              </Label>
              <Input
                id={`template`}
                name="template"
                type="file"
                accept=".hbs"
                placeholder="Receipt"
                className={`col-span-1`}
                onChange={handleFileValidation}
              />
              <Button
                className={`text-white ${
                    isUploaded
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50 pointer-events-none"
                }`}
                type="submit"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
