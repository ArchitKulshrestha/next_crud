import { connectToDB } from "@/libs/db";
import notes from "@/models/notes";
export async function GET(request, { params }) {
  const { id } = params;
  try {
    await connectToDB();
    const Note = await notes.findById(id);
    return Response.json({
      Note,
    });
  } catch (err) {
    console.log(err);
    return new Response("Error getting note", { status: 500 });
  }
}
