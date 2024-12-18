import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGeneralHook } from "@/hooks/generalHook";
import { ArrowDownToLine } from "lucide-react";
import ModalSevenAcademy from "./ModalSevenAcademy/ModalSevenAcademy";
import ModalSevenKidsCode from "./ModalSevenKidsCode/ModalSevenKidsCode";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useAudLogCertificate } from "@/api/services";
import { PreviewCertificateProps } from "@/interfaces/interfaces";



export default function PreviewCertificate({
  course,
  linkVerif,
  name,
  dateOfConductStart,
  dateOfConductEnd,
  dateOfCertif,
  typeOfCertif,
  nameOfSession,
  studentId,
  fielsId,
  sessionId,
}: PreviewCertificateProps) {
  const { certificateRef, formatDate } = useGeneralHook();
  const { createAudLogCertifMutation } = useAudLogCertificate();

  const handleDownloadCertificate = () => {
    if (!certificateRef.current) return console.error("certificateRef is null");
    html2canvas(certificateRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("l", "mm", [1000, 670]);
      pdf.addImage(imgData, "PNG", 0, 0, 1000, 667);
      const filename = `${name.split(" ").join("_")}_certificate_${formatDate(
        new Date()
      )}.pdf`;
      pdf.save(filename);

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
        action: "CREATE",
      };
      createAudLogCertifMutation(certifInfos);
    });
  };

  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            <ArrowDownToLine className="h-5 w-5" />
          </span>
        </DialogTrigger>
        <DialogContent className="w-[1000px]">
          <div className=" relative">
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
            <span
              style={{
                position: "fixed",
                top: "160px",
                right: "-70px",
                zIndex: "999",
              }}
              className="pm-name-text bold"
            >
              <Button
                onClick={handleDownloadCertificate}
                className=" w-[70px] h-[70px] transition-all hover:scale-125 rounded-full bg-[#020101] text-white hover:bg-[#000]"
              >
                <ArrowDownToLine />
              </Button>
            </span>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
