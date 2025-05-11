"use client";
import "chartjs-adapter-date-fns";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  type ChartDataset,
  type ChartData,
  type ChartOptions,
  type ScriptableContext,
} from "chart.js";

ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export type YPoint = { x: Date; y: number };

export type YDataArr = { title: string; data: YPoint[] };

export function TimeSeriesChartCB({
  YDataArr,
  title,
}: {
  YDataArr: YDataArr[];
  title: string;
}) {
  const datasets: ChartDataset<"line", YPoint[]>[] = YDataArr.map(
    (dataset) => ({
      label: dataset.title,
      data: dataset.data,
      borderColor: "#EF3226",
      backgroundColor: "#EF3226",
      pointRadius: 0,
      tension: 0.4,
      cubicInterpolationMode: "monotone",
      fill: false,
    })
  );

  const data: ChartData<"line", YPoint[], unknown> = { datasets };

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "yyyy-MM-dd",
        },
        title: { display: false, text: "Date" },
      },
      y: {
        title: { display: true, text: "%" },
      },
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
      },
    },
    plugins: {
      legend: { display: true },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <section className="w-full h-40 sm:h-48 md:h-64 xl:h-[36rem]">
      <Line data={data} options={options} />
    </section>
  );
}
