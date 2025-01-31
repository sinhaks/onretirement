import clientPromise from "@/lib/mongodb"

// Function to get wishes from the retirement collection
export const GET = async () => {
  const client = await clientPromise
  const db = client.db('retirement') // You can specify the database name if needed
  const wishesCollection  = db.collection('wishes') // Collection name is 'retirement'

  try {
    const wishes = await wishesCollection.find({}).toArray();
    return new Response(JSON.stringify(wishes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching wishes:", error);
    return new Response(JSON.stringify({ error: "Could not fetch wishes" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}




// import { NextResponse } from "next/server";
// import { MongoClient } from "mongodb";

// const uri = process.env.MONGO_URI;
// const client = new MongoClient(uri);

// export async function GET() {
//   try {
//     await client.connect();
//     const db = client.db("retirement");
//     const collection = db.collection("wishes");
//     const wishes = await collection.find().toArray();

//     return NextResponse.json(wishes, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching wishes:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     await client.connect();
//     const db = client.db("retirement");
//     const collection = db.collection("wishes");
//     const result = await collection.insertOne(body);

//     return NextResponse.json({ message: "Wish added!", result }, { status: 201 });
//   } catch (error) {
//     console.error("Error adding wish:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }
