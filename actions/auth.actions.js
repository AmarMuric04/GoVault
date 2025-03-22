"use server";

import connectToDatabase from "@/lib/database/db";
import User from "@/lib/database/models/user";
import { validatePassword } from "@/lib/validators/password";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import validator from "validator";

export async function signup(formData) {
  await connectToDatabase();

  const email = formData.get("email");
  const password = formData.get("password");

  let errors = validatePassword(password);

  if (!validator.isEmail(email)) {
    errors.email = "Invalid email, try again.";
  }

  const alreadyExists = await userWithEmailExists(email);

  if (alreadyExists) {
    errors.email = "User with this email already exists. Try another one.";
  }

  if (Object.keys(errors).length) {
    throw { errors };
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

  redirect("/dashboard");
}

export async function signin(formData) {
  await connectToDatabase();

  const email = formData.get("email");
  const password = formData.get("password");

  const user = await User.findOne({ email });

  if (!user) {
    throw {
      errors: {
        password: "Invalid credentials",
        email: "Invalid credentials",
      },
    };
  }

  const correctPassword = await bcrypt.compare(password, user.password);

  if (!correctPassword) {
    throw {
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

  redirect("/dashboard");
}

export async function signout() {
  (await cookies()).set("token", "", { maxAge: 0, path: "/" });
  redirect("/?mode=signin");
}

export async function auth(formData, options) {
  const { remember, mode } = options;

  formData.set("remember", remember);
  if (mode === "signin") {
    return signin(formData);
  }
  if (mode === "signup") {
    return signup(formData);
  }
}

const userWithEmailExists = async (email) => {
  return !!(await User.countDocuments({ email }, { limit: 1 }));
};

export async function isAuthenticated() {
  const tokenCookie = (await cookies()).get("token");

  if (!tokenCookie || !tokenCookie.value) {
    return null;
  }

  try {
    const decoded = jwt.verify(tokenCookie.value, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return null;
    }

    return user._id.toString();
  } catch (error) {
    console.log(error);
    return null;
  }
}
