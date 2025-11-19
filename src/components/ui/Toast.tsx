
// src/components/Toast.jsx
import { useEffect, useState } from "react";

export default function Toast({ message, duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // give CSS transition time before removing
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-10 right-1/2 translate-x-1/2 bg-bg-soft shadow-lg text-fg font-bold p-5 rounded-md">
      {message}
    </div>
  );
}

// const styles = {
//   container: {
//     position: "fixed",
//     bottom: "20px",
//     right: "20px",
//     background: "#333",
//     color: "#fff",
//     padding: "12px 20px",
//     borderRadius: "4px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//     zIndex: 1000,
//     animation: "fadeIn 0.3s",
//   },
// };
