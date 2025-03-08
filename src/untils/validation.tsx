export const validateForm = (email: string, password: string) => {
  const emailError = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? "Please enter a valid email address"
    : "";
  const passwordError =
    password.length < 6 ? "Password must be at least 6 characters long" : "";
  return { emailError, passwordError };
};
