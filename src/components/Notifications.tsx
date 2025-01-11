"use client";
import clsx from "clsx";
import { useNotification } from "@/store/useNotification";

export function Notifications() {
  const notifications = useNotification((state) => state.notifications);
  const removeNotification = useNotification((state) => state.removeNotification);

  return (
    <div className="fixed top-5 right-5 space-y-3 z-50">
      {notifications.map((item) => (
        <div
          key={item.id}
          className={clsx(
            "flex items-center gap-3 p-4 rounded-md shadow-lg transition-all duration-300 transform",
            {
              "bg-blue-100 text-blue-700 border-blue-400": item.type === "loading",
              "bg-green-100 text-green-700 border-green-400": item.type === "success",
              "bg-red-100 text-red-700 border-red-400": item.type === "error",
              "bg-gray-100 text-gray-800 border-gray-300": item.type === "regular",
            }
          )}
        >
          {item.type === "loading" && (
            <span className="animate-spin h-5 w-5 border-t-2 border-blue-500 rounded-full"></span>
          )}
          <span className="flex-1">{item.message}</span>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => removeNotification(item.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
