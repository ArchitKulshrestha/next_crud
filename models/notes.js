import mongoose from "mongoose";
const notesSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],

    maxlength: 50,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
    trim: true,
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const notes = mongoose.models.notes || mongoose.model("notes", notesSchema);
export default notes;
