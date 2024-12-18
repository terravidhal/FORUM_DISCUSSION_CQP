import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

//import "./chartDashboard.css"
import { useAudLogChart } from "@/api/services";
import { useOptionsChartData } from "@/hooks/optionsChartData";

const chartConfig = {
  Studenttotal: {
    label: "total students",
    color: "#2563eb",
  },
  certificateLogtotal: {
    label: "total certificates",
    color: "#3d289b",
  },
} satisfies ChartConfig;

export default function ChartDashboard() {
  const { AllDataChart } = useAudLogChart();
  const { createMonthlyTotals, chartData2 } = useOptionsChartData();

  // Utiliser la fonction pour créer newchartData
  // const newchartData  = createMonthlyTotals(AllDataChart);
  const newchartData = chartData2;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={newchartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          dataKey="certificateLogtotal"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="certificateLogtotal"
          fill="var(--color-certificateLogtotal)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
