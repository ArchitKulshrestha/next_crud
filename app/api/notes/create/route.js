import { connectToDB } from "@/libs/db";
import notes from "@/models/notes";
export const dynamic = "force-dynamic";
export async function POST(request) {
  const { title, description } = await request.json();
  if (!title || !description) {
    return Response.json(
      {
        error: "Title and description is required",
      },
      { status: 400 }
    );
  }
  try {
    await connectToDB();
    const note = await notes.create({
      title,
      description,
    });
    return Response.json(
      {
        note,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return new Response("Error creating note", { status: 500 });
  }
}

export async function GET() {
  return Response.json({
    message: "create note",
  });
}
