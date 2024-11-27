import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const PageButton = ({ totalPages, currPage, setCurrPage }) => {
  const navigate = useNavigate();
  const debounceTimer = useRef(null);

  const debouncedNavigate = (newPage) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setCurrPage(newPage);
      navigate(`?page=${newPage}`);
    }, 200);
  };

  const handleClickPrev = () => {
    if (currPage > 1) {
      const newPage = currPage - 1;
      debouncedNavigate(newPage);
    }
  };

  const handleClickNext = () => {
    if (currPage < totalPages) {
      const newPage = currPage + 1;
      debouncedNavigate(newPage);
    }
  };

  return (
    <div className="text-white text-xl flex gap-2">
      <button onClick={() => handleClickPrev()}>prev</button>
      {Array.from({ length: totalPages }, (_, index) => index + 1)
        .slice(
          Math.floor((currPage - 1) / 5) * 5,
          Math.floor((currPage - 1) / 5) * 5 + 5
        )
        .map((page) => (
          <button
            className={`${
              page === currPage
                ? "bg-blue-500 rounded-full w-6 h-6 flex justify-center items-center"
                : ""
            }`}
            key={page}
            value={page}
            onClick={(e) => debouncedNavigate(Number(e.target.value))}
          >
            {page}
          </button>
        ))}
      <button onClick={() => handleClickNext()}>next</button>
    </div>
  );
};

PageButton.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currPage: PropTypes.number.isRequired,
  setCurrPage: PropTypes.func.isRequired,
};

export default PageButton;
