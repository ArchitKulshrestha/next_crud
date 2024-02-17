import { connectToDB } from "@/libs/db";
import notes from "@/models/notes";
import User from "@/models/user";
export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectToDB();
    if (id) {
      const Note = await notes.find({ creator: id });
      return Response.json({
        Note,
      });
    }
    return new Response("No id provided", { status: 400 });
  } catch (err) {
    console.log(err);
    return new Response("Error getting note", { status: 500 });
  }
}
