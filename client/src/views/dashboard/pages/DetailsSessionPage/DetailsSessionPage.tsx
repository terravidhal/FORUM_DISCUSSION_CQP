import { CalendarDays, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../../thisComponents/DataTable";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useFields, useSessions, useStudent } from "@/api/services";
import { toast } from "sonner";
import { student } from "@/interfaces";
import FormStudent from "./FormStudent";
import { ColumnStudent } from "./ColumnStudent";
import CardDetails from "../DashBoardHomePage/CardDetails";
import { useGeneralHook } from "@/hooks/generalHook";



const DetailsSessionPage = () => {
  const { OneSession, isLoadedDetailsSession } = useSessions();
  const { OneField } = useFields();
  const { isOpenFormStudent, setIsOpenFormStudent, createStudentMutation } =
    useStudent();

  const { formatDate2 } = useGeneralHook();

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const newData = OneSession?.students?.map((item: student) => ({
    _id: item?._id || "",
    name: item?.name || "",
    levelStudent: item?.levelStudent || "",
    typeOfCertif: item?.typeOfCertif || "",
    field: OneField?.name || "",
    session: OneSession?.name || "",
  }));

  const handleExportData = () => {
    if (newData.length !== 0) {
      const csv = generateCsv(csvConfig)(newData);
      download(csvConfig)(csv);
    }
    toast.error("table is empty!!!");
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
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
    const field = OneField?._id as string;
    const session = OneSession?._id as string;
    if (!name || !levelStudent || !typeOfCertif || !totalAmount) {
      toast.error("please fill all required fields");
      return;
    }
    createStudentMutation({
      name,
      email,
      levelStudent,
      totalAmount,
      typeOfCertif,
      field,
      session,
    });
  };

  return (
    <>
      <div className="flex items-center">
        <CardDetails
          color="bg-[#3994d6]"
          title={OneSession?.name}
          description="The sessions are specific periods during which the 
       programs are offered. Each session allows students to enroll 
       and take the courses associated with a given program."
          starLabel="Star"
          starCount={`start : ${formatDate2(OneSession?.dateOfConductStart)}`}
          views={`end : ${formatDate2(OneSession?.dateOfConductEnd)}`}
          updated={`Students : ${OneSession?.students?.length}`}
        >
          <CalendarDays className="h-8 w-8 text-black" />
        </CardDetails>

        <div className="ml-auto flex items-center gap-2">
          <Button
            onClick={handleExportData}
            size="sm"
            variant="outline"
            className="h-8 gap-1 bg-[#132743] hover:bg-[#1c375e] hover:text-white text-white"
          >
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>

          <FormStudent
            isOpen={isOpenFormStudent}
            setIsOpen={setIsOpenFormStudent}
            dialogTitle={"Create Student"}
            buttonName={"Add Student"}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      <div>
        <DataTable
          loading={isLoadedDetailsSession}
          columns={ColumnStudent}
          data={OneSession?.students || []}
        />
      </div>
    </>
  );
};

export default DetailsSessionPage;
