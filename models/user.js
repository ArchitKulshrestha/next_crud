import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Please provide an email"],
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
