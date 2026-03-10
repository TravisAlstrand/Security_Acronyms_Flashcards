import { Link } from "react-router";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
          Security Acronyms Flashcards
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Learn and practice security-related acronyms and their meanings.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Link
          to="/acronyms"
          className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400"
        >
          <div className="mb-3 flex items-center">
            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
              <svg
                className="h-6 w-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h2 className="ml-3 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
              Acronyms
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Browse and search all security acronyms in the database. View
            definitions and helpful hints.
          </p>
        </Link>

        <Link
          to="/quiz"
          className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:border-green-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-400"
        >
          <div className="mb-3 flex items-center">
            <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900">
              <svg
                className="h-6 w-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h2 className="ml-3 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400">
              Quiz
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Test your knowledge with interactive quizzes. Track your progress
            and identify areas for improvement.
          </p>
        </Link>
      </div>

      <div className="mt-12 rounded-xl border border-blue-100 bg-blue-50 p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          💡 Getting Started
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
            <span>
              Start with <strong>Flashcards</strong> to familiarize yourself
              with common security acronyms
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
            <span>
              Practice with the <strong>Quiz</strong> to test your retention
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
            <span>
              Use the dark mode toggle in the navigation to switch themes
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
