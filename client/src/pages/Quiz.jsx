import { useState } from "react";

export default function Quiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [flaggedForStudy, setFlaggedForStudy] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizLengths = [
    { value: "10", label: "10 Questions" },
    { value: "25", label: "25 Questions" },
    { value: "50", label: "50 Questions" },
    { value: "100", label: "100 Questions" },
    { value: "all", label: "All Questions" },
  ];

  const startQuiz = async (count) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/quiz?count=${count}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quiz questions");
      }
      const data = await response.json();
      setQuestions(data);
      setQuizStarted(true);
      setCurrentIndex(0);
      setShowHint(false);
      setShowAnswer(false);
      setFlaggedForStudy([]);
      setQuizCompleted(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuestions([]);
    setError(null);
    setCurrentIndex(0);
    setShowHint(false);
    setShowAnswer(false);
    setFlaggedForStudy([]);
    setQuizCompleted(false);
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleToggleFlag = () => {
    const currentQuestion = questions[currentIndex];
    if (flaggedForStudy.includes(currentQuestion.id)) {
      setFlaggedForStudy(
        flaggedForStudy.filter((id) => id !== currentQuestion.id),
      );
    } else {
      setFlaggedForStudy([...flaggedForStudy, currentQuestion.id]);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowHint(false);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowHint(false);
      setShowAnswer(false);
    }
  };

  const handleFinishQuiz = () => {
    setQuizCompleted(true);
  };

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const correctCount = questions.length - flaggedForStudy.length;
  const flaggedQuestions = questions.filter((q) =>
    flaggedForStudy.includes(q.id),
  );

  // Quiz Selection Screen
  if (!quizStarted) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
            Quiz
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test your knowledge of security acronyms.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <p className="text-red-800 dark:text-red-200">Error: {error}</p>
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">
            Select Quiz Length
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quizLengths.map((length) => (
              <button
                key={length.value}
                onClick={() => startQuiz(length.value)}
                disabled={loading}
                className="cursor-pointer rounded-xl border-2 border-gray-200 bg-white p-6 text-center font-semibold text-gray-900 transition-all duration-200 hover:border-blue-500 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-blue-400"
              >
                {loading ? "Loading..." : length.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Quiz Completed - Results Screen
  if (quizCompleted) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Quiz Complete!
          </h1>
          <button
            onClick={resetQuiz}
            className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Exit Quiz
          </button>
        </div>

        {/* Score Summary */}
        <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-8 text-center shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4">
            <p className="text-6xl font-bold text-blue-600 dark:text-blue-400">
              {correctCount}/{questions.length}
            </p>
            <p className="mt-2 text-xl text-gray-600 dark:text-gray-400">
              {correctCount === questions.length
                ? "Perfect score! 🎉"
                : flaggedForStudy.length === 0
                  ? "Great job! No items flagged."
                  : "Review the items below"}
            </p>
          </div>
          {flaggedForStudy.length > 0 && (
            <p className="text-gray-700 dark:text-gray-300">
              {flaggedForStudy.length} acronym
              {flaggedForStudy.length === 1 ? "" : "s"} flagged for study
            </p>
          )}
        </div>

        {/* Flagged Acronyms */}
        {flaggedQuestions.length > 0 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Study These
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {flaggedQuestions.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-orange-200 bg-orange-50 p-5 shadow-md dark:border-orange-800 dark:bg-orange-900/20"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {item.acronym}
                    </h3>
                    <span className="text-orange-500">🚩</span>
                  </div>
                  <div className="mb-2">
                    <p className="text-gray-900 dark:text-white">
                      {item.definition}
                    </p>
                  </div>
                  {item.hint && (
                    <div className="mt-3 border-t border-orange-200 pt-3 dark:border-orange-800">
                      <p className="text-sm text-gray-700 italic dark:text-gray-300">
                        💡 {item.hint}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={resetQuiz}
            className="cursor-pointer rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Start New Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz Started - Display Current Question
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quiz
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
        <button
          onClick={resetQuiz}
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Exit Quiz
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300 dark:bg-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-12 text-center shadow-2xl dark:border-gray-700 dark:bg-gray-800">
        {/* Acronym - Always Visible */}
        <div className="mb-8">
          <h2 className="text-6xl font-bold text-blue-600 dark:text-blue-400">
            {currentQuestion.acronym}
          </h2>
        </div>

        {/* Hint - Shown when requested */}
        {showHint && currentQuestion.hint && (
          <div className="animate-fadeIn mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
              💡 Hint
            </p>
            <p className="mt-2 text-yellow-900 dark:text-yellow-100">
              {currentQuestion.hint}
            </p>
          </div>
        )}

        {/* Answer - Shown when revealed */}
        {showAnswer && (
          <div className="animate-fadeIn">
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
              <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                ✓ Answer
              </p>
              <p className="mt-2 text-lg text-green-900 dark:text-green-100">
                {currentQuestion.definition}
              </p>
            </div>
            {!showHint && currentQuestion.hint && (
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
                <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                  💡 Hint
                </p>
                <p className="mt-2 text-yellow-900 dark:text-yellow-100">
                  {currentQuestion.hint}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {/* Show Hint Button */}
        {!showHint && !showAnswer && currentQuestion.hint && (
          <button
            onClick={handleShowHint}
            className="cursor-pointer rounded-lg border border-yellow-300 bg-yellow-50 px-6 py-3 font-semibold text-yellow-700 transition-colors hover:bg-yellow-100 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 dark:hover:bg-yellow-900/30"
          >
            💡 Show Hint
          </button>
        )}

        {/* Show Answer Button */}
        {!showAnswer && (
          <button
            onClick={handleShowAnswer}
            className="cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Show Answer
          </button>
        )}

        {/* Flag for Study Button - Only shown after answer is revealed */}
        {showAnswer && (
          <button
            onClick={handleToggleFlag}
            className={`cursor-pointer rounded-lg border-2 px-6 py-3 font-semibold transition-colors ${
              flaggedForStudy.includes(currentQuestion.id)
                ? "border-orange-500 bg-orange-500 text-white hover:bg-orange-600 dark:border-orange-400 dark:bg-orange-400"
                : "border-orange-300 bg-white text-orange-600 hover:bg-orange-50 dark:border-orange-700 dark:bg-gray-800 dark:text-orange-400 dark:hover:bg-orange-900/20"
            }`}
          >
            {flaggedForStudy.includes(currentQuestion.id)
              ? "🚩 Flagged for Study"
              : "🏴 Mark for Study"}
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          ← Previous
        </button>

        <span className="text-sm text-gray-600 dark:text-gray-400">
          {flaggedForStudy.length} flagged for study
        </span>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleFinishQuiz}
            className="cursor-pointer rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          >
            Finish Quiz →
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="cursor-pointer rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
