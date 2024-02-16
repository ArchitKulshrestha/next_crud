import { connectToDB } from "@/libs/db";
import notes from "@/models/notes";
export async function PUT(request, { params }) {
  const { id } = params;
  const { title, description } = await request.json();
  try {
    await connectToDB();
    const result = await notes.findByIdAndUpdate(id, {
      title,
      description,
    });
    return Response.json(
      {
        message: "Note updated",
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return new Response("Error updating note", { status: 500 });
  }
}

export async function GET(request, { params }) {
  const { id } = params;

  return Response.json({
    message: "Update note",
    id: id,
  });
}
