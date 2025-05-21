import React from "react";
import Button from "./buttons/Button";
import ButtonPagination from "./buttons/ButtonPagination";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-6">
      <nav className="inline-flex">
        <ul className="flex space-x-2 items-center">
          <li>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="secondary"
            >
              Previous
            </Button>
          </li>
          {pages.map((page, index) => {
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <li key={page}>
                  <ButtonPagination
                    onClick={() => handlePageChange(page)}
                    isActive={page === currentPage}
                  >
                    {page}
                  </ButtonPagination>
                </li>
              );
            }
            if (page === 2 || page === totalPages - 1) {
              return (
                <li key={`ellipsis-${index}`}>
                  <span className="btn btn-ghost px-4 py-2 cursor-default">
                    ...
                  </span>
                </li>
              );
            }
            return null;
          })}
          <li>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="secondary"
            >
              Next
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;