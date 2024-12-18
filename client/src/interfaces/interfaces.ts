export interface AlertDialogPopupProps {
  dialogTitle: string;
  linkVerif: string;
  name: string;
  email: string;
  course: string;
  dateOfConductStart: string;
  dateOfConductEnd: string;
  dateOfCertif: string;
  typeOfCertif: string;
  nameOfSession: string;
  studentId: string;
  fielsId: string;
  sessionId: string;
}

export interface DeleteStudentProps {
  StudentUpdtId: string;
}

export interface FormPaymentProps {
  studentId: string;
  totalAmount: number;
  remainingAmount: number;
}
export interface FormStudentProps {
  emailNone?: boolean;
  buttonName?: string;
  dialogTitle?: string;
  handleSubmit?: (ev: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  defaultName?: string;
  defaultLevel?: string;
  defaultSchoolBoarding?: number;
  defaultCertif?: string;
  StudentUpdtId?: string;
  children?: any;
}

interface Payment {
  paymentDate: string;
  amount: number;
  paymentName: string;
}

export interface PaymentProps {
  payment: Payment;
  studentId: string;
  paymentId: string;
}

export interface PreviewCertificateProps {
  dialogTitle: string;
  linkVerif: string;
  name: string;
  email: string;
  course: string;
  dateOfConductStart: string;
  dateOfConductEnd: string;
  dateOfCertif: string;
  typeOfCertif: string;
  nameOfSession: string;
  studentId: string;
  fielsId: string;
  sessionId: string;
}

export interface UpdateStudentProps {
  defaultName?: string;
  defaultLevel?: string;
  defaultSchoolBoarding?: number;
  defaultCertif?: string;
  StudentUpdtId: string;
}

export interface DetailsPopupProps {
  color?: string;
  title: string;
  description?: string;
  totalAmount: number;
  starLabel: string;
  views: string;
  starCount: string;
  updated: string;
  children: any;
  level?: number;
  typeofCertif?: string;
  field?: string;
  session?: string;
  textIcon?: string;
  payments?: Array<any>;
}

