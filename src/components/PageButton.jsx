import { useNavigate } from "react-router-dom";

function PageButton({ totalPages, currPage, setCurrPage }) {
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrPage(Number(page));

    navigate(`?page=${page}`);
  };

  const handleClickPrev = () => {
    if (currPage > 1) {
      const newPage = currPage - 1;
      setCurrPage(newPage);
      navigate(`?page=${newPage}`);
    }
  };

  const handleClickNext = () => {
    if (currPage < totalPages) {
      const newPage = currPage + 1;
      setCurrPage(newPage);
      navigate(`?page=${newPage}`);
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
            onClick={(e) => handlePageChange(e.target.value)}
          >
            {page}
          </button>
        ))}
      <button onClick={() => handleClickNext()}>next</button>
    </div>
  );
}

export default PageButton;
