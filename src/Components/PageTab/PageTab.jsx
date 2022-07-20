const PageTab = () => {
  return (
    <div className=" bg-white text-[1.8rem] py-2 rounded-md ">
      <button
        data-pageNumber="1"
        className="border-r-2 border-black min-w-[8rem] hover:bg-slate-200 transition-colors"
      >
        1
      </button>
      <button
        data-pageNumber="2"
        className="border-r-2 border-black min-w-[8rem] hover:bg-slate-200 transition-colors"
      >
        2
      </button>
      <button
        data-pageNumber="3"
        className="border-r-2 border-black min-w-[8rem] hover:bg-slate-200 transition-colors"
      >
        3
      </button>
      <button
        data-pageNumber="4"
        className="border-r-2 border-black min-w-[8rem] hover:bg-slate-200 transition-colors"
      >
        4
      </button>
      <button
        data-pageNumber="other"
        className=" min-w-[8rem] hover:bg-slate-200 transition-colors"
      >
        ...
      </button>
    </div>
  );
};

export default PageTab;
