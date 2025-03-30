import { MainBlockWrapper } from "./MainBlockWrapper";
export function SuspenseMainBlockWrapper({
  title = "Loading...",
  isLeftSection,
}: {
  title?: string;
  isLeftSection?: boolean;
}) {
  return (
    <MainBlockWrapper isLeftSection={isLeftSection} title={title}>
      <div className="animate-pulse flex flex-col h-full w-full justify-center gap-1">
        <div className="h-6 rounded-lg bg-darkGray w-full"></div>

        <div className="h-6 rounded-lg bg-darkGray w-full"></div>

        <div className="h-6 rounded-lg bg-darkGray w-full"></div>

        <div className="h-6 rounded-lg bg-darkGray w-full"></div>

        <div className="h-6 rounded-lg bg-darkGray w-full"></div>

        <div className="h-6 rounded-lg bg-darkGray w-full"></div>

        <div className="h-6 rounded-lg bg-darkGray w-full"></div>
      </div>
    </MainBlockWrapper>
  );
}
