"use server";

import crypto from "crypto";
import Password from "@/lib/database/models/password";
import { isAuthenticated } from "./auth.actions";
import connectToDatabase from "@/lib/database/db";
import { getPasswordStrength } from "@/utility/password/password-strength";

const algorithm = "aes-256-cbc";
const secretKey =
  process.env.ENCRYPTION_KEY || "my-super-secret-key-must-be-32-bytes-long";
const key = crypto.createHash("sha256").update(secretKey).digest();

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

function decrypt(encryptedText) {
  const [ivHex, encrypted] = encryptedText.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export const addPassword = async (password, source) => {
  const user = await isAuthenticated();
  console.log(user);
  if (!user) return;
  if (!password) return;

  await connectToDatabase();

  const encryptedPassword = encrypt(password);

  const psw = new Password({
    source,
    owner: user,
    password: encryptedPassword,
    strength: getPasswordStrength(password),
  });

  await psw.save();
  return psw;
};

export const getDecryptedPassword = async (passwordId) => {
  await connectToDatabase();
  const psw = await Password.findById(passwordId);
  if (!psw) return null;
  const decryptedPassword = decrypt(psw.password);
  return decryptedPassword;
};

export const getPasswordsByUserId = async (userId) => {
  await connectToDatabase();

  const passwords = await Password.find({ owner: userId });

  const decryptedPasswords = passwords.map((psw) => {
    console.log(psw);

    return {
      ...psw.toObject(),
      owner: psw.owner.toString(),
      _id: psw._id.toString(),
      password: decrypt(psw.password),
    };
  });

  return decryptedPasswords;
};
