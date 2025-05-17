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

export type YDataArr = { title: string; color: string; data: YPoint[] };

export function TimeSeriesChartCB({ YDataArr }: { YDataArr: YDataArr[] }) {
  const datasets: ChartDataset<"line", YPoint[]>[] = YDataArr.map(
    (dataset) => ({
      label: dataset.title,
      data: dataset.data,
      borderColor: dataset.color,
      backgroundColor: dataset.color,
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
          tooltipFormat: "yyyy-MM",
        },
        title: { display: false, text: "Date" },
      },
      y: {
        title: { display: false, text: "%" },
      },
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
      },
    },
    plugins: {
      legend: { display: false, position: "top" },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <section className="w-full h-80 xl:h-[36rem]">
      <Line data={data} options={options} />
    </section>
  );
}
