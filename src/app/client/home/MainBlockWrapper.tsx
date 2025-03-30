import clsx from "clsx";
import { MainContainer } from "@/components/MainContainer";


export function MainBlockWrapper({
  children,
  title,
  isLeftSection,
}: {
  children: React.ReactNode;
  title?: string;
  isLeftSection?: boolean;
}) {
  return (
    <MainContainer
      className={clsx(
        "h-72 max-w-96 items-center dark:text-white justify-between gap-0",
        isLeftSection && "justify-self-end"
      )}
    >
      {title && <span className="text-xl font-bold">{title}</span>}
      {children}
    </MainContainer>
  );
}
