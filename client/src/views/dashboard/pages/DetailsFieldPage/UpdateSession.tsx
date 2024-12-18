import { useFields, useSessions } from "@/api/services";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";
import { useGeneralHook } from "@/hooks/generalHook";
import FormSession from "./FormSession";

interface UpdateSessionProps {
  defaultName?: string;
  defaultDateStart?: string;
  defaultDateEnd?: string;
  defaultDateIssue?: string;
  SessionUpdtId: string;
}

const UpdateSession = ({
  defaultName,
  defaultDateStart,
  defaultDateEnd,
  defaultDateIssue,
  SessionUpdtId,
}: UpdateSessionProps) => {
  const { OneField } = useFields();
  const { isOpenFormSession, setIsOpenFormSession, updateSessionMutation } =
    useSessions();
  const { validateDates } = useGeneralHook();

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const name = formData.get("name") as string;
    const dateOfConductStart = formData.get("dateOfConductStart") as string;
    const dateOfConductEnd = formData.get("dateOfConductEnd") as string;
    const dateOfCertif = formData.get("dateOfCertif") as string;
    const field = OneField?._id as string;
    const idSessionUpdt = SessionUpdtId;

    if (!name || !dateOfConductStart || !dateOfConductEnd || !dateOfCertif) {
      toast.error("please fill all required fields");
      return;
    }

    // Validation des dates
    const validationErrors = validateDates(
      dateOfConductStart,
      dateOfConductEnd,
      dateOfCertif
    );
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => toast.error(error));
      return;
    }

    updateSessionMutation({
      name,
      dateOfConductStart,
      dateOfConductEnd,
      dateOfCertif,
      field,
      idSessionUpdt,
    });
  };

  return (
    <FormSession
      isOpen={isOpenFormSession}
      setIsOpen={setIsOpenFormSession}
      dialogTitle={"Update Session"}
      handleSubmit={handleSubmit}
      defaultName={defaultName}
      defaultDateStart={defaultDateStart}
      defaultDateEnd={defaultDateEnd}
      defaultDateIssue={defaultDateIssue}
    >
      <div className="cursor-pointer">
        <SquarePen className="h-5 w-5" />
      </div>
    </FormSession>
  );
};

export default UpdateSession;
