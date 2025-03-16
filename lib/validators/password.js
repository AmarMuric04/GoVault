export function validatePassword(password) {
  const errors = {};

  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (password.length > 16) {
    errors.password = "Password must be no longer than 64 characters.";
  } else if (!/[A-Z]/.test(password)) {
    errors.password = "Password must contain at least one uppercase letter.";
  } else if (!/[a-z]/.test(password)) {
    errors.password = "Password must contain at least one lowercase letter.";
  } else if (!/\d/.test(password)) {
    errors.password = "Password must contain at least one number.";
  } else if (!/[\W_]/.test(password)) {
    errors.password = "Password must contain at least one special character.";
  } else if (/\s/.test(password)) {
    errors.password = "Password must not contain spaces.";
  }

  return errors;
}
