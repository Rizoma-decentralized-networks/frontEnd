import React, { useState, useEffect } from "react";
import MarkCard from "./MarkCard";
import Pagination from "./Pagination";
//import SearchFilter from "./searchFilter/SearchFilter";
import { getAllMarks } from "../services/apiMarks";
import { Link } from "react-router";

function ExploreMarks() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const marksPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        setLoading(true);
        const data = await getAllMarks();
        setMarks(data);
        setTotalPages(Math.ceil(data.length / marksPerPage));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching marks:", err);
        setError("Failed to load marks. Please try again later.");
        setLoading(false);
      }
    };

    fetchMarks();
  }, []);

  const indexOfLastMark = currentPage * marksPerPage;
  const indexOfFirstMark = indexOfLastMark - marksPerPage;
  const currentMarks = marks.slice(indexOfFirstMark, indexOfLastMark);

  return (
    <>

      {/* <SearchFilter setMarks={setMarks} /> */}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="alert alert-error max-w-md mx-auto my-8">
          <span>{error}</span>
        </div>
      ) : marks.length === 0 ? (
        <div className="text-center my-16">
          <h2 className="text-xl font-bold">No marks found</h2>
          <p className="text-gray-500">Be the first to create a mark!</p>
        </div>
      ) : (
        <div className="p-6 flex flex-wrap justify-center gap-6 space-y-6 space-x-6">
          {currentMarks.map((mark) => (
            <div key={mark.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-md">
              <MarkCard mark={mark} />
            </div>
          ))}
        </div>
      )}

      {!loading && !error && marks.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
}

export default ExploreMarks;
