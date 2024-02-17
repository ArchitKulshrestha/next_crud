import { connectToDB } from "@/libs/db";
import notes from "@/models/notes";
export const dynamic = "force-dynamic";
export async function GET(request) {
  try {
    await connectToDB();
    const allNotes = await notes.find({}).populate("creator");

    return Response.json({
      allNotes,
    });
  } catch (err) {
    console.log(err);
    return Response.json({
      message: "An error occurred",
    });
  }
}
