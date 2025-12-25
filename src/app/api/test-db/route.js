import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    return Response.json({
      success: true,
      message: "🎉 MongoDB কানেকশন সফল হয়েছে",
      dbName: db.databaseName,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
