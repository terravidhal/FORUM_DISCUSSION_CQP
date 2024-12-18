import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Circle, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import pathImage from "@/constants/pathImage";
import { DetailsPopupProps } from "@/interfaces/interfaces";



const DetailsPopup = ({
  color,
  title,
  description,
  totalAmount,
  starCount,
  views,
  updated,
  children,
  level,
  typeofCertif,
  field,
  session,
  textIcon,
  payments,
}: DetailsPopupProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer flex gap-3">
          {textIcon} <Eye className="h-5 w-5" />
        </div>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[550px] ${color}`}>
        <div className={`text-card-foreground`}>
          <div className="flex-col p-6 grid grid-cols-[1fr_110px] items-start  gap-4 space-y-0">
            <div className="space-y-1">
              <h3 className="uppercase  font-semibold leading-none tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-black">{description}</p>
              <p className="text-sm text-black">
                {totalAmount
                  ? `Total School Board : ${totalAmount} FRCFA`
                  : null}
              </p>
              <p className="text-sm text-black">
                {level ? `Level : ${level}` : null}
              </p>
              <p className="text-sm text-black">
                {typeofCertif ? `Certificate : ${typeofCertif}` : null}
              </p>
              <p className="text-sm text-black">
                {field ? `Field : ${field}` : null}
              </p>
              <p className="text-sm text-black">
                {session ? `Session : ${session}` : null}
              </p>
            </div>
            <div className="flex items-center space-x-1 rounded-md">
              {children}
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="flex space-x-4 text-sm text-black">
              <div className="flex items-center">
                <Circle className="mr-1 h-3 w-3  text-black" />
                {starCount}
              </div>
              <div className="flex items-center">
                <Circle className="mr-1 h-3 w-3  text-black" />
                {views}
              </div>
              <div style={{ textTransform: "capitalize" }}>{updated}</div>
            </div>
          </div>
          {payments ? (
            <div className="p-6 pt-0 overflow-y-auto h-[200px]">
              <Table>
                <TableCaption>A list of your recent payments.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Payment Name</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">image</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments?.map((elt) => (
                    <TableRow key={elt._id}>
                      <TableCell className="font-medium">
                        {elt.paymentName}
                      </TableCell>
                      <TableCell>{elt.paymentDate}</TableCell>
                      <TableCell>{elt.amount}</TableCell>
                      <TableCell className="text-center">
                        <a
                          className="inline-block"
                          href={pathImage + elt.paymentName}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye className="h-5 w-5" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total payments</TableCell>
                    <TableCell className="text-right">
                      {payments
                        ?.reduce((acc, elt) => acc + elt.amount, 0)
                        .toFixed(2)}{" "}
                      FRCFA
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3}>Remaining School Board</TableCell>
                    <TableCell className="text-right">
                      {totalAmount -
                        payments
                          ?.reduce((acc, elt) => acc + elt.amount, 0)
                          .toFixed(2)}{" "}
                      FRCFA
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsPopup;
