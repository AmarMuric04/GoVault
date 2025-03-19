import {
  hasDigit,
  hasSpecial,
  hasLowercase,
  hasUppercase,
  onlyDigits,
} from "./general";

export const getPasswordStrength = (password) => {
  const length = password.length;
  const complexity = [
    hasLowercase(password),
    hasUppercase(password),
    hasDigit(password),
    hasSpecial(password),
  ].filter(Boolean).length;

  if (length < 4) {
    return "Unacceptable";
  }

  if (length > 4 && length < 8) {
    return "Bad";
  }

  if (length > 20) {
    return "Great";
  }

  if (length > 10) {
    return "Dubious";
  }

  if (length > 15) {
    return "Good";
  }

  if (length >= 16 && complexity === 4) {
    return "Great";
  }

  if (length >= 12 && complexity >= 3) {
    return "Good";
  }

  if (length >= 8 && complexity >= 2) {
    return "Dubious";
  }

  return "Bad";
};
