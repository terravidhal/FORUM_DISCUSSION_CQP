import { useFields } from "@/api/services";
import FormField from "./FormField";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";

interface UpdateFieldProps {
  defaultName?: string;
  defaultDescript?: string;
  FieldUpdtId: string;
}

const UpdateField = ({
  defaultName,
  defaultDescript,
  FieldUpdtId,
}: UpdateFieldProps) => {
  const { updateFieldMutation, isOpenFormField, setIsOpenFormField } =
    useFields();

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const idFieldUpdt = FieldUpdtId;
    if (!name || !description) {
      toast.error("please fill all required fields");
      return;
    }
    updateFieldMutation({ name, description, idFieldUpdt });
  };

  return (
    <FormField
      isOpen={isOpenFormField}
      setIsOpen={setIsOpenFormField}
      dialogTitle={"Update Field"}
      handleSubmit={handleSubmit}
      defaultName={defaultName}
      defaultDescript={defaultDescript}
    >
      <div className="cursor-pointer">
        <SquarePen className="h-5 w-5" />
      </div>
    </FormField>
  );
};

export default UpdateField;
