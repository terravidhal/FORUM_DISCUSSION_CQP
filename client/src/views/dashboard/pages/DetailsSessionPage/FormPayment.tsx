import { usePayment } from "@/api/services";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpFromLine, CircleDollarSign, X } from "lucide-react";
import { toast } from "sonner";
import PaymentPreview from "./PaymentPreview";
import { useGeneralHook } from "@/hooks/generalHook";
import { FormPaymentProps } from "@/interfaces/interfaces";
import { useEffect, } from "react";







export default function FormPayment({
  studentId,
  totalAmount,
  remainingAmount,
}: FormPaymentProps) {

    const { isOpenFormPayment, 
           setIsOpenFormPayment, 
           createPaymentMutation,
           allPayments,
           } =
    usePayment();

    const { rows, setRows, isUploaded, setIsUploaded, isAdded, setIsAdded,
           isFormValid, setIsFormValid
           } =
    useGeneralHook();

    // validation form

    const validateForm = () => {
      return rows.every((row : any) => { // "every": if a ds element is false, "every" return false otherwise true
        const paymentDate = row.paymentDate; 
        const amount = row.amount; 
        const receiptUploaded = row.receiptUploaded; 
        return paymentDate && amount > 0 && receiptUploaded;
      });
    };

    const handleFileUpload = (ev: any, rowId: number) => {
      if (ev.target.files.length > 0) {
        setIsUploaded(true);
        setRows(rows.map(row => row.id === rowId ? { ...row, receiptUploaded: true } : row)); // Update row state
      } else {
        setIsUploaded(false);
        setRows(rows.map(row => row.id === rowId ? { ...row, receiptUploaded: false } : row)); // Update row state
      }
    };

    const handleFileValidation = (ev: any, rowId: number) => {
      const file = ev.target.files[0];

      if (file) {
        const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    
        if (!validImageTypes.includes(file.type)) {
          toast.error("Please upload a valid image file (JPEG, PNG, GIF, or WEBP)");
          ev.target.value = ""; // Reset the input value
          return;
        }
      }
    
      handleFileUpload(ev, rowId);
    };
  
    useEffect(() => {
      setIsFormValid(validateForm());
    }, [rows, isUploaded]); // Re-run validation when rows or isUploaded changes
   //
    
    const handleOpenChange = (open : boolean) => {
      if (setIsOpenFormPayment) {
        setIsOpenFormPayment(open);
        setIsUploaded(false); 
        setRows([]); // delete input
        setIsAdded(false); // reset button "new payment"
      }
    };

 
    const handleAddRow = () => {
      if (!isAdded) {
        setRows([...rows, { id: Date.now() }]); //  "new payment" new line
        setIsUploaded(false); // disable button receipt
        setIsAdded(true); // add only once
      }
    };
    
    const handleRemove = (id:any) => {
      setRows(rows.filter(row => row.id !== id)); 
      setIsAdded(false); // reset button "new payment"
    };

    
  
    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      const formData = new FormData(ev.currentTarget);
      const inputIdValue = formData.get("thisInput");
      const inputId = inputIdValue
      ? Number(inputIdValue)
      : null;
      const paymentDate = formData.get("paymentDate") as string;
      const receiptImage = formData.get("receipt");
      const sizeImage = receiptImage instanceof File ? receiptImage.size : null;
      const amountValue = formData.get("amount");
      const amount = amountValue
      ? Number(amountValue)
      : 0;
      
      formData.append("studentId", studentId);
    
      if (!paymentDate || sizeImage === 0 || !amount || amount < 0 || remainingAmount < amount ) {
    
        toast.error("please fill all required fields");
        amount < 0 ? toast.error("please the amount is greater than 0") : null;
        sizeImage === 0 ? toast.error("please the Receipt field is required") : null;
        remainingAmount < amount? toast.error("please remainingAmount is greater than amount") : null;
        return;
      }
      createPaymentMutation(formData);
      handleRemove(inputId)
    };



  return (
    <Dialog  open={isOpenFormPayment} onOpenChange={handleOpenChange}>

     <DialogTrigger asChild>
       <div className="cursor-pointer">
          <CircleDollarSign className="h-5 w-5" />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Add Payment</DialogTitle>
          <h2>Total School Board : {totalAmount} FRCFA</h2>
          <h2>Remaining School Board: {remainingAmount} FRCFA</h2>
          <DialogDescription>
            Enter the student's payment details here. Click 'Save' when you're ready to proceed.
          </DialogDescription>
        </DialogHeader>
       
       <div className="grid gap-4 py-4 overflow-y-auto max-h-[190px] px-[10px]">
           {allPayments?.map((elt:any) => (
             <PaymentPreview key={elt._id} studentId={studentId} paymentId={elt._id} payment={elt} />
          ))}
       </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
    <div className="grid gap-4 py-4 overflow-y-auto max-h-[190px] px-[10px] ">
      { rows.map((row:any) => (
        <div key={row.id} className="flex items-center gap-4">
          <Input
            id={`thisInput-${row.id}`}
            name={`thisInput`}
            type="hidden"
            defaultValue={row.id}
            className="col-span-1"
          />
          <Label htmlFor={`paymentDate-${row.id}`} className=" text-right">
            Date
          </Label>
          <Input
            id={`paymentDate-${row.id}`}
            name={`paymentDate`}
            type="date"
            placeholder="Date of Payment"
            className={`col-span-1`}
            onChange={(e) => {
              const updatedRows = rows.map(r => 
                r.id === row.id ? { ...r, paymentDate: e.target.value } : r
              );
              setRows(updatedRows);
            }}
          />
          <Label htmlFor={`amount-${row.id}`} className="text-right">
            Amount
          </Label>
          <Input
            id={`amount-${row.id}`}
            name={`amount`}
            type="number"
            placeholder="Amount"
            className={`col-span-1 w-[90px]`}
            onChange={(e) => {
              const updatedRows = rows.map(r => 
                r.id === row.id ? { ...r, amount: Number(e.target.value) } : r
              );
              setRows(updatedRows);
            }}
          />
          <Label htmlFor={`receipt-${row.id}`} 
                 className={`flex gap-2 items-center cursor-pointer text-sm px-4 text-right py-2 rounded-md ${
                  isUploaded ? "bg-primary" : "bg-slate-500"
                } text-white`}
                 >
                  
             <ArrowUpFromLine size="15px"  /> Receipt
          </Label>
          <Input
            id={`receipt-${row.id}`}
            name="receipt"
            type="file" accept="image/*" 
            placeholder="Receipt"
            className={`col-span-1`}
          // onChange={(e) => handleFileUpload(e, row.id)}
           onChange={(e) => handleFileValidation(e, row.id)}
          />
          <Button 
          className={`text-white ${isFormValid ? 'cursor-pointer' : 'cursor-not-allowed opacity-50 pointer-events-none'}`}
           type="submit">
            Save
          </Button>
          <div className="">
            <X className="text-red-500 cursor-pointer rounded-sm border border-transparent hover:border hover:border-zinc-400"  onClick={() => handleRemove(row.id)} />
          </div>
        </div> 
      ))}
      </div>
      </form>    
 
        <Button className="text-white w-28 bg-black hover:bg-slate-800" type="button" onClick={() => handleAddRow()}>
            New Payment
        </Button> 
       

      </DialogContent>
    </Dialog>
  );
}











