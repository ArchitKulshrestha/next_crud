import { connectToDB } from "@/libs/db";
import notes from "@/models/notes";

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await connectToDB();
    const result = await notes.findByIdAndDelete(id);
    return Response.json({
      message: "deleted note",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: error.message,
    });
  }
}

export async function GET(request, { params }) {
  const { id } = params;

  return Response.json({
    message: "create note",
    id: id,
  });
}
