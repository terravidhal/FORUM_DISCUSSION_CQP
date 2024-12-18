import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



interface Row {
  id: number; 
  //Add
  paymentDate?: string; 
  amount?: number; 
  receiptUploaded?: boolean
}

export const useGeneralHook = () => {
  //const [rows, setRows] = useState([{ id: Date.now() }]); 
  const [rows, setRows] = useState<Row[]>([]); // Spécifie que rows est un tableau d'objets Row
  //const [rows, setRows] = useState<{ id: number; paymentDate?: string; amount?: number; receiptUploaded?: boolean }[]>([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isLogginSuccess, setIsLogginSuccess] = useState(false);
  const [logginError, setLogginError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isOpenFormField, setIsOpenFormField] = useState(false);
  const [isOpenFormSession, setIsOpenFormSession] = useState(false);
  const [isOpenFormStudent, setIsOpenFormStudent] = useState(false);
  const [isOpenFormPayment, setIsOpenFormPayment] = useState(false);
  const [isOpenFormTemplate, setIsOpenTemplate] = useState(false);
  const [isLoadedField, setIsLoadedField] = useState(true);
  const [isLoadedSession, setIsLoadedSession] = useState(true);
  const [isLoadedStudent, setIsLoadedStudent] = useState(true);
  const [isLoadedDetailsField, setIsLoadedDetailsField] = useState(true);
  const [isLoadedDetailsSession, setIsLoadedDetailsSession] = useState(true);
  const [isLoadedDetailsStudent, setIsLoadedDetailsStudent] = useState(true);
  const [isOpenFormPreviewCertif, setIsOpenFormPreviewCertif] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const { idField } = useParams();
  const { idSession } = useParams();
  const { idStudentss } = useParams();
  const navigateCustom = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);

  function formatDate(date: any) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year}_${hours}:${minutes}`;
  }

  function formatDate2(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return date.toLocaleDateString("fr-FR", options);
  }

  const validateDates = (
    dateOfConductStart: string,
    dateOfConductEnd: string,
    dateOfCertif: string
  ): string[] => {
    const errors: string[] = [];
    const currentDate = new Date();
    const startDate = new Date(dateOfConductStart);
    const endDate = new Date(dateOfConductEnd);
    const certifDate = new Date(dateOfCertif);

    // 1. dateOfConductStart < dateOfConductEnd
    if (startDate >= endDate) {
      errors.push("The start date must be before the end date.");
    }
    // 2. dateOfConductStart !== dateOfConductEnd
    if (startDate.getTime() === endDate.getTime()) {
      errors.push("Start date cannot equal end date.");
    }
    // 3. dateOfConductStart >= dateActuelle
    if (startDate.getDate() < currentDate.getDate()) {
      errors.push(
        "The start date must be greater than or equal to the current date."
      );
    }
    // 4. dateOfConductEnd > dateActuelle
    if (endDate <= currentDate) {
      errors.push("The end date must be greater than the current date.");
    }
    // 5. dateOfCertif > dateActuelle
    if (certifDate <= currentDate) {
      errors.push("The issue date must be greater than the current date.");
    }

    // 5. dateOfCertif > dateOfConductEnd
    if (certifDate <= endDate) {
      errors.push("The issue date must be greater than the end date.");
    }

    return errors;
  };

  return {
    rows, 
    setRows,
    isUploaded, 
    setIsUploaded,
    isAdded, 
    setIsAdded,
    isLogginSuccess,
    setIsLogginSuccess,
    logginError, 
    setLogginError,
    isFormValid, 
    setIsFormValid,
    isConfirmVisible, 
    setIsConfirmVisible,
    isOpenFormField,
    setIsOpenFormField,
    isOpenFormTemplate, 
    setIsOpenTemplate,
    isConnect,
    setIsConnect,
    idField,
    navigateCustom,
    isOpenFormSession,
    setIsOpenFormSession,
    idSession,
    isOpenFormStudent,
    setIsOpenFormStudent,
    isOpenFormPayment,
    setIsOpenFormPayment,
    idStudentss,
    isOpenFormPreviewCertif,
    setIsOpenFormPreviewCertif,
    certificateRef,
    isLoadedField,
    setIsLoadedField,
    isLoadedDetailsField,
    setIsLoadedDetailsField,
    isLoadedDetailsSession,
    setIsLoadedDetailsSession,
    isLoadedSession,
    setIsLoadedSession,
    isLoadedStudent,
    setIsLoadedStudent,
    isLoadedDetailsStudent,
    setIsLoadedDetailsStudent,
    formatDate,
    formatDate2,
    validateDates,
  };
};
