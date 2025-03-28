"use server";

import crypto from "crypto";
import Password from "@/lib/database/models/password";
import { correctPassword, isAuthenticated } from "../auth.actions";
import connectToDatabase from "@/lib/database/db";
import { getPasswordStrength } from "@/utility/password/password-strength";
import { revalidatePath } from "next/cache";
import moment from "moment";

const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_KEY;
const key = crypto.createHash("sha256").update(secretKey).digest();

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

export async function decrypt(encryptedText) {
  const [ivHex, encrypted] = encryptedText.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export const addPassword = async (password, source, notes) => {
  try {
    await connectToDatabase();
    const user = await isAuthenticated();
    let errors = {};

    if (!password) {
      errors.password = "Password can't be empty";
    }
    if (!source) {
      errors.source = "You must provide a source";
    }
    if (Object.keys(errors).length > 0) {
      return { error: true, errors };
    }

    const encryptedPassword = encrypt(password);
    const newPassword = new Password({
      source,
      owner: user,
      password: encryptedPassword,
      strength: getPasswordStrength(password),
      notes: notes || "No notes",
    });

    await newPassword.save();
    revalidatePath("/vault");

    return {
      ...newPassword.toObject(),
      owner: newPassword.owner.toString(),
      _id: newPassword._id.toString(),
      password: await decrypt(newPassword.password),
    };
  } catch (error) {
    console.error("addPassword error:", error);
    return { error: true, message: "Internal server error" };
  }
};

export const deletePassword = async (password, verifier, passwordToDelete) => {
  try {
    await connectToDatabase();
    const user = await isAuthenticated();
    let errors = {};

    if (!(await correctPassword(user._id, password))) {
      errors.password = "Incorrect password";
    }

    const pswDoc = await Password.findById(passwordToDelete._id);
    if (!pswDoc) {
      errors.passwordToDelete = "Password entry not found";
    } else if (verifier !== `Delete the password for ${pswDoc.source}`) {
      errors.verifier = "Please enter the verifier correctly";
    }

    if (Object.keys(errors).length > 0) {
      return { error: true, errors };
    }

    await Password.findByIdAndDelete(passwordToDelete._id);
    return passwordToDelete._id;
  } catch (error) {
    console.error("deletePassword error:", error);
    return { error: true, message: "Internal server error" };
  }
};

export const editPassword = async (accountsPassword, password, passwordId) => {
  try {
    await connectToDatabase();
    const user = await isAuthenticated();
    let errors = {};

    if (!(await correctPassword(user._id, accountsPassword))) {
      errors.accountPassword = "Incorrect password";
    }
    if (!password) {
      errors.password = "Password can't be empty";
    }

    if (Object.keys(errors).length > 0) {
      return { error: true, errors };
    }

    await Password.findByIdAndUpdate(passwordId, {
      $set: {
        password: encrypt(password),
        strength: getPasswordStrength(password),
      },
    });

    // Return the updated document
    const updatedPassword = await Password.findById(passwordId);
    return {
      ...updatedPassword.toObject(),
      owner: updatedPassword.owner.toString(),
      _id: updatedPassword._id.toString(),
      password: await decrypt(updatedPassword.password),
    };
  } catch (error) {
    console.error("editPassword error:", error);
    return { error: true, message: "Internal server error" };
  }
};

export const editNotes = async (accountsPassword, notes, passwordId) => {
  try {
    await connectToDatabase();
    const user = await isAuthenticated();
    let errors = {};

    if (!(await correctPassword(user._id, accountsPassword))) {
      errors.password = "Incorrect password";
    }

    if (Object.keys(errors).length > 0) {
      return { error: true, errors };
    }

    await Password.findByIdAndUpdate(passwordId, {
      $set: {
        notes: notes || "No notes",
      },
    });

    // Return updated notes
    const updatedPassword = await Password.findById(passwordId);
    return updatedPassword.notes;
  } catch (error) {
    console.error("editNotes error:", error);
    return { error: true, message: "Internal server error" };
  }
};

export const getDecryptedPassword = async (passwordId) => {
  try {
    await connectToDatabase();
    const psw = await Password.findById(passwordId);
    if (!psw) return null;
    return await decrypt(psw.password);
  } catch (error) {
    console.error("getDecryptedPassword error:", error);
    return { error: true, message: "Internal server error" };
  }
};

export const getPasswordsByUserId = async (userId) => {
  try {
    await connectToDatabase();
    const passwords = await Password.find({ owner: userId });
    return passwords.map((psw) => ({
      ...psw.toObject(),
      owner: psw.owner.toString(),
      _id: psw._id.toString(),
      password: null,
      strength: null,
    }));
  } catch (error) {
    console.error("getPasswordsByUserId error:", error);
    return { error: true, message: "Internal server error" };
  }
};

export const getFullPasswordInfo = async (userId, password) => {
  try {
    await connectToDatabase();
    if (!(await correctPassword(userId, password))) {
      return { error: true, errors: { password: "Incorrect password" } };
    }
    const passwords = await Password.find({ owner: userId });
    // Decrypt all passwords in parallel
    const shownPasswords = await Promise.all(
      passwords.map(async (psw) => ({
        ...psw.toObject(),
        owner: psw.owner.toString(),
        _id: psw._id.toString(),
        password: await decrypt(psw.password),
      }))
    );
    return shownPasswords;
  } catch (error) {
    console.error("getFullPasswordInfo error:", error);
    return { error: true, message: "Internal server error" };
  }
};

export const getIndividualFullPasswordInfo = async (
  userId,
  password,
  passwordId
) => {
  try {
    await connectToDatabase();
    if (!(await correctPassword(userId, password))) {
      return { error: true, errors: { password: "Incorrect password" } };
    }
    const psw = await Password.findById(passwordId);
    if (!psw) return { error: true, message: "Password not found" };

    return {
      ...psw.toObject(),
      owner: psw.owner.toString(),
      _id: psw._id.toString(),
      password: await decrypt(psw.password),
    };
  } catch (error) {
    console.error("getIndividualFullPasswordInfo error:", error);
    return { error: true, message: "Internal server error" };
  }
};
