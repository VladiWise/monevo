import { getDBIndexCB } from "@/services/IndexCBService";
import { TimeSeriesChartCB } from "@/components/chart-js/TimeSeriesChartCB";

import {
  type DB_IndexCBDeposit,
  type IndexCBType,
  type DB_IndexCBLoanVolume,
  type DB_IndexCBDelayVolume,
} from "@/types";
import { getErrorMessage } from "@/utils/getErrorMessage";

export async function ChartCBServerFetch({
  chartData,
}: {
  chartData: IndexCBType;
}) {
  let YDataArr = [];
  let lastData: string | number = "";

  switch (chartData) {
    case "dep_cred_181d_1y":
      const deposits = await getDBIndexCB<DB_IndexCBDeposit>("deposit");
      const credits = await getDBIndexCB<DB_IndexCBDeposit>("credit");

      if ("error" in deposits || "error" in credits) {
        return <div>Something went wrong</div>;
      }

      YDataArr = [
        {
          title: "deposit",
          color: "#ab26ef",
          data: deposits.map((d) => ({
            x: new Date(d.date),
            y: d.value_181d_1y,
          })),
        },
        {
          title: "credit",
          color: "#26e0ef",
          data: credits.map((d) => ({
            x: new Date(d.date),
            y: d.value_181d_1y,
          })),
        },
      ];

      lastData = `deposit: ${deposits.shift()?.value_181d_1y}% credit: ${
        credits.shift()?.value_181d_1y
      }%`;

      break;
    case "dep_cred_1y_3y":
      const deposits2 = await getDBIndexCB<DB_IndexCBDeposit>("deposit");
      const credits2 = await getDBIndexCB<DB_IndexCBDeposit>("credit");

      if ("error" in deposits2 || "error" in credits2) {
        return <div>Something went wrong</div>;
      }

      YDataArr = [
        {
          title: "deposit",
          color: "#ab26ef",
          data: deposits2.map((d) => ({
            x: new Date(d.date),
            y: d.value_1y_3y,
          })),
        },
        {
          title: "credit",
          color: "#26e0ef",
          data: credits2.map((d) => ({
            x: new Date(d.date),
            y: d.value_1y_3y,
          })),
        },
      ];

      lastData = `deposit: ${deposits2.shift()?.value_1y_3y}% credit: ${
        credits2.shift()?.value_1y_3y
      }%`;
      break;

    case "credit":
    case "deposit":
      const items = await getDBIndexCB<DB_IndexCBDeposit>(chartData);

      if ("error" in items) {
        return <div>{getErrorMessage(items.error)}</div>;
      }

      YDataArr = [
        {
          title: "181d-1y",
          color: "#ab26ef",
          data: items.map((d) => ({
            x: new Date(d.date),
            y: d.value_181d_1y,
          })),
        },
        {
          title: "1y-3y",
          color: "#26e0ef",
          data: items.map((d) => ({
            x: new Date(d.date),
            y: d.value_1y_3y,
          })),
        },
      ];

      break;

    case "loan":
      const loans = await getDBIndexCB<DB_IndexCBLoanVolume>(chartData);

      if ("error" in loans) {
        return <div>{getErrorMessage(loans.error)}</div>;
      }

      YDataArr = [
        {
          title: "",
          color: "#EF3226",
          data: loans.map((d) => ({ x: new Date(d.date), y: d.value })),
        },
      ];

      lastData = `${loans.shift()?.value} trln`;
      break;

    case "delay":
      const delays = await getDBIndexCB<DB_IndexCBDelayVolume>(chartData);
      const loansForDelay = await getDBIndexCB<DB_IndexCBLoanVolume>("loan");

      if ("error" in delays || "error" in loansForDelay) {
        return <div>Something went wrong</div>;
      }

      const delayData = delays.map((delay) => {
        const loanValue = loansForDelay.find(
          (loan) => loan.date === delay.date
        )?.value;

        if (!loanValue) {
          return {
            x: delay.date,
            y: 0,
          };
        }

        return {
          x: delay.date,
          y: (delay.value / loanValue) * 100,
        };
      });

      console.log("delayData", delayData);

      YDataArr = [
        {
          title: "",
          color: "#EF3226",
          data: delayData,
        },
      ];

      lastData = `${Math.round(delayData[0].y * 100) / 100} %`;
      break;
  }

  return (
    <>
      <div>{lastData}</div>
      <TimeSeriesChartCB YDataArr={YDataArr} />
    </>
  );
}
