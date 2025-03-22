import mongoose, { Schema } from "mongoose";

const passwordSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    password: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Password =
  mongoose.models.Password || mongoose.model("Password", passwordSchema);

export default Password;
