import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const PAGE_SIZE = 10;

export default function Pagination({ count, currentPage, onPageChange }) {
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (pageCount <= 1) return null;

  function handlePrev() {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }

  function handleNext() {
    if (currentPage < pageCount) onPageChange(currentPage + 1);
  }

  return (
    <div className="flex justify-between items-center p-4">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Showing{' '}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{' '}
        to{' '}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{' '}
        of <span className="font-semibold">{count}</span> results
      </p>

      <div className="flex gap-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium border rounded-md disabled:opacity-50 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <HiChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentPage === pageCount}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium border rounded-md disabled:opacity-50 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <span>Next</span>
          <HiChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
