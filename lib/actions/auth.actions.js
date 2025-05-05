"use server";

import connectToDatabase from "@/lib/database/db";
import User from "@/lib/database/models/user";
import { validatePassword } from "@/lib/validators/password";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import validator from "validator";
import { cache } from "react";

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = "1h";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 3600,
  path: "/",
};

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });
};

const setAuthCookie = async (token) => {
  const cookieStore = await cookies();
  cookieStore.set("token", token, COOKIE_OPTIONS);
};

const userWithEmailExists = async (email) => {
  const count = await User.countDocuments({ email }, { limit: 1 });
  return count > 0;
};

export async function signup(formData) {
  try {
    await connectToDatabase();

    const email = formData.get("email");
    const password = formData.get("password");

    let errors = validatePassword(password) || {};

    if (!validator.isEmail(email)) {
      errors.email = "Invalid email, try again.";
    }

    if (await userWithEmailExists(email)) {
      errors.email = "User with this email already exists. Try another one.";
    }

    if (Object.keys(errors).length > 0) {
      console.log("Returning validation errors:", { error: true, errors });
      return { error: true, errors };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    const token = generateToken(user);
    await setAuthCookie(token);

    const successResponse = {
      success: true,
      email: user.email,
      _id: user._id.toString(),
    };
    console.log("Returning success response:", successResponse);
    return successResponse;
  } catch (error) {
    console.error("Signup error:", error);
    return { error: true, message: "Internal server error" };
  }
}

export async function signin(formData) {
  try {
    await connectToDatabase();

    const email = formData.get("email");
    const password = formData.get("password");

    const user = await User.findOne({ email });

    if (!user) {
      return {
        error: true,
        errors: {
          email: "Invalid credentials",
          password: "Invalid credentials",
        },
      };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return {
        error: true,
        errors: {
          email: "Invalid credentials",
          password: "Invalid credentials",
        },
      };
    }

    const token = generateToken(user);
    await setAuthCookie(token);

    return {
      success: true,
      email: user.email,
      _id: user._id.toString(),
    };
  } catch (error) {
    console.error("Signin error:", error);
    return { error: true, message: "Internal server error" };
  }
}

export async function signout() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", { maxAge: 0, path: "/" });
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
  return { error: true, message: "Invalid auth mode" };
}

export const correctPassword = async (userId, password) => {
  try {
    const user = await User.findById(userId);
    if (!user) return false;
    return await bcrypt.compare(password, user.password);
  } catch (error) {
    console.error("Password verification error:", error);
    return { error: true, message: "Internal server error" };
  }
};

export const updateAccount = async (userId, settings) => {
  try {
    const formattedSettings = Object.fromEntries(settings.entries());

    console.log("Formatted Settings:", formattedSettings);

    const user = await User.findByIdAndUpdate(userId, { ...formattedSettings });

    return { success: true };
  } catch (error) {
    console.error("Settings update error:", error);
    return { error: true, message: "Internal server error" };
  }
};

export const isAuthenticated = cache(async () => {
  const tokenCookie = (await cookies()).get("token");

  if (!tokenCookie?.value) {
    return null;
  }

  try {
    await connectToDatabase();

    const decoded = jwt.verify(tokenCookie.value, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return null;
    }
    return {
      ...user._doc,
      _id: user._id.toString(),
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
});
