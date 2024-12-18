import { ColumnDef } from "@tanstack/react-table";
import { Users } from "lucide-react";
import { student } from "@/interfaces";
import PreviewCertificate from "./PreviewCertificate";
import AlertDialogPopup from "./AlertDialogPopup";
import { Badge } from "@/components/ui/badge";
import DetailsPopup from "../../thisComponents/DetailsPopup";
import { countActions, formatDate2 } from "@/constants/generalTools";
import UpdateStudent from "./UpdateStudent";
import DeleteStudent from "./DeleteStudent";
import { Link } from "react-router-dom";
import baseUrlFront from "@/constants/baseUrlFront";
import FormPayment from "./FormPayment";


export const ColumnStudent: ColumnDef<student>[] = [
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
    accessorKey: "levelStudent",
    header: "Level",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("levelStudent")}</div>
    ),
  },
  {
    accessorKey: "typeOfCertif",
    header: "type Of Certif",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("typeOfCertif")}</div>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const studentObj: any = row.original; 

      return studentObj?.AudLogCertif.length === 0 ? (
        <Badge className="bg-transparent border-white text-white hover:bg-transparent">
          No Send
        </Badge>
      ) : (
        <Badge className="bg-transparent border-[#132743] text-[#132743] hover:bg-transparent">
          S&d({studentObj?.AudLogCertif.length})
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const studentObj: student = row.original; 

      return (
        <div className="flex gap-4 text-black">
          <div className="flex-none cursor-pointer">
            <PreviewCertificate
              course={studentObj?.field?.name}
              email={studentObj?.email}
              typeOfCertif={studentObj?.typeOfCertif}
              studentId={studentObj?._id}
              fielsId={studentObj?.field?._id}
              sessionId={studentObj?.session?._id}
              nameOfSession={studentObj?.session?.name}
              dateOfConductStart={studentObj?.session?.dateOfConductStart}
              dateOfConductEnd={studentObj?.session?.dateOfConductEnd}
              dateOfCertif={studentObj?.session?.dateOfCertif || ""}
              name={studentObj?.name}
              linkVerif={
                baseUrlFront +
                "verif/" +
                studentObj?.typeOfCertif +
                "/" +
                studentObj?._id
              }
              dialogTitle={"Preview certificate"}
            />
          </div>
          <AlertDialogPopup
            course={studentObj?.field?.name}
            email={studentObj?.email}
            typeOfCertif={studentObj?.typeOfCertif}
            studentId={studentObj?._id}
            fielsId={studentObj?.field?._id}
            sessionId={studentObj?.session?._id}
            nameOfSession={studentObj?.session?.name}
            dateOfConductStart={studentObj?.session?.dateOfConductStart}
            dateOfConductEnd={studentObj?.session?.dateOfConductEnd}
            dateOfCertif={studentObj?.session?.dateOfCertif || ""}
            name={studentObj?.name}
            linkVerif={
              baseUrlFront +
              "verif/" +
              studentObj?.typeOfCertif +
              "/" +
              studentObj?._id
            }
            dialogTitle={"Preview certificate"}
          />
          <DetailsPopup
            // color = "bg-[#256390]"
           // color="bg-[#83a3ba]"
            title={studentObj?.name}
            totalAmount={studentObj?.totalAmount}
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
            payments={studentObj?.paymentIds}
          >
            <Users className="h-8 w-8 text-black" />
          </DetailsPopup>

          <UpdateStudent
            defaultName={studentObj?.name}
            defaultLevel={String(studentObj?.levelStudent)}
            defaultCertif={studentObj?.typeOfCertif}
            StudentUpdtId={studentObj?._id}
            defaultSchoolBoarding={studentObj?.totalAmount}
          />

          <Link to={"/verif/"+studentObj?.typeOfCertif+"/"+studentObj?._id}>
                   55555
          </Link>

          <FormPayment
            studentId= {studentObj?._id}
            totalAmount = {studentObj?.totalAmount}
            remainingAmount = {studentObj?.remainingAmount}
          />

          <DeleteStudent StudentUpdtId={studentObj?._id} />
        </div>
      );
    },
  },
];


