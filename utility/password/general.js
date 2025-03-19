export const hasUppercase = (password) => {
  return /[A-Z]/.test(password);
};

export const hasDigit = (password) => {
  return /\d/.test(password);
};

export const hasLowercase = (password) => {
  return /[a-z]/.test(password);
};

export const hasSpecial = (password) => {
  return /[\W_]/.test(password);
};

export const hasSpace = (password) => {
  return /\s/.test(password);
};

export const onlyDigits = (password) => {
  return (
    hasDigit(password) &&
    !hasLowercase(password) &&
    !hasUppercase(password) &&
    !hasSpecial(password)
  );
};

export const onlyNormalCharacters = (password) => {
  return (
    !hasDigit(password) &&
    (hasLowercase(password) || hasUppercase(password)) &&
    !hasSpecial(password)
  );
};
