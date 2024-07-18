export const passwordValidator = (password, confirmPassword, setError) => {
  const exp =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (password === confirmPassword) {
    if (password.match(exp)) {
      setError("");
    } else {
      setError(
        "Password must contain atleast one capital letter, one numerical value, one special character and must be atleast 8 characters long",
      );
    }
  } else {
    setError("Password does not match");
  }
};
