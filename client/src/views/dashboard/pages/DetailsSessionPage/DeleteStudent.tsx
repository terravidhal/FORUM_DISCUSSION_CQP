import { useStudent } from "@/api/services";
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
import { DeleteStudentProps } from "@/interfaces/interfaces";
import { Trash2 } from "lucide-react";



const DeleteStudent = ({ StudentUpdtId }: DeleteStudentProps) => {
  const { isOpenFormStudent, setIsOpenFormStudent, deleteStudentMutation } =
    useStudent();

  const handleDelete = () => {
    const idStudentUpdt = StudentUpdtId;
    deleteStudentMutation({ idStudentUpdt });
  };

  const handleOpenChange = (open: boolean) => {
    if (setIsOpenFormStudent) {
      setIsOpenFormStudent(open);
    }
  };

  return (
    <AlertDialog open={isOpenFormStudent} onOpenChange={handleOpenChange}>
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

export default DeleteStudent;
