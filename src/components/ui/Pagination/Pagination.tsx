import "./Pagination.css";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = "",
}: PaginationProps) {
  // Logic to generate page ranges with dots
  const getPageRange = () => {
    const totalPageNumbers = siblingCount * 2 + 5; // siblingCount + first + last + current + 2 dots

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", lastPageIndex];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }

    return [];
  };

  const pages = getPageRange();

  return (
    <nav className={`pagination ${className}`} aria-label="Pagination Navigation">
      <button
        type="button"
        className="pagination-btn pagination-arrow"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Go to previous page"
      >
        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
          chevron_left
        </span>
      </button>

      <div className="pagination-pages">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`dots-${index}`} className="pagination-dots">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={`page-${pageNum}`}
              type="button"
              className={`pagination-btn pagination-number ${isActive ? "pagination-active" : ""} font-label-sm`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="pagination-btn pagination-arrow"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Go to next page"
      >
        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
          chevron_right
        </span>
      </button>
    </nav>
  );
}
