import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import "./Chart.css";
import { useAudLogChart } from "@/api/services";
import { useOptionsChartData } from "@/hooks/optionsChartData";

export const description = "An interactive bar chart";

const chartConfig = {
  views: {
    label: "created",
  },
  certificateLogtotal: {
    label: "Certificates",
    color: "rgb(74 108 247 /1)",
  },
  Studenttotal: {
    label: "Students",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Chart() {
  const { AllDataChart } = useAudLogChart();
  const { createChartData, chartData } = useOptionsChartData();

  // Utiliser la fonction pour créer newchartData
  //const newchartData  = createChartData(AllDataChart);
  const newchartData = chartData;

  const [activeChart, setActiveChart] = React.useState<
    keyof typeof chartConfig
  >("certificateLogtotal");

  const total = React.useMemo(
    () => ({
      certificateLogtotal: newchartData?.reduce(
        (acc, curr) => acc + curr.certificateLogtotal,
        0
      ),
      Studenttotal: newchartData?.reduce(
        (acc, curr) => acc + curr.Studenttotal,
        0
      ),
    }),
    []
    //[AllDataChart] // add if use api
  );

  return (
    <Card className="mt-20">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Statistics - studends and certificates</CardTitle>
          <CardDescription>
            Showing total students & cerificates created for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["certificateLogtotal", "Studenttotal"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-slate-200/100 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={newchartData || []}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
