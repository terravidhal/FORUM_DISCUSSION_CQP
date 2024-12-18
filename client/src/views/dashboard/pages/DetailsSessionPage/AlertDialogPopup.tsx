import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Mail } from "lucide-react";
import ModalSevenKidsCode from "./ModalSevenKidsCode/ModalSevenKidsCode";
import ModalSevenAcademy from "./ModalSevenAcademy/ModalSevenAcademy";
import { useAudLogCertificate, useStudent } from "@/api/services";
import { useGeneralHook } from "@/hooks/generalHook";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { AlertDialogPopupProps } from "@/interfaces/interfaces";



export default function AlertDialogPopup({
  course,
  linkVerif,
  name,
  email,
  dateOfConductStart,
  dateOfConductEnd,
  dateOfCertif,
  typeOfCertif,
  nameOfSession,
  studentId,
  fielsId,
  sessionId,
}: AlertDialogPopupProps) {
  const { certificateRef, formatDate } = useGeneralHook();
  const { sendEmailsMutation } = useStudent();
  const { createAudLogCertifMutation } = useAudLogCertificate();

  const sendNotifs = () => {
    if (!certificateRef.current) return console.error("certificateRef is null");
    html2canvas(certificateRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("l", "mm", [1000, 670]);
      pdf.addImage(imgData, "PNG", 0, 0, 1000, 667);
      const filename = `${name.split(" ").join("_")}_certificate_${formatDate(
        new Date()
      )}.pdf`;
      const studentInfo = { email: email, name: name };
      sendEmailsMutation({
        imgData: imgData,
        filename: filename,
        studentInfo: studentInfo,
      });

      const certifInfos = {
        nameOfCertif: filename,
        nameStudent: name,
        linkVerif: linkVerif,
        dateOfCertif: dateOfCertif,
        nameOfCourse: course,
        nameOfSession: nameOfSession,
        studentId: studentId,
        fielsId: fielsId,
        sessionId: sessionId,
        action: "SEND_EMAIL",
      };
      createAudLogCertifMutation(certifInfos);
    });
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="cursor-pointer">
            <Mail className="h-5 w-5" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure to send the email?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The student will receive their
              certificate by email
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="text-white" onClick={sendNotifs}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div style={{ top: "-590px" }} className="fixed">
        {typeOfCertif === "Seven_Academy" ? (
          <ModalSevenAcademy
            linkVerif={linkVerif}
            name={name}
            ref={certificateRef}
            course={course}
            dateOfConductStart={dateOfConductStart}
            dateOfConductEnd={dateOfConductEnd}
            dateOfCertif={dateOfCertif}
          />
        ) : typeOfCertif === "Seven_Kids_Code" ? (
          <ModalSevenKidsCode
            linkVerif={linkVerif}
            name={name}
            ref={certificateRef}
            course={course}
            dateOfConductStart={dateOfConductStart}
            dateOfConductEnd={dateOfConductEnd}
            dateOfCertif={dateOfCertif}
          />
        ) : null}
      </div>
    </>
  );
}
