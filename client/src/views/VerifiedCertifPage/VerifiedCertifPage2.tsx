import { useGeneralHook } from "@/hooks/generalHook";
import { useStudent } from "@/api/services";
import ModalSevenAcademyVerif from "./ModalSevenAcademyVerif/ModalSevenAcademyVerif";




const VerifiedCertifPage2 = () => {
  const { certificateRef } = useGeneralHook();
  const { OneStudent, 
   } = useStudent();
  const linkVerif = window.location.href;
 // console.log(window.location.href, OneStudent);

  return (
    <div
      className="VerifiedCertifPage"
      //style={{ position: "relative",  }}
    >

                <ModalSevenAcademyVerif
                  linkVerif={linkVerif}
                  name={OneStudent?.name}
                  ref={certificateRef}
                  course={OneStudent?.field?.name}
                  dateOfConductStart={OneStudent?.session?.dateOfConductStart}
                  dateOfConductEnd={OneStudent?.session?.dateOfConductEnd}
                  dateOfCertif={OneStudent?.session?.dateOfCertif || ""}
                />
              
    </div>
  );
};

export default VerifiedCertifPage2;
