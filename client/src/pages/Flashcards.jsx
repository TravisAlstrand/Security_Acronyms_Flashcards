export default function Flashcards() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
          Flashcards
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Browse and study security acronyms.
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <p className="text-xl font-medium">
            Flashcard component coming soon!
          </p>
          <p className="mt-2">This is where you'll study security acronyms.</p>
        </div>
      </div>
    </div>
  );
}
