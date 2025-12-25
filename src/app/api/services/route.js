import { NextResponse } from "next/server";
import { collectionNameObj, dbConnect } from "@/lib/mongodb";

export async function GET() {
    try {
        const collection = await dbConnect(collectionNameObj.serviceCollection);
        const services = await collection.find({}).toArray();
        return NextResponse.json({ success: true, services });
    }
    catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}