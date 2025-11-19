
// src/hooks/useToast.js
import { useState, useCallback } from "react";
import Toast from "../components/ui/Toast";

type ToastItem = {
  id: number;               // unique identifier
  msg: string;              // text to display
  opts?: {
    duration?: number;      // optional custom duration (ms)
    // you can extend this with other options later
  };
};

export default function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((msg, opts) => {
    const id = Date.now();
    setToasts((prev: any) => [...prev, { id, msg, opts }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter((t: any) => t.id !== id));
  }, []);

  const ToastContainer = () => (
    <>
      {toasts.map((t: any) => (
        <Toast
          key={t.id}
          message={t.msg}
          duration={t.opts?.duration}
          onClose={() => removeToast(t.id)}
        />
      ))}
    </>
  );

  return { addToast, ToastContainer };
}
