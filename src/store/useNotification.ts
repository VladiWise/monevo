import { create } from "zustand";

type Notification = {
  id: number;
  message: string;
  type: "success" | "error" | "regular" | "loading";
  timeout?: number;
};

type NotificationState = {
  notifications: Notification[];
  add: (message: string, type: Notification["type"], timeout?: number) => number;
  updateNotification: (id: number, message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
  promise: <T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string }
  ) => Promise<T>;
};

export const useNotification = create<NotificationState>((set, get) => ({
  notifications: [],
  add: (message, type = "regular", timeout = 5000) => {
    const id = Date.now();
    const notification: Notification = { id, message, type };

    set((state) => ({
      notifications: [...state.notifications, notification],
    }));

    if (timeout) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, timeout);
    }

    return id;
  },
  updateNotification: (id, message, type) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, message, type } : n
      ),
    }));
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
  promise: async (promise, messages) => {
    const id = get().add(messages.loading, "loading", 0); // Add loading notification with no timeout

    try {
      const result = await promise;
      get().updateNotification(id, messages.success, "success"); // Update to success
      setTimeout(() => get().removeNotification(id), 3000); // Auto-remove success notification
      return result;
    } catch (error) {
      get().updateNotification(id, messages.error, "error"); // Update to error
      setTimeout(() => get().removeNotification(id), 3000); // Auto-remove error notification
      throw error;
    }
  },
}));
