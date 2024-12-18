import { useSessions } from "@/api/services";
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

interface DeleteSessionProps {
  SessionUpdtId: string;
}

const DeleteSession = ({ SessionUpdtId }: DeleteSessionProps) => {
  const { isOpenFormSession, setIsOpenFormSession, deleteSessionMutation } =
    useSessions();

  const handleDelete = () => {
    const idSessionUpdt = SessionUpdtId;
    deleteSessionMutation({ idSessionUpdt });
  };

  const handleOpenChange = (open: boolean) => {
    if (setIsOpenFormSession) {
      setIsOpenFormSession(open);
    }
  };

  return (
    <AlertDialog open={isOpenFormSession} onOpenChange={handleOpenChange}>
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

export default DeleteSession;
