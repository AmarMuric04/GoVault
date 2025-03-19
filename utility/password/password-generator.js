import { getRandomInt } from "../random-number";
import {
  normal_characters,
  special_characters,
  number_characters,
} from "./generator-symbols";

export const generatePassword = (length) => {
  let password = "";
  if (length < 5) return;

  for (let i = 0; i < length; i++) {
    password +=
      normal_characters[getRandomInt(0, normal_characters.length - 1)];
  }

  console.log("The password is", password);
  return password;
};
