import React from "react";

import { PaginationProps } from "./types";

const Pagination = ({
  currentPage,
  setCurrentPage,
  pageNumber,
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pageNumber) {
      setCurrentPage(page);
    }
  };
  const getPagiationButtons = () => {
    let buttons: number[] = [];
    let starPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(pageNumber, currentPage + 2);
    for (let page = starPage; page <= endPage; page++) {
      buttons.push(page);
    }
    return buttons;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between mt-5">
      <button
        disabled={currentPage <= 1}
        className="border px-4 py-2 mx-2 rounded-full disabled:opacity-50"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previus
      </button>
      <div>
        {getPagiationButtons().map((page) => {
          return (
            <button
              key={page}
              disabled={page == currentPage}
              className="w-11 h-11 shrink-0 grow-0 border mx-1 rounded-full disabled:bg-red-500"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        disabled={currentPage >= pageNumber}
        className="border px-4 py-2 mx-2 rounded-full disabled:opacity-50"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
