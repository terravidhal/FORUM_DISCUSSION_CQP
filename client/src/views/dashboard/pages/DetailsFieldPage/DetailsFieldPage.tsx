import { File, LibraryBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../../thisComponents/DataTable";
import { ColumnSession } from "./ColumnSession";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useFields, useSessions } from "@/api/services";
import { toast } from "sonner";
import { Session } from "@/interfaces";
import FormSession from "./FormSession";
import CardDetails from "../DashBoardHomePage/CardDetails";
import { useGeneralHook } from "@/hooks/generalHook";

const DetailsFieldPage = () => {
  const { OneField, isLoadedDetailsField } = useFields();
  const { createSessionMutation, isOpenFormSession, setIsOpenFormSession } =
    useSessions();

  const { formatDate2, validateDates } = useGeneralHook();

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const newData = OneField?.sessions?.map((item: Session) => ({
    _id: item?._id || "",
    name: item?.name || "",
    dateOfConductStart: item?.dateOfConductStart || "",
    dateOfConductEnd: item?.dateOfConductEnd || "",
    dateOfCertif: item?.dateOfCertif || "",
    field: OneField?.name || "",
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
    const dateOfConductStart = formData.get("dateOfConductStart") as string;
    const dateOfConductEnd = formData.get("dateOfConductEnd") as string;
    const dateOfCertif = formData.get("dateOfCertif") as string;
    const field = OneField?._id as string;
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

    createSessionMutation({
      name,
      dateOfConductStart,
      dateOfConductEnd,
      dateOfCertif,
      field,
    });
  };

  return (
    <>
      <CardDetails
        color="bg-[#65e892]"
        title={OneField?.name}
        description="The programs  represent the study paths offered in our application. 
       Each program is designed to provide comprehensive training in a specific 
       field, including various modules and courses."
        starLabel="Star"
        starCount={`Sessions : ${OneField?.sessions?.length}`}
        views={`Students : ${OneField?.students?.length}`}
        updated={`Created ${formatDate2(OneField?.createdAt)}`}
      >
        <LibraryBig className="h-8 w-8 text-black" />
      </CardDetails>

      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button
            onClick={handleExportData}
            size="sm"
            variant="outline"
            className="h-8 gap-1 bg-[#132743] hover:bg-[#193358] hover:text-white text-white"
          >
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <FormSession
            isOpen={isOpenFormSession}
            setIsOpen={setIsOpenFormSession}
            dialogTitle={"Create Session"}
            buttonName={"Add Session"}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      <div>
        <DataTable
          loading={isLoadedDetailsField}
          columns={ColumnSession}
          data={OneField?.sessions || []}
        />
      </div>
    </>
  );
};

export default DetailsFieldPage;
