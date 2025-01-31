import clientPromise from "@/lib/mongodb"


export async function POST(request) {
    const body = await request.json()

    const client = await clientPromise;
    const db = client.db("retirement")
    const collection = db.collection("wishes")

    const doc = await collection.findOne({name: body.name})

    if (doc){
      return Response.json({ success: false, error: true, message: 'Posting Name already exits', result: null })
    }

    const result = await collection.insertOne(body)
     
    return Response.json({ success: true, error: false, message: 'Your wish has been added', result: result,  })
  }