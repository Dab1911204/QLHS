import { useEffect, useRef } from "react";

const Model = ({ isOpen, onClose, type, title, children }) => {
  const modalRef = useRef(null);

  let color = "";
  if (type === "add") color = "bg-green-500";
  else if (type === "detail") color = "bg-sky-500";
  else if (type === "edit") color = "bg-yellow-500";
  else if (type === "delete") color = "bg-red-500";
  else if (type === "check")
    color = "bg-gradient-to-r from-green-600 to-emerald-600";
  else if (type === "rating") color = "bg-purple-500";

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="
          w-full max-w-3xl
          max-h-[90vh]
          bg-white
          rounded-2xl
          shadow-2xl
          flex flex-col
          animate-slideUp
        "
      >
        {/* ===== Header ===== */}
        <div
          className={`px-6 py-4 flex items-center justify-between ${color} rounded-t-2xl flex-shrink-0`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="font-semibold text-white text-lg">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* ===== Body (SCROLL Ở ĐÂY) ===== */}
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Model;
