import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Acronyms() {
  const [acronyms, setAcronyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAcronyms();
  }, []);

  const fetchAcronyms = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/flashcards/all");
      if (!response.ok) {
        throw new Error("Failed to fetch acronyms");
      }
      const data = await response.json();
      setAcronyms(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredAcronyms = acronyms.filter(
    (item) =>
      item.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.hint &&
        item.hint.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.category &&
        item.category.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-center py-8 sm:py-12">
          <div className="text-center">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
              Loading acronyms...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 sm:p-6 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-sm text-red-800 sm:text-base dark:text-red-200">
            Error: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header - stacks on mobile */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            Acronyms
          </h1>
          <p className="text-base text-gray-600 sm:text-lg dark:text-gray-400">
            Browse all {acronyms.length} security acronyms in the database.
          </p>
        </div>
        <Link
          to="/acronyms/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 sm:py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-4 sm:mb-6">
        <input
          type="text"
          placeholder="Search by acronym, definition, category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
        />
      </div>

      {/* Results count */}
      {searchTerm && (
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredAcronyms.length} of {acronyms.length} acronyms
        </p>
      )}

      {/* Acronyms Grid */}
      {filteredAcronyms.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-lg sm:p-8 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm
              ? "No acronyms found matching your search."
              : "No acronyms in the database yet."}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {filteredAcronyms.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:border-blue-500 hover:shadow-xl sm:p-5 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400"
            >
              {/* Edit button - always visible on mobile, hover-only on desktop */}
              <Link
                to={`/acronyms/edit/${item.id}`}
                className="absolute top-3 right-3 rounded-lg bg-gray-100 p-2 opacity-100 transition-all hover:bg-gray-200 sm:opacity-0 sm:group-hover:opacity-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                title="Edit acronym"
                aria-label={`Edit ${item.acronym}`}
              >
                <svg
                  className="h-4 w-4 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </Link>
              <div className="mb-3">
                <h3 className="pr-8 text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {item.acronym}
                </h3>
              </div>
              {item.category && (
                <div className="mb-3">
                  <span className="inline-block rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                    📁 {item.category}
                  </span>
                </div>
              )}
              <div className="mb-2">
                <p className="text-sm text-gray-900 sm:text-base dark:text-white">
                  {item.definition}
                </p>
              </div>
              {item.hint && (
                <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-700">
                  <p className="text-xs text-gray-600 italic sm:text-sm dark:text-gray-400">
                    💡 {item.hint}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
