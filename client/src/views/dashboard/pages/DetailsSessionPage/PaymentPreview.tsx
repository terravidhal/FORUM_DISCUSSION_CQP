import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import pathImage from "@/constants/pathImage";
import { X } from "lucide-react";
import { usePayment } from "@/api/services";
import { PaymentProps } from "@/interfaces/interfaces";
import { Button } from "@/components/ui/button";
import { useGeneralHook } from "@/hooks/generalHook";



const PaymentPreview = ({ payment, studentId, paymentId }: PaymentProps) => {
  const { deletePaymentMutation} = usePayment();

  const { isConfirmVisible, setIsConfirmVisible} = useGeneralHook();

  const handleDeleteClick = () => {
    setIsConfirmVisible(true); 
  };

  const handleCancelClick = () => {
    setIsConfirmVisible(false); 
  };

  const handleYesClick = () => {
    deletePaymentMutation({ paymentId, studentId });
    setIsConfirmVisible(false); 
  };

  return (
    <div className="flex items-center gap-10">
      <Label htmlFor={`dateOfPayment`} className="text-right">
        Date
      </Label>
      <Input
        id={`dateOfPayment`}
        name={`dateOfPayment`}
        type="date"
        placeholder="Date of Payment"
        className="col-span-1 w-[150px]"
        defaultValue={payment.paymentDate}
        readOnly
      />

      <Label htmlFor={`Amount`} className="text-right">
        Amount
      </Label>
      <Input
        id={`Amount`}
        name={`Amount`}
        type="text"
        placeholder="Amount"
        className="col-span-1 w-[150px]"
        defaultValue={payment.amount}
        readOnly
        onFocus={(ev)=>{
          ev.preventDefault();
          if (ev.target) {
            ev.target.blur(); // delete focus
          }
        }}
      />

      <Label htmlFor={`receipt`} className="text-right">
        Receipt
      </Label>
      <div>
        <img
          className="w-[71px] h-[34px]"
          src={pathImage+payment.paymentName}
          alt="Receipt"
        />
      </div>

       {!isConfirmVisible && (
        <div className="">
          <X
            onClick={handleDeleteClick}
            className="text-red-500 cursor-pointer rounded-sm border border-transparent hover:border hover:border-zinc-400"
          />
        </div>
      )}

      {isConfirmVisible && (
        <div className="confirm flex gap-2">
          <Button
            onClick={handleYesClick}
            className="bg-transparent border border-blue-600 text-blue-600 w-[58px] hover:bg-blue-400 hover:text-white"
          >
            yes
          </Button>
          <Button
            onClick={handleCancelClick}
            className="bg-transparent border border-red-600 text-red-600 w-[58px] hover:bg-red-400 hover:text-white"
          >
            cancel
          </Button>
        </div>
      )}

    </div>
  );
};

export default PaymentPreview;
