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

export function TimeSeriesChart({ YData, title }) {
  if (YData?.error) {
    return <div>{YData.error}</div>;
  }

  const data = {
    datasets: [
      {
        label: title,
        data: YData.map((d) => ({ x: new Date(d.date), y: d.value })),
        borderColor: "#EF3226",
        backgroundColor: "#EF3226",
        pointRadius: 0,
        tension: 0.4,
        cubicInterpolationMode: "monotone",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "yyyy-MM-dd",
        },
        title: { display: false, text: "Date" },
      },
      y: {
        title: { display: false, text: "Value" },
      },
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
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
