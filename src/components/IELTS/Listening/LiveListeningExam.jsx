"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
const Cheerio = require("cheerio");
import ScoreModal from "@/components/ui/Modal/ScoreModal";
import ConfirmationModal from "@/components/ui/Modal/ConfirmationModal";
import { listeningBandValues } from "@/lib/Listening/listeningBandValues";

const LiveListeningExam = ({ examData }) => {
  const router = useRouter();
  const examId = examData?.id;
  const containerRef = useRef(null);
  const [examAnswer, setExamAnswer] = useState([]);
  const [uniqueIdArr, setUniqueIdArr] = useState([]);
  const [scoreDetails, setScoreDetails] = useState(null);
  const [isScoreModalOpen, setScoreModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  let highlightedElement = null;

  const scrollToContent = (contentId) => {
    const container = containerRef.current;
    const contentElement = document.getElementById(contentId);

    if (highlightedElement) {
      highlightedElement.classList.remove("lv-highlight");
    }

    if (contentElement) {
      container.scrollTop = contentElement.offsetTop - container.offsetTop;
      contentElement.classList.add("lv-highlight");
      highlightedElement = contentElement;
    }
  };

  const handleAnswerLinking = (e, questionId, next) => {
    const { value, id, checked, type } = e.target;
    const elementId = id.split("_")[0];
    const temp = [...examAnswer];
    if (!temp[next]) return;

    const isMultiQuestions =
      temp[next]?.answers?.filter((item) => item.questionId === id).length > 1;

    if (!isMultiQuestions) {
      const answer = temp[next].answers.find((item) => item.questionId === id);
      if (answer) {
        if (elementId === "Checkbox") {
          answer.answer = checked ? value : "";
        } else {
          answer.answer = value.trim();
        }
      }
    } else {
      const answerIndex = checked
        ? temp[next].answers.findIndex(
            (item) => item.questionId === id && item.answer === ""
          )
        : temp[next].answers.findIndex(
            (item) => item.questionId === id && item.answer === value
          );

      if (answerIndex !== -1) {
        temp[next].answers[answerIndex].answer = checked ? value : "";
      } else {
        const answeredCount = temp[next].answers.filter(
          (item) => item.questionId === id && item.answer !== ""
        ).length;
        const totalSlots = temp[next].answers.filter(
          (item) => item.questionId === id
        ).length;
        if (answeredCount >= totalSlots) {
          e.target.checked = false;
          console.error(
            "You have already selected the maximum number of options."
          );
        }
      }
    }
    setExamAnswer(temp);
  };

  const handleConfirmSubmit = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;
    const resultsTable = [];

    examData.answers.forEach((correctAnswerData, index) => {
      const studentAnswerData = examAnswer[0]?.answers[index];
      const studentAnswer = (studentAnswerData?.answer || "").trim();
      const studentAnswerLower = studentAnswer.toLowerCase();
      const correctAnswerText = correctAnswerData.answer_text.trim();

      let isCorrect = false;

      if (studentAnswer === "") {
        skippedCount++;
        resultsTable.push({
          qn: index + 1,
          userAnswer: "Skipped",
          correctAnswer: correctAnswerText,
          status: "skipped",
        });
        return;
      }

      if (correctAnswerText.includes(" OR ")) {
        const correctOptions = correctAnswerText
          .split(" OR ")
          .map((option) => option.trim().toLowerCase());
        if (correctOptions.includes(studentAnswerLower)) {
          isCorrect = true;
        }
      } else if (correctAnswerText.includes(" AND ")) {
        const correctOptions = correctAnswerText
          .split(" AND ")
          .map((option) => option.trim().toLowerCase());
        if (
          correctOptions.every((option) => studentAnswerLower.includes(option))
        ) {
          isCorrect = true;
        }
      } else {
        if (studentAnswerLower === correctAnswerText.toLowerCase()) {
          isCorrect = true;
        }
      }

      if (isCorrect) {
        correctCount++;
        resultsTable.push({
          qn: index + 1,
          userAnswer: studentAnswer,
          correctAnswer: correctAnswerText,
          status: "correct",
        });
      } else {
        incorrectCount++;
        resultsTable.push({
          qn: index + 1,
          userAnswer: studentAnswer,
          correctAnswer: correctAnswerText,
          status: "incorrect",
        });
      }
    });

    setScoreDetails({
      correct: correctCount,
      incorrect: incorrectCount,
      skipped: skippedCount,
      total: examData.answers.length,
      results: resultsTable,
      band: listeningBandValues[correctCount],
    });

    setConfirmationModalOpen(false);
    setScoreModalOpen(true);
  };

  const htmlContent = useMemo(() => {
    const questionHtml = examData?.question_other;
    if (!questionHtml) return "";

    const $ = Cheerio.load(questionHtml.toString());
    const questionTags = [
      "select",
      "textarea",
      "input[type='text'], input:not([type='radio'], [type='checkbox'])",
      "input[type='radio']",
      "input[type='checkbox']",
    ];
    const tagIds = ["Select", "Textarea", "InputText", "Radio", "Checkbox"];
    const temp = [];

    // Find all question elements and assign them a type and list of IDs.
    questionTags.forEach((tag, tagIndex) => {
      const elements = $(tag);
      if (elements.length === 0) return;

      let tagQuestions = { type: tagIds[tagIndex], paginationsIds: [] };
      const radioCheckboxGroup = {};

      elements.each((index, element) => {
        let uniqueId;
        if (tag === "input[type='radio']" || tag === "input[type='checkbox']") {
          const name = $(element).attr("name");
          if (!radioCheckboxGroup[name]) {
            uniqueId = `${tagIds[tagIndex]}_${
              Object.keys(radioCheckboxGroup).length + 1
            }`;
            radioCheckboxGroup[name] = uniqueId;
            tagQuestions.paginationsIds.push(uniqueId);
          } else {
            uniqueId = radioCheckboxGroup[name];
          }
        } else {
          // Use the existing ID if it has one, otherwise generate a new one.
          uniqueId =
            $(element).attr("id") || `${tagIds[tagIndex]}_${index + 1}`;
          tagQuestions.paginationsIds.push(uniqueId);
        }
        $(element).attr("id", uniqueId);
      });
      temp.push(tagQuestions);
    });

    // Create a flat array of question IDs based on the provided question_structure.
    let paginationsStructure =
      examData?.question_structure?.flatMap((item) => {
        const element = temp.find((el) => el.type === item.type);
        if (!element) return [];

        if (element.type === "Checkbox" && item?.isMultiQuestions) {
          const group = element.paginationsIds.splice(0, 1);
          return Array.from({ length: item.numberOfQuestions }, () => group[0]);
        }
        return element.paginationsIds.splice(0, item.numberOfQuestions);
      }) || [];

    // Replace '++' placeholders with actual question numbers.
    let serialNumber = 1;
    let finalHtml = $.html().replace(/\+{2}/g, () => {
      return `<span class="font-bold mr-2">${serialNumber++}.</span>`;
    });

    setUniqueIdArr(paginationsStructure);

    if (examAnswer.length === 0 && paginationsStructure.length > 0) {
      const tempAnswer = paginationsStructure.map((item) => ({
        questionId: item,
        answer: "",
      }));
      setExamAnswer([{ testId: examId, answers: tempAnswer }]);
    }

    return finalHtml;
  }, [examData]);

  useEffect(() => {
    if (examAnswer[0]?.answers.length > 0 && uniqueIdArr.length > 0) {
      uniqueIdArr.forEach((id, index) => {
        const elements = document.querySelectorAll(`[id="${id}"]`);
        const currentAnswer = examAnswer[0]?.answers[index]?.answer;

        elements.forEach((element) => {
          // Clone the element to avoid duplicate event listeners
          const newElement = element.cloneNode(true);

          // Set the value for input/select elements if answer exists
          if (currentAnswer && currentAnswer.trim() !== "") {
            if (newElement.tagName === "SELECT") {
              Array.from(newElement.options).forEach((option) => {
                if (option.value === currentAnswer) {
                  option.selected = true;
                }
              });
            } else if (newElement.tagName === "INPUT") {
              if (
                newElement.type === "checkbox" ||
                newElement.type === "radio"
              ) {
                newElement.checked = newElement.value === currentAnswer;
              } else {
                newElement.value = currentAnswer;
              }
            } else if (newElement.tagName === "TEXTAREA") {
              newElement.value = currentAnswer;
            }
          }

          // Replace the old element with the new one
          element.parentNode.replaceChild(newElement, element);

          // Add event listener
          newElement.addEventListener("change", (e) =>
            handleAnswerLinking(e, id, 0)
          );
        });
      });
    }
  }, [uniqueIdArr, examAnswer]);

  return (
    <div className="bg-gray-50 font-sans antialiased text-amber-900 min-h-screen">
      <div className="mx-auto p-4 mt-24 sm:p-6 lg:p-8">
        <main
          className="bg-white p-6 rounded-xl shadow-lg h-full overflow-y-auto border border-gray-200"
          style={{ height: "calc(100vh - 250px)", minHeight: "500px" }}
          ref={containerRef}
        >
          <div className="mb-6">
            <audio controls controlsList="nodownload" className="w-full">
              <source src={examData.audio_file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </main>
        <footer className="bg-white shadow-lg rounded-xl p-4 mt-6 border border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              {uniqueIdArr?.map((item, index) => {
                const isAnswered =
                  examAnswer[0]?.answers[index]?.answer?.trim() !== "";
                return (
                  <div
                    key={index}
                    onClick={() => scrollToContent(item)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                      isAnswered
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4">
              <button
                className="px-6 py-2 rounded-lg text-sm font-semibold bg-green-500 text-white hover:bg-green-600"
                onClick={() => setConfirmationModalOpen(true)}
              >
                Submit
              </button>
            </div>
          </div>
        </footer>
      </div>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => {
          setConfirmationModalOpen(false);
          router.push("/test-preparation");
        }}
        onConfirm={handleConfirmSubmit}
        answers={examAnswer}
      />
      <ScoreModal
        isOpen={isScoreModalOpen}
        onClose={() => {
          setScoreModalOpen(false);
          router.push("/test-preparation");
        }}
        scoreDetails={scoreDetails}
      />
    </div>
  );
};

export default LiveListeningExam;
