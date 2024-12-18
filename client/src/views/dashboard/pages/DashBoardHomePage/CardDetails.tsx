import { Circle } from "lucide-react";

interface CardDetailsProps {
  color: string;
  title: string;
  description: string;
  starLabel: string;
  views: string;
  starCount: string;
  updated: string;
  children: any;
}

const CardDetails = ({
  color,
  title,
  description,
  starCount,
  views,
  updated,
  children,
}: CardDetailsProps) => {
  return (
    <>
      <div className={`flex items-center justify-start w-1/2 mt-5 ${""}`}>
        <div
          className={`rounded-xl border  text-card-foreground shadow ${color}`}
        >
          <div className="flex-col p-6 grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
            <div className="space-y-1">
              <h3 className="font-semibold leading-none tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-black">{description}</p>
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
        </div>
      </div>
    </>
  );
};

export default CardDetails;
