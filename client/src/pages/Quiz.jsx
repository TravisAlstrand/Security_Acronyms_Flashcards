export default function Quiz() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
          Quiz
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Test your knowledge of security acronyms.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <svg
            className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600"
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
          <p className="text-xl font-medium">Quiz component coming soon!</p>
          <p className="mt-2">This is where you'll test your knowledge.</p>
        </div>
      </div>
    </div>
  );
}
