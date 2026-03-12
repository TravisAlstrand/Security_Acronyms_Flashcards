import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";

export default function EditAcronym() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    acronym: "",
    definition: "",
    hint: "",
    category: "",
  });
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchAcronym = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/flashcards/${id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch acronym");
        }
        const data = await response.json();
        setFormData({
          acronym: data.acronym,
          definition: data.definition,
          hint: data.hint || "",
          category: data.category || "",
        });
        setIsLoading(false);
      } catch {
        setErrors(["Failed to load acronym"]);
        setIsLoading(false);
      }
    };

    fetchAcronym();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/flashcards/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            acronym: formData.acronym,
            definition: formData.definition,
            category: formData.category || null,
            hint: formData.hint || null,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors(errorData.errors);
        } else {
          setErrors(["Failed to update acronym"]);
        }
        setIsSubmitting(false);
        return;
      }

      // Success - redirect to acronyms page
      navigate("/acronyms");
    } catch {
      setErrors(["Network error. Please try again."]);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/flashcards/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete acronym");
      }

      // Success - redirect to acronyms page
      navigate("/acronyms");
    } catch {
      setErrors(["Failed to delete acronym. Please try again."]);
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading acronym...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <Link
          to="/acronyms"
          className="mb-4 inline-flex items-center text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Acronyms
        </Link>
        <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
          Edit Acronym
        </h1>
        <p className="text-base text-gray-600 sm:text-lg dark:text-gray-400">
          Update the acronym details.
        </p>
      </div>

      {errors.length > 0 && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <h3 className="mb-2 font-semibold text-red-800 dark:text-red-200">
            Please fix the following errors:
          </h3>
          <ul className="list-inside list-disc text-red-700 dark:text-red-300">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 bg-white p-5 shadow-lg sm:p-8 dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="mb-6">
          <label
            htmlFor="acronym"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Acronym <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="acronym"
            name="acronym"
            value={formData.acronym}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
            placeholder="e.g., HTTPS"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            2-15 characters
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="definition"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Definition <span className="text-red-500">*</span>
          </label>
          <textarea
            id="definition"
            name="definition"
            value={formData.definition}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
            placeholder="e.g., Hypertext Transfer Protocol Secure"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Category <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
            placeholder="e.g., Protocols, Cryptography, Networking"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Common categories: Protocols, Networking, Cryptography,
            Authentication, Access Control, Security Systems, Cloud Computing,
            Compliance
          </p>
        </div>

        <div className="mb-8">
          <label
            htmlFor="hint"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Hint <span className="text-gray-500">(optional)</span>
          </label>
          <textarea
            id="hint"
            name="hint"
            value={formData.hint}
            onChange={handleChange}
            rows={2}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
            placeholder="e.g., Encrypted web traffic that uses TLS and typically runs on port 443."
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <Link
            to="/acronyms"
            className="flex-1 cursor-pointer rounded-lg border border-gray-300 bg-white px-6 py-3 text-center font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Cancel
          </Link>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6 sm:mt-8 sm:pt-8 dark:border-gray-700">
          <h3 className="mb-3 text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
            Danger Zone
          </h3>
          <p className="mb-4 text-sm text-gray-600 sm:text-base dark:text-gray-400">
            Deleting an acronym is permanent and cannot be undone.
          </p>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="cursor-pointer rounded-lg border border-red-300 bg-white px-6 py-3 font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:bg-gray-900 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            Delete Acronym
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-2xl sm:p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
              Confirm Delete
            </h2>
            <p className="mb-6 text-sm text-gray-600 sm:text-base dark:text-gray-400">
              Are you sure you want to delete the acronym{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {formData.acronym}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 cursor-pointer rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 cursor-pointer rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
