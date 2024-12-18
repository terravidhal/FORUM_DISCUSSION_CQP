import { ColumnDef } from "@tanstack/react-table";
import { CalendarDays } from "lucide-react";
import { Session } from "@/interfaces";
import DetailsPopup from "../../thisComponents/DetailsPopup";
import { formatDate2 } from "@/constants/generalTools";
import UpdateSession from "../DetailsFieldPage/UpdateSession";
import DeleteSession from "../DetailsFieldPage/DeleteSession";

export const ColumnSessions: ColumnDef<Session>[] = [
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const sessionObj: Session = row.original;

      return (
        <div className="flex gap-4 text-black">
          <DetailsPopup
            color="bg-[#83a3ba]"
            title={sessionObj?.name}
            description={`Students : ${sessionObj?.students?.length}`}
            starLabel="Star"
            textIcon=""
            starCount={`start : ${formatDate2(sessionObj?.dateOfConductStart)}`}
            views={`end : ${formatDate2(sessionObj?.dateOfConductEnd)}`}
            updated={`Created ${formatDate2(sessionObj?.createdAt || "")}`}
          >
            <CalendarDays className="h-8 w-8 text-black" />
          </DetailsPopup>

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
