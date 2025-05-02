import { Loader } from "@/components/Loader";

export default async function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader size={100} />
    </div>
  );
}


