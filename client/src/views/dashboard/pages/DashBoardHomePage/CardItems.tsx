import { useAudLogChart } from "@/api/services";
import { CardType } from "@/datas/data";
import CountUp from "react-countup";

interface CardItemsProps {
  card: CardType;
  order: number;
}

const CardItems = ({ card, order }: CardItemsProps) => {
  const { DataChart } = useAudLogChart();
  const newAllData: any = Object.values(DataChart?.result || {});

  let theme: number = order || 0;

  const colors: { [key: number]: string } = {
    0: "bg-[#65e892] text-white",
    1: "bg-[#3994d6] text-white",
    2: "bg-[#354abf] text-white",
    3: "bg-[#3d289b] text-white",
  };

  let color: string = colors[theme] || "";

  return (
    <>
      <div className={`rounded-xl border text-card-foreground shadow ${color}`}>
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">{card.title}</h3>
          {card.icon}
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">
            0<CountUp start={875.039} end={newAllData[order]?.length || 0} />
          </div>
          <p className="text-xs">
            + 0{newAllData[order]?.length || 0} from last month
          </p>
        </div>
      </div>
    </>
  );
};

export default CardItems;
