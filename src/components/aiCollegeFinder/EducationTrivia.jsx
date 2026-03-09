"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, BookOpen, Globe, Award, Users, Clock } from "lucide-react";

const EducationTrivia = ({ isLoading }) => {
  const [currentTrivia, setCurrentTrivia] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState(0);

  const triviaData = [
    {
      icon: <Globe className="w-6 h-6" />,
      question: "Which country has the most international students worldwide?",
      answer: "United States",
      detail: "The US hosts over 1 million international students annually, followed by the UK, Australia, and Canada.",
      color: "bg-blue-500"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      question: "What's the average length of a Master's degree program?",
      answer: "1-2 years",
      detail: "Most Master's programs range from 1-2 years, with research-based programs typically taking longer than coursework-based ones.",
      color: "bg-green-500"
    },
    {
      icon: <Award className="w-6 h-6" />,
      question: "Which university ranking system is most globally recognized?",
      answer: "QS World University Rankings",
      detail: "QS Rankings, along with Times Higher Education and Academic Ranking of World Universities, are the most cited globally.",
      color: "bg-purple-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      question: "What percentage of international students receive scholarships?",
      answer: "About 65%",
      detail: "Approximately 65% of international students receive some form of financial aid, including scholarships, grants, or assistantships.",
      color: "bg-orange-500"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      question: "When should you start applying for fall admission?",
      answer: "12-18 months prior",
      detail: "Most universities recommend starting applications 12-18 months before your intended start date for the best opportunities.",
      color: "bg-red-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      question: "Which field has the highest international student enrollment?",
      answer: "Engineering",
      detail: "Engineering programs attract the most international students, followed by Business and Computer Science.",
      color: "bg-teal-500"
    }
  ];

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next trivia
          setCurrentTrivia((current) => (current + 1) % triviaData.length);
          setShowAnswer(false);
          return 0;
        }
        return prev + 2; // Progress every 100ms
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading, currentTrivia]);

  useEffect(() => {
    if (progress >= 60 && !showAnswer) {
      setShowAnswer(true);
    }
  }, [progress, showAnswer]);

  const handleNext = () => {
    setCurrentTrivia((current) => (current + 1) % triviaData.length);
    setShowAnswer(false);
    setProgress(0);
  };

  if (!isLoading) return null;

  const current = triviaData[currentTrivia];

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-800 to-primary-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`${current.color} p-2 rounded-lg text-white`}>
                {current.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">Study Abroad Trivia</h3>
                <p className="text-primary-100 text-sm">While we find your perfect courses...</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-primary-100">
                {currentTrivia + 1} / {triviaData.length}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-primary-700 rounded-full h-2">
            <motion.div
              className="bg-secondary-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrivia}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-amber-900 mb-4">
                  {current.question}
                </h4>
                
                {/* Answer Section */}
                <AnimatePresence>
                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-gray-50 rounded-lg p-4 border-l-4 border-secondary-500"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-secondary-500 text-white p-1 rounded-full mt-1">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-secondary-700 mb-2">
                            Answer: {current.answer}
                          </p>
                          <p className="text-amber-700 text-sm leading-relaxed">
                            {current.detail}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Button */}
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {showAnswer ? "Loading your personalized courses..." : "Wait for the answer..."}
                </div>
                
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  Next Trivia
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Loading Indicator */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-center gap-3">
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-amber-700 font-medium">
              Finding your perfect courses...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationTrivia;