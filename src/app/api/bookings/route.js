
import { ObjectId } from "mongodb";
import { collectionNameObj, dbConnect } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.json();

        // Validation
        if (!data.serviceId || !data.userEmail) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const collection = await dbConnect(collectionNameObj.serviceBookingsCollection);

        // Insert booking
        const result = await collection.insertOne({
            ...data,
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true, bookingId: result.insertedId });
    }
    catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { bookingId } = await req.json();
        if (!bookingId) {
            return NextResponse.json({ success: false, error: "Missing bookingId" }, { status: 400 });
        }
        const collection = await dbConnect(collectionNameObj.serviceBookingsCollection);
        const result = await collection.deleteOne({ _id: new ObjectId(bookingId) });
        if (result.deletedCount === 1) {
            return NextResponse.json({ success: true });
        }
        else {
            return NextResponse.json({ success: false, error: "Booking not found or already deleted" }, { status: 404 });
        }
    }
    catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

