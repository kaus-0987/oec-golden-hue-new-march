"use client";
const ScoreModal = ({ isOpen, onClose, scoreDetails }) => {
  if (!isOpen || !scoreDetails) return null;

  const { correct, incorrect, skipped, total, results, band } = scoreDetails;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-2xl font-bold text-amber-900">Your Score</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-amber-900 text-3xl font-bold"
          >
            &times;
          </button>
        </div>

        <div className="flex justify-around text-center my-4">
          <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-sm">Total</div>
          </div>
          <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
            <div className="text-2xl font-bold">{correct}</div>
            <div className="text-sm">Correct</div>
          </div>
          <div className="px-4 py-2 bg-red-100 text-red-800 rounded-lg">
            <div className="text-2xl font-bold">{incorrect}</div>
            <div className="text-sm">Incorrect</div>
          </div>
          <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg">
            <div className="text-2xl font-bold">{skipped}</div>
            <div className="text-sm">Skipped</div>
          </div>
          <div className="px-4 py-2 bg-gray-100 text-amber-900 rounded-lg">
            <div className="text-2xl font-bold">{band}</div>
            <div className="text-sm">Band</div>
          </div>
        </div>

        <div className="overflow-y-auto flex-grow">
          <table className="w-full text-sm text-left text-amber-700">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Question No.
                </th>
                <th scope="col" className="px-4 py-3">
                  Correct Answer
                </th>
                <th scope="col" className="px-4 py-3">
                  Your Answer
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Result
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((item) => (
                <tr
                  key={item.qn}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900"
                  >
                    {item.qn}
                  </th>
                  <td className="px-4 py-3">{item.correctAnswer}</td>
                  <td
                    className={`px-4 py-3 ${
                      item.status === "incorrect" ? "text-red-600" : ""
                    } ${item.status === "skipped" ? "text-yellow-600" : ""}`}
                  >
                    {item.userAnswer}
                  </td>
                  <td className="px-4 py-3 text-center text-xl">
                    {item.status === "correct" && (
                      <span className="text-green-500">✔</span>
                    )}
                    {item.status === "incorrect" && (
                      <span className="text-red-500">✖</span>
                    )}
                    {item.status === "skipped" && (
                      <span className="text-yellow-500">--</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-right border-t pt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-amber-900 hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreModal;