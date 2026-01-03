import { collectionNameObj, dbConnect } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);

        const serviceId = searchParams.get("serviceId");
        const userEmail = searchParams.get("userEmail");

        if (!serviceId || !userEmail) {
            return NextResponse.json({ booked: false });
        }
        const collection = await dbConnect(collectionNameObj.serviceBookingsCollection);
        const booking = await collection.findOne({
            serviceId: String(serviceId),
            userEmail,
        });

        return NextResponse.json({ booked: !!booking });
    }
    catch (error) {
        return NextResponse.json({ booked: false, error: "Booking check failed" }, { status: 500 });
    }
}
