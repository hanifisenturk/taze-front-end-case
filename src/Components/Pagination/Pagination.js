import { useState, useContext } from "react";
import CoinContext from "../../store/context";

const Pagination = ({ totalPage }) => {
  const coinCtx = useContext(CoinContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [consecutives, setConsecutives] = useState([1, 2, 3, 4, 5]);

  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  const pageChangeHandler = (e) => {
    const currentPageNumber = +e.currentTarget.dataset.pagenumber;
    coinCtx.getCurrentPage(currentPageNumber);
    setCurrentPage(currentPageNumber);

    if (currentPageNumber === 1) {
      setConsecutives([1, 2, 3, 4, 5]);
    }
    if (currentPageNumber === totalPage) {
      setConsecutives(range(totalPage - 4, totalPage, 1));
    }

    if (
      currentPageNumber !== 1 &&
      currentPageNumber !== 2 &&
      currentPageNumber !== totalPage &&
      currentPageNumber !== totalPage - 1
    ) {
      setConsecutives(range(currentPageNumber - 2, currentPageNumber + 2, 1));
    }

    if (currentPageNumber === 2 && currentPageNumber !== totalPage - 1) {
      setConsecutives(range(currentPageNumber - 1, currentPageNumber + 3, 1));
    }
  };

  return (
    <div className=" bg-white text-[1.8rem] py-2 rounded-md flex items-center ">
      {consecutives.map((consecutive) => {
        return (
          <button
            key={consecutive}
            className={
              currentPage === consecutive
                ? "bg-black order-3  min-w-[5rem]  text-white rounded-md px-2 py-1 mx-1"
                : "bg-white order-3 min-w-[5rem]  text-black rounded-md px-2 py-1 mx-1"
            }
            data-pagenumber={consecutive}
            onClick={pageChangeHandler}
          >
            {consecutive}
          </button>
        );
      })}

      {currentPage !== 1 && currentPage !== 2 && currentPage !== 3 && (
        <>
          <button
            key={-1}
            className={
              currentPage === 1
                ? "bg-black order-first  min-w-[5rem]  text-white rounded-md px-2 py-1 mx-1"
                : "bg-white order-first min-w-[5rem]  text-black rounded-md px-2 py-1 mx-1"
            }
            data-pagenumber={1}
            onClick={pageChangeHandler}
          >
            1
          </button>
          <button
            key={0}
            className=" bg-white order-2 min-w-[5rem]  text-black rounded-md px-2 py-1 mx-1"
          >
            ...
          </button>
        </>
      )}
      {currentPage !== totalPage &&
        currentPage !== totalPage - 1 &&
        currentPage !== totalPage - 2 && (
          <>
            <button
              key={-2}
              className={
                currentPage === totalPage
                  ? "bg-black order-last  min-w-[5rem]  text-white rounded-md px-2 py-1 mx-1"
                  : "bg-white order-last min-w-[5rem]  text-black rounded-md px-2 py-1 mx-1"
              }
              data-pagenumber={totalPage}
              onClick={pageChangeHandler}
            >
              {totalPage}
            </button>
            <button
              key={-3}
              className=" bg-white order-4 min-w-[5rem]  text-black rounded-md px-2 py-1 mx-1"
            >
              ...
            </button>
          </>
        )}
    </div>
  );
};

export default Pagination;
