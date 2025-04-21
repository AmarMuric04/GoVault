import { getRandomInt } from "../random-number";
import {
  normal_characters,
  special_characters,
  number_characters,
} from "./generator-symbols";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generatePassword = (length, config) => {
  if (length > 30) length = 30;

  let guaranteed = [];
  let candidates = [];

  if (config.lowerCase) {
    guaranteed.push(
      normal_characters[getRandomInt(0, normal_characters.length - 1)]
    );
    candidates = candidates.concat(normal_characters);
  }

  if (config.upperCase) {
    const upperChars = normal_characters.map((char) => char.toUpperCase());
    guaranteed.push(upperChars[getRandomInt(0, upperChars.length - 1)]);
    candidates = candidates.concat(upperChars);
  }

  if (config.digits) {
    guaranteed.push(
      number_characters[getRandomInt(0, number_characters.length - 1)]
    );
    candidates = candidates.concat(number_characters);
  }

  if (config.symbols) {
    guaranteed.push(
      special_characters[getRandomInt(0, special_characters.length - 1)]
    );
    candidates = candidates.concat(special_characters);
  }

  if (candidates.length === 0) return "";

  const remainingLength = length - guaranteed.length;
  let remaining = [];

  for (let i = 0; i < remainingLength; i++) {
    remaining.push(candidates[getRandomInt(0, candidates.length - 1)]);
  }

  const finalPasswordArray = shuffleArray([...guaranteed, ...remaining]);

  return finalPasswordArray.join("");
};
