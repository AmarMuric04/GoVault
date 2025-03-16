"use server";

import connectToDatabase from "@/lib/database/db";
import User from "@/lib/database/models/user";
import { validatePassword } from "@/lib/validators/password";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import validator from "validator";

export async function signup(prevState, formData) {
  await connectToDatabase();

  const email = formData.get("email");
  const password = formData.get("password");

  let errors = validatePassword(password);

  if (!validator.isEmail(email)) {
    errors.email = "Invalid email, try again.";
  }

  if (Object.keys(errors).length) {
    return { errors };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
  });

  await user.save();

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    path: "/",
  });

  console.log("User logged in:", user);
}

export async function signin(prevState, formData) {
  await connectToDatabase();

  const email = formData.get("email");
  const password = formData.get("password");

  const user = await User.findOne({ email });

  if (!user) {
    return {
      errors: {
        password: "Invalid credentials",
        email: "Invalid credentials",
      },
    };
  }

  const correctPassword = await bcrypt.compare(password, user.password);

  if (!correctPassword) {
    return {
      errors: {
        password: "Invalid credentials",
        email: "Invalid credentials",
      },
    };
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    path: "/",
  });

  console.log("User logged in:", user);
}

export async function isAuthenticated() {
  const tokenCookie = (await cookies()).get("token");

  console.log(!!tokenCookie);
  return !!tokenCookie;
}
