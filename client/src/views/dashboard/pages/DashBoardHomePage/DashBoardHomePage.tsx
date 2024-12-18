import { CardType, UserType, cardData, userData } from "@/datas/data";
import DatePickerWithRange from "./DatePickerWithRange";
import ListItems from "./ListItems";
import CardItems from "./CardItems";
import ChartDashboard from "./chartDashboard/ChartDashboard";
import { useAudLogChart } from "@/api/services";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { toast } from "sonner";



const DashBoardHomePage = () => {
  const { DataChart } = useAudLogChart();
  const newAllData: any = Object.values(DataChart?.result || {});

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const newData = [
    {
      Total_Fields: newAllData[0]?.length || 0,
      Total_Sessions: newAllData[1]?.length || 0,
      Total_Students: newAllData[2]?.length || 0,
      Total_Certificates: newAllData[3]?.length || 0,
    },
  ];

  const handleExportData = () => {
    if (newData.length !== 0) {
      const csv = generateCsv(csvConfig)(newData);
      download(csvConfig)(csv);
    }
    toast.error("table is empty!!!");
  };

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <div className="grid gap-2">
            <DatePickerWithRange />
          </div>
          <button
            onClick={handleExportData}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-white shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            Download
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card: CardType, index: number) => (
          <CardItems card={card} key={index} order={index} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="rounded-xl border bg-card text-card-foreground shadow col-span-4">
          <ChartDashboard />
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">
              Recent Students
            </h3>
            <p className="text-sm text-muted-foreground">
              Recently added user.
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-8">
              {userData.map((user: UserType, index: number) => (
                <ListItems user={user} key={index} order={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardHomePage;
