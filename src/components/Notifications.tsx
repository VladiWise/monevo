"use client";
import clsx from "clsx";
import { useNotification } from "@/store/useNotification";

export function Notifications() {
  const notifications = useNotification((state) => state.notifications);
  const removeNotification = useNotification(
    (state) => state.removeNotification
  );

  return (
    <div className="fixed top-[4.5rem] z-50 w-full sm:w-auto sm:right-7">
      {notifications.map((item) => (
        <div
          key={item.id}
          className={clsx(
            "flex items-center font-bold gap-3 p-4 shadow-lg sm:rounded-lg transition-all duration-300 transform",
            {
              "bg-lightMain dark:bg-darkGray/70 dark:text-lightMain":
                item.type === "loading",
              "bg-green-100 text-green-700 ": item.type === "success",
              "bg-red-100 text-red-700 ": item.type === "error",
              "bg-gray-100 text-gray-800": item.type === "regular",
            }
          )}
        >
          {item.type === "loading" && (
            <span className="animate-spin h-5 w-5 border-t-2 border-darkMain rounded-full"></span>
          )}
          <span className="flex-1">{item.message}</span>
          <button
            className="dark:text-darkMain"
            onClick={() => removeNotification(item.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
