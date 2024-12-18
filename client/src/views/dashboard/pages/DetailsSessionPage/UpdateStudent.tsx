import { useFields, useSessions, useStudent } from "@/api/services";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";
import FormStudent from "./FormStudent";
import { UpdateStudentProps } from "@/interfaces/interfaces";


const UpdateStudent = ({
  defaultName,
  defaultLevel,
  defaultSchoolBoarding,
  defaultCertif,
  StudentUpdtId,
}: UpdateStudentProps) => {
  const { OneSession } = useSessions();
  const { OneField } = useFields();
  const { isOpenFormStudent, setIsOpenFormStudent, updateStudentMutation } =
    useStudent();

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const name = formData.get("name") as string;
    const totalAmountValue = formData.get("totalAmount");
    const totalAmount = totalAmountValue
      ? Number(totalAmountValue)
      : undefined;
    const levelStudentValue = formData.get("levelStudent");
    const levelStudent = levelStudentValue
      ? Number(levelStudentValue)
      : undefined;
    const typeOfCertifValue = formData.get("typeOfCertif") as string;
    const typeOfCertif =
      typeOfCertifValue === "Seven_Academy" ||
      typeOfCertifValue === "Seven_Kids_Code"
        ? typeOfCertifValue
        : undefined;
    const field = OneField?._id;
    const session = OneSession?._id;
    const idStudentUpdt = StudentUpdtId;
    if (!name || !levelStudent || !typeOfCertif) {
      toast.error("please fill all required fields");
      return;
    }
    updateStudentMutation({
      name,
      levelStudent,
      totalAmount,
      typeOfCertif,
      field,
      session,
      idStudentUpdt,
    });
  };

  return (
    <FormStudent
      emailNone={true}
      isOpen={isOpenFormStudent}
      setIsOpen={setIsOpenFormStudent}
      dialogTitle={"Update Student"}
      handleSubmit={handleSubmit}
      defaultName={defaultName}
      defaultLevel={defaultLevel}
      defaultSchoolBoarding={defaultSchoolBoarding}
      defaultCertif={defaultCertif}
      StudentUpdtId={StudentUpdtId}
    >
      <div className="cursor-pointer">
        <SquarePen className="h-5 w-5" />
      </div>
    </FormStudent>
  );
};

export default UpdateStudent;
