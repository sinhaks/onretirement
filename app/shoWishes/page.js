"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import './styleWish.css'

const ShoWishes = () => {
    const [wishes, setWishes] = useState([]);
    
      useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/wishes`)
          .then((res) => res.json())
          .then((data) => setWishes(data));
      }, []);

  const [page, setPage] = useState(0);
  const wishesPerPage = 5;
  const totalPages = Math.ceil(wishes.length / wishesPerPage);
  const router = useRouter();

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h3 className="text-2xl font-bold">Wishes</h3>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {wishes.slice(page * wishesPerPage, (page + 1) * wishesPerPage).map((wish, i) => (
          <div key={i} className="p-4 border rounded shadow">
            <span className="font-bold">{wish.name}</span>: <p>{wish.wish}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between w-full max-w-md mt-4">
        <button onClick={handlePrev} className="bg-gray-500 text-white px-4 py-2 rounded" disabled={page === 0}>Previous</button>
        <Link href="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Back to Home</button>
        </Link>
        <button onClick={handleNext} className="bg-gray-500 text-white px-4 py-2 rounded" disabled={page === totalPages - 1}>Next</button>
      </div>
    </div>
  );
};


export default ShoWishes;