import { getRandomInt } from "../random-number";
import {
  normal_characters,
  special_characters,
  number_characters,
} from "./generator-symbols";

export const generatePassword = (length, config) => {
  let password = "";

  if (length > 30) length = 30;

  let candidates = [];
  if (config.lowerCase) {
    candidates = candidates.concat(normal_characters);
  }
  if (config.upperCase) {
    candidates = candidates.concat(
      normal_characters.map((char) => char.toUpperCase())
    );
  }
  if (config.digits) {
    candidates = candidates.concat(number_characters);
  }
  if (config.symbols) {
    candidates = candidates.concat(special_characters);
  }

  if (candidates.length === 0) {
    console.error("No character types selected in config");
    return "";
  }

  for (let i = 0; i < length; i++) {
    password += candidates[getRandomInt(0, candidates.length - 1)];
  }

  console.log("The password is", password);
  return password;
};
