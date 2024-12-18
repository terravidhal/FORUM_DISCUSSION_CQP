import { useFields } from "@/api/services";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface DeleteFieldProps {
  FieldUpdtId: string;
}

const DeleteField = ({ FieldUpdtId }: DeleteFieldProps) => {
  const { deleteFieldMutation, isOpenFormField, setIsOpenFormField } =
    useFields();

  const handleDelete = () => {
    const idFieldUpdt = FieldUpdtId;
    deleteFieldMutation({ idFieldUpdt });
  };

  const handleOpenChange = (open: boolean) => {
    if (setIsOpenFormField) {
      setIsOpenFormField(open);
    }
  };

  return (
    <AlertDialog open={isOpenFormField} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <div className="cursor-pointer">
          <Trash2 className="h-5 w-5" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone..
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="text-white bg-red-600 hover:bg-red-500"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteField;
