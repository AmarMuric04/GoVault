import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  bio: {
    type: String,
  },
  image: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  language: {
    type: String,
  },
  passwordEmails: {
    type: Boolean,
  },
  securityEmails: {
    type: Boolean,
  },
  notificationType: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  settings: {},
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
