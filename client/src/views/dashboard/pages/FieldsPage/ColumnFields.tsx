import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Field } from "@/interfaces";
import { Link } from "react-router-dom";
import UpdateField from "./UpdateField";
import DeleteField from "./DeleteField";

export const ColumnFields: ColumnDef<Field>[] = [
  {
    id: "select",
    header: () => <>{"  "}</>,
    cell: () => <>{"  "}</>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "sessions",
    header: "Total Sessions",
    cell: ({ row }) => {
      const arraySessions: string[] = row.getValue("sessions");
      return <div className="font-medium">{arraySessions.length}</div>;
    },
  },
  {
    accessorKey: "students",
    header: "Total Students",
    cell: ({ row }) => {
      const arrayStudents: string[] = row.getValue("students");
      return (
        <div className="text-left font-medium">{arrayStudents.length}</div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const fieldObj: Field = row.original;

      return (
        <div className="flex gap-4 text-black">
          <Link to={fieldObj._id}>
            <div className="cursor-pointer">
              <Eye className="h-5 w-5" />
            </div>
          </Link>

          <UpdateField
            FieldUpdtId={fieldObj._id}
            defaultName={fieldObj.name}
            defaultDescript={fieldObj.description}
          />

          <DeleteField FieldUpdtId={fieldObj._id} />
        </div>
      );
    },
  },
];
