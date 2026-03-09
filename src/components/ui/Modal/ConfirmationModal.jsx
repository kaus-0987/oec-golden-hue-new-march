"use client";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, answers }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-2xl font-bold text-amber-900">
            Confirm Your Answers
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-amber-900 text-3xl font-bold"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto pr-2">
          <p className="mb-4 text-amber-700">
            Please review your answers before submitting.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {answers[0]?.answers.map((answer, index) => (
              <div key={index} className="bg-gray-50 border rounded-lg p-3">
                <h6 className="font-semibold text-gray-700">
                  Question {index + 1}
                </h6>
                <p className="truncate text-sm text-blue-600 font-medium">
                  {answer.answer || (
                    <span className="text-red-500">Not Answered</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 text-right border-t pt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-amber-900 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg text-sm font-semibold bg-green-500 text-white hover:bg-green-600"
          >
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
