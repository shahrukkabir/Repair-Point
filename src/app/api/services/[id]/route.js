import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { collectionNameObj, dbConnect } from "@/lib/mongodb";

export async function GET(req) {
  try {
    const pathname = req.nextUrl.pathname;
    const id = pathname.split("/").pop();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid service id" }, { status: 400 }
      );
    }
    const collection = await dbConnect(collectionNameObj.serviceCollection);
    const service = await collection.findOne({ _id: new ObjectId(id) });

    if (!service) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, service });
  }
  catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
