"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const Home = () => {
  const [wishes, setWishes] = useState([]);
  const [visibleWishes, setVisibleWishes] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`/api/wishes`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Wishes:", data); // Debugging
        setWishes(data || []);
      })
      .catch((err) => console.error("Error fetching wishes:", err));
  }, []);

  useEffect(() => {
    if (wishes.length > 0) {
      setVisibleWishes(wishes.slice(0, 3));
    }
  }, [wishes]);

  useEffect(() => {
    if (wishes.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % wishes.length);
      setVisibleWishes(wishes.slice(index, index + 3));
    }, 30000);

    return () => clearInterval(interval);
  }, [wishes, index]);

  return (
    <div className="flex flex-col items-center p-4">
      <img src="/Papa.jpeg" className="w-[100%] object-contain mt-4" alt="Retirement" />
      <Link href="/addWish">
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Wish Him</button>
      </Link>
      <h2 className="text-2xl font-bold mt-6">Wishes</h2>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {visibleWishes.length > 0 ? (
          visibleWishes.map((wish, i) => (
            <div key={i} className="p-4 border rounded shadow">
              <span className="font-bold">{wish.name}</span>: <p>{wish.wish}</p>
            </div>
          ))
        ) : (
          <p>No wishes yet!</p>
        )}
      </div>
      <Link href="/shoWishes">
        <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Show more Wishes</button>
      </Link>
    </div>
  );
};

export default Home;
