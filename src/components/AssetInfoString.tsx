export const AssetInfoString = ({
  title,
  children,
  bold,
}: {
  title: string;
  children: React.ReactNode;
  bold?: boolean;
}) => (
  <>
    <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
    <span className={bold ? "font-bold text-right" : "text-right"}>
      {children}
    </span>
  </>
);
