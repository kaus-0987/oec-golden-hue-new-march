"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { writingExams } from "@/lib/Writing/writingExams";

const Writing = () => {
  const examsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = writingExams.slice(indexOfFirstExam, indexOfLastExam);

  const totalPages = Math.ceil(writingExams.length / examsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left">No</th>
              <th className="py-3 px-4 border-b text-left">Exam Name</th>
              <th className="py-3 px-4 border-b text-left">Exam Type</th>
              <th className="py-3 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentExams.map(
              ({ id, exam_name, exam_type, category, subCategory }, index) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">
                    {indexOfFirstExam + index + 1}
                  </td>
                  <td className="py-3 px-4 border-b">{exam_name}</td>
                  <td className="py-3 px-4 border-b">{exam_type}</td>
                  <td className="py-3 px-4 border-b">
                    <Link
                      href={`/test-preparation/${category}/${subCategory}/${id}`}
                      target="_blank"
                    >
                      <button className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 hover:bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 text-white py-1 px-4 rounded">
                        Take Test
                      </button>
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-gray-300 hover:bg-gray-400 text-amber-900 font-bold p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous Page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-300 hover:bg-gray-400 text-amber-900 font-bold p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next Page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Writing;
