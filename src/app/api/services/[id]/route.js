import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { collectionNameObj, dbConnect } from "@/lib/mongodb";

/* =========================
   GET SINGLE SERVICE
========================= */
export async function GET(req) {
  try {
    const pathname = req.nextUrl.pathname;
    const id = pathname.split("/").pop();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid service id" },
        { status: 400 }
      );
    }

    const collection = await dbConnect(
      collectionNameObj.serviceCollection
    );

    const service = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, service });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/* =========================
   UPDATE SERVICE (EDIT)
========================= */
export async function PATCH(req) {
  try {
    const pathname = req.nextUrl.pathname;
    const id = pathname.split("/").pop();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid service id" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // 🚫 _id remove (IMPORTANT)
    const { _id, ...updateData } = body;

    const collection = await dbConnect(
      collectionNameObj.serviceCollection
    );

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


/* =========================
   DELETE SERVICE
========================= */
export async function DELETE(req) {
  try {
    const pathname = req.nextUrl.pathname;
    const id = pathname.split("/").pop();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid service id" },
        { status: 400 }
      );
    }

    const collection = await dbConnect(
      collectionNameObj.serviceCollection
    );

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
