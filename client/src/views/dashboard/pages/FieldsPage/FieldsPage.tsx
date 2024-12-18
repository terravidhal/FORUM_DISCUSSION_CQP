import {
  File,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../../thisComponents/DataTable";
import { ColumnFields } from "./ColumnFields";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useFields } from "@/api/services";
import FormField from "./FormField";
import { toast } from "sonner";
import { Field } from "@/interfaces";
import CardItems from "../DashBoardHomePage/CardItems";
import { CardType, cardData } from "@/datas/data";





const FieldsPage = () => {
  const {
    allFields,
    createFieldMutation,
    isOpenFormField,
    setIsOpenFormField,
    isLoadedField,
  } = useFields();

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const newData = allFields?.map((item: Field) => ({
    _id: item?._id || '',
    name: item?.name || '',
    description: item?.description || '',
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
    const description = formData.get("description") as string;
    if (!name || !description) {
      toast.error("please fill all required fields");
      return;
    }
    createFieldMutation({ name, description });
  };

  return (
    <>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button
            onClick={handleExportData}
            size="sm"
            variant="outline"
            className="h-8 gap-1 bg-primary hover:bg-primary/85"
          >
            <File className="h-3.5 w-3.5 text-white" />
            <span className=" text-white sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
            <FormField
              isOpen={isOpenFormField}
              setIsOpen={setIsOpenFormField}
              dialogTitle={"Create Field"}
              buttonName={"Add Field"}
              handleSubmit={handleSubmit}
            />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card: CardType, index: number) => (
          <CardItems card={card} key={index} order={index} />
        ))}
      </div>



      <div>
          <DataTable loading={isLoadedField} columns={ColumnFields} data={allFields || []} />
      </div>
    </>
  );
};

export default FieldsPage;
