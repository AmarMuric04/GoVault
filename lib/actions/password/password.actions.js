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
    const user = await isAuthenticated();
    let errors = {};

    if (!password) {
      errors.password = "Password can't be empty";
    }

    if (!source) {
      errors.source = "You must provide a source";
    }

    if (Object.keys(errors).length) {
      const errorResponse = { error: true, errors };
      return errorResponse;
    }
    await connectToDatabase();

    const encryptedPassword = encrypt(password);

    const psw = new Password({
      source,
      owner: user,
      password: encryptedPassword,
      strength: getPasswordStrength(password),
      notes: notes || "No notes",
    });

    await psw.save();

    revalidatePath("/vault");
    return {
      ...psw.toObject(),
      owner: psw.owner.toString(),
      _id: psw._id.toString(),
      password: await decrypt(psw.password),
    };
  } catch (error) {
    return { error: true, message: "Internal server error" };
  }
};

export const deletePassword = async (password, verifier, passwordToDelete) => {
  try {
    const user = await isAuthenticated();

    let errors = {};

    if (!(await correctPassword(user._id, password)))
      errors.password = "Incorrect password";

    const thePassword = await Password.findById(passwordToDelete._id);

    if (verifier !== `Delete the password for ${thePassword.source}`) {
      errors.verifier = "Please enter the verifier correctly";
    }

    if (Object.keys(errors).length) {
      const errorResponse = { error: true, errors };
      return errorResponse;
    }
    await connectToDatabase();

    await Password.findByIdAndDelete(passwordToDelete._id);

    return passwordToDelete._id;
  } catch (error) {
    return { error: true, message: "Internal server error" };
  }
};

export const editPassword = async (accountsPassword, password, passwordId) => {
  try {
    const user = await isAuthenticated();

    let errors = {};

    if (!(await correctPassword(user._id, accountsPassword)))
      errors.accountPassword = "Incorrect password";

    if (!password) {
      errors.password = "Password can't be empty";
    }

    const thePassword = await Password.findById(passwordId);

    if (Object.keys(errors).length) {
      const errorResponse = { error: true, errors };
      return errorResponse;
    }
    await connectToDatabase();

    await Password.findByIdAndUpdate(passwordId, {
      $set: {
        password: encrypt(password),
        strength: getPasswordStrength(password),
      },
    });

    return thePassword.password;
  } catch (error) {
    return { error: true, message: "Internal server error" };
  }
};

export const editNotes = async (accountsPassword, notes, passwordId) => {
  try {
    const user = await isAuthenticated();

    let errors = {};

    if (!(await correctPassword(user._id, accountsPassword)))
      errors.password = "Incorrect password";

    const thePassword = await Password.findById(passwordId);

    if (Object.keys(errors).length) {
      const errorResponse = { error: true, errors };
      return errorResponse;
    }
    await connectToDatabase();

    await Password.findByIdAndUpdate(passwordId, {
      $set: {
        notes: notes || "No notes",
      },
    });

    return thePassword.notes;
  } catch (error) {
    return { error: true, message: "Internal server error" };
  }
};

export const getDecryptedPassword = async (passwordId) => {
  await connectToDatabase();
  const psw = await Password.findById(passwordId);
  if (!psw) return null;
  const decryptedPassword = await decrypt(psw.password);
  return decryptedPassword;
};

export const getPasswordsByUserId = async (userId) => {
  await connectToDatabase();

  const passwords = await Password.find({ owner: userId });

  const hiddenPasswords = passwords.map((psw) => ({
    ...psw.toObject(),
    owner: psw.owner.toString(),
    _id: psw._id.toString(),
    password: null,
    strength: null,
  }));

  return hiddenPasswords;
};

export const getFullPasswordInfo = async (userId, password) => {
  try {
    if (!(await correctPassword(userId, password)))
      return {
        error: true,
        errors: {
          password: "Incorrect password",
        },
      };
    const passwords = await Password.find({ owner: userId });

    const shownPasswords = passwords.map(async (psw) => ({
      ...psw.toObject(),
      owner: psw.owner.toString(),
      _id: psw._id.toString(),
      password: await decrypt(psw.password),
    }));

    return shownPasswords;
  } catch (error) {
    return { error: true, message: "Internal server error" };
  }
};

export const getIndividualFullPasswordInfo = async (
  userId,
  password,
  passwordId
) => {
  try {
    if (!(await correctPassword(userId, password)))
      return {
        error: true,
        errors: {
          password: "Incorrect password",
        },
      };

    const psw = await Password.findById(passwordId);

    return {
      ...psw.toObject(),
      owner: psw.owner.toString(),
      _id: psw._id.toString(),
      password: decrypt(psw.password),
    };
  } catch (error) {
    return { error: true, message: "Internal server error" };
  }
};
