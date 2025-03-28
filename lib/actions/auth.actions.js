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
  try {
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
      const errorResponse = { error: true, errors };
      console.log("Returning validation errors:", errorResponse);
      return errorResponse; // Return a plain object
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
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

    const successResponse = {
      success: true,
      email: user.email,
      _id: user._id.toString(),
    };
    console.log("Returning success response:", successResponse);

    return successResponse; // Return a plain object
  } catch (error) {
    console.error("Signup error:", error);
    return { error: true, message: "Internal server error" }; // Return a plain object
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

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return {
        error: true,
        errors: {
          email: "Invalid credentials",
          password: "Invalid credentials",
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

export const correctPassword = async (userId, password) => {
  try {
    const user = await User.findById(userId);

    if (!user) return;

    const correctPsw = await bcrypt.compare(password, user.password);

    return correctPsw;
  } catch (error) {
    console.error("Signin error:", error);
    return { error: true, message: "Internal server error" };
  }
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

    return {
      email: user.email,
      _id: user._id.toString(),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
