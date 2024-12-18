import { File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../../thisComponents/DataTable";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useStudent } from "@/api/services";
import { student } from "@/interfaces";
import { ColumnStudents } from "./ColumnStudents";
import { CardType, cardData } from "@/datas/data";
import CardItems from "../DashBoardHomePage/CardItems";
import { toast } from "sonner";

const StudentsPage = () => {
  const { isLoadedStudent, allStudents } = useStudent();

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const newData = allStudents?.map((item: student) => ({
    _id: item?._id,
    name: item?.name,
    email: item?.email,
    levelStudent: item?.levelStudent,
    typeOfCertif: item?.typeOfCertif,
  }));

  const handleExportData = () => {
    if (newData.length !== 0) {
      const csv = generateCsv(csvConfig)(newData);
      download(csvConfig)(csv);
    }
    toast.error("table is empty!!!");
  };

  return (
    <>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button
            onClick={handleExportData}
            size="sm"
            variant="outline"
            className="text-white bg-primary h-8 gap-1"
          >
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card: CardType, index: number) => (
          <CardItems card={card} key={index} order={index} />
        ))}
      </div>

      <div>
        <DataTable
          loading={isLoadedStudent}
          columns={ColumnStudents}
          data={allStudents || []}
        />
      </div>
    </>
  );
};

export default StudentsPage;
