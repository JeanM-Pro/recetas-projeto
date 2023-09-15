import React from "react";
import "./paginationStyles.css";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="controls-pagination-container">
      <button
        className="button-left"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)} // Cambio aquí
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-chevron-left"
          viewBox="0 0 16 16"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </button>

      <span className="texto">
        Página {currentPage} de {totalPages}
      </span>
      <button
        className="button-right"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)} // Cambio aquí
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-chevron-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </div>
  );
};
