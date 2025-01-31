"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import './styleAddWish.css'

const AddWish = () => {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !wish) {
      alert("Please fill in both fields!");
      return;
    }
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, wish }),
    });
  
    if (res.ok) {
      alert("Wish added successfully!");
      router.push("/");
    } else {
      const errorData = await res.json();
      alert(errorData.message || "Error adding wish");
    }
  };
  

  return (
    <div className="p-4 flex flex-col items-center">
      <h3 className="text-2xl font-bold">Add a Wish</h3>
      <form className="flex flex-col gap-2 w-full max-w-md" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input className="border p-2 text-black" required value={name} onChange={(e) => setName(e.target.value)} />
        <label>Wish:</label>
        <textarea className="border p-2 text-black" required value={wish} onChange={(e) => setWish(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" type="submit">Submit</button>
      </form>
      <div className="flex justify-between w-full max-w-md mt-4">
        
        <Link href="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Back to Home</button>
        </Link>
        
      </div>
    </div>
  );
};

export default AddWish;