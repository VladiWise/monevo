import { Loader } from "@/components/Loader";

function Loading() {
  return (
    <div className="h-full w-[20rem] flex items-center justify-center">
      <Loader size="10" />
    </div>
  );
}

export default Loading;
