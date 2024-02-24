import React from "react";

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalPages,
  totalItems,
  items,
}) => {
  const renderPaginationButtons = () => {
    const buttons = [];

    // Calculate the starting and ending page numbers for the pagination
    let startPage = Math.max(pageNumber - 2, 0);
    let endPage = Math.min(startPage + 4, totalPages - 1);
    startPage = Math.max(endPage - 4, 0);

    // Generate pagination buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          type="button"
          className={
            i === pageNumber ? "pagination-btn active" : "pagination-btn"
          }
          onClick={() => setPageNumber && setPageNumber(i)}
        >
          {i + 1}
        </button>
      );
    }

    return buttons;
  };

  return totalPages > 1 ? (
    <div className="pagination-col">
      <div className="lefttext">
        <p>
          Showing {items || 20} item(s) out of {totalItems || "00"} Result found
        </p>
      </div>
      <div className="pagination">
        {/* Previous Button */}
        <button
          style={{ display: pageNumber <= 0 ? "none" : "" }}
          type="button"
          className="pagination-btn"
          onClick={() => setPageNumber && setPageNumber(pageNumber - 1)}
        >
          <img
            src={`${process.env.PUBLIC_URL}/icons-images/arrow-left.svg`}
            alt="icon"
          />
        </button>
        {renderPaginationButtons()}
        {/* Next Button */}
        <button
          style={{ display: pageNumber >= totalPages - 1 ? "none" : "" }}
          type="button"
          className="pagination-btn"
          onClick={() => setPageNumber && setPageNumber(pageNumber + 1)}
        >
          <img
            src={`${process.env.PUBLIC_URL}/icons-images/arrow-right.svg`}
            alt="icon"
          />
        </button>
      </div>
    </div>
  ) : null;
};

export default Pagination;
