import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Session } from "@/interfaces";
import { Link } from "react-router-dom";
import UpdateSession from "./UpdateSession";
import DeleteSession from "./DeleteSession";

export const ColumnSession: ColumnDef<Session>[] = [
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
    accessorKey: "dateOfConductStart",
    header: "Start",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("dateOfConductStart")}</div>
    ),
  },
  {
    accessorKey: "dateOfConductEnd",
    header: "End",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("dateOfConductEnd")}</div>
    ),
  },
  {
    accessorKey: "dateOfCertif",
    header: "Date Of Issue",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("dateOfCertif")}</div>
    ),
  },
  {
    accessorKey: "students",
    header: "Total students",
    cell: ({ row }) => {
      const arrayStudents: string[] = row.getValue("students");
      return <div className="font-medium">{arrayStudents.length}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const sessionObj: Session = row.original;
      return (
        <div className="flex gap-4 text-black">
          <Link to={"session/" + sessionObj?._id}>
            <div className="cursor-pointer">
              <Eye className="h-5 w-5" />
            </div>
          </Link>

          <UpdateSession
            defaultName={sessionObj?.name}
            defaultDateStart={sessionObj?.dateOfConductStart}
            defaultDateEnd={sessionObj?.dateOfConductEnd}
            defaultDateIssue={sessionObj?.dateOfCertif}
            SessionUpdtId={sessionObj?._id}
          />

          <DeleteSession SessionUpdtId={sessionObj?._id} />
        </div>
      );
    },
  },
];
