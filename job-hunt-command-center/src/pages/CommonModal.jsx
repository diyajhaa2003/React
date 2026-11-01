function CommonModal({
  isOpen,
  title,
  message,
  type = "info",
  confirmText = "OK",
  cancelText = "Cancel",
  showCancel = false,
  onConfirm,
  onClose,
}) {
  if (!isOpen) return null;
  const buttonColor =
    type === "danger"
      ? "bg-red-500 hover:bg-red-700"
      : type === "success"
        ? "bg-blue-600 hover:bg-blue-700"
        : "bg-blue-600 hover:bg-blue-700";
  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          {/* Icon */}
          <div
            className={`mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full ${(type = "danger" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600")}`}
          >
            <span className="text-xl  font-bold">
              {type === "danger" ? "!" : "i"}
            </span>
          </div>
          <div className="mx-auto  flex flex-col items-center justify-center gap-2 text-center">
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <p className="mt-3 text-md leading-6 text-slate-600 font-bold">
              {message}
            </p>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            {showCancel && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border px-4 py-2 font-medium bg-white-500  hover:bg-gray-400 cursor-pointer"
              >
                {cancelText}
              </button>
            )}
            <button
              type="button"
              onClick={onConfirm}
              className={`rounded-lg px-4 py-2 text-sm font-medium text-white cursor-pointer ${
                type === "danger"
                  ? "bg-red-500 hover:bg-red-700"
                  : type === "success"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-green-600 hover:bg-green-700" 
                    
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CommonModal;
