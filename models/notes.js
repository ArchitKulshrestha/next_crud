import mongoose from "mongoose";
const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
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
