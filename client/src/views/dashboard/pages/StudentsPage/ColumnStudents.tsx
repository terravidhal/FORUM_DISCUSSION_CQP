import { ColumnDef } from "@tanstack/react-table";
import { Users } from "lucide-react";
import { student } from "@/interfaces";
import DetailsPopup from "../../thisComponents/DetailsPopup";
import { countActions, formatDate2 } from "@/constants/generalTools";
import UpdateStudent from "../DetailsSessionPage/UpdateStudent";
import DeleteStudent from "../DetailsSessionPage/DeleteStudent";

export const ColumnStudents: ColumnDef<student>[] = [
  {
    id: "select",
    header: () => <>{"  "}</>,
    cell: () => <>{"  "}</>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="uppercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "levelStudent",
    header: "LevelStudent",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("levelStudent")}</div>
    ),
  },
  {
    accessorKey: "typeOfCertif",
    header: "Type Of Certif",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("typeOfCertif")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const studentObj: student = row.original;

      return (
        <div className="flex gap-4 text-black">
          <DetailsPopup
            color="bg-[#83a3ba]"
            title={studentObj?.name}
            description={studentObj?.email}
            starLabel="Star"
            starCount={`total download : ${
              countActions(studentObj?.AudLogCertif).download
            }`}
            views={`total email : ${
              countActions(studentObj?.AudLogCertif).send
            }`}
            updated={`Created ${formatDate2(studentObj?.createdAt || "")}`}
            level={studentObj?.levelStudent}
            typeofCertif={studentObj?.typeOfCertif}
            field={studentObj?.field?.name}
            session={studentObj?.session?.name}
          >
            <Users className="h-8 w-8 text-black" />
          </DetailsPopup>

          <UpdateStudent
            defaultName={studentObj?.name}
            defaultLevel={String(studentObj?.levelStudent)}
            defaultCertif={studentObj?.typeOfCertif}
            StudentUpdtId={studentObj?._id}
          />

          <DeleteStudent StudentUpdtId={studentObj?._id} />
        </div>
      );
    },
  },
];
