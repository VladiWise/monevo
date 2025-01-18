import AssetsTables from "./_AssetsTables";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
export default function App() {
  return (
    <div className="flex flex-col items-center gap-10 p-4 min-w-max max-w-6xl w-full">

      <AssetsTables />
    </div>
  );
}
