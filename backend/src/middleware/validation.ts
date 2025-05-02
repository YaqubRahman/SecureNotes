import USER from "../config/config";

const checkUsername = (username: string) => {
  if (!username) {
    return {
      isValid: false,
      error: "Username is required!",
    };
  }

  if (username !== USER.username) {
    return {
      isValid: false,
      error: "Username is incorrect!",
    };
  }

  return { isValid: true };
};

const checkPassword = (password: string) => {
  if (!password) {
    return {
      isValid: false,
      error: "Password is required!",
    };
  }

  if (password !== USER.password) {
    return {
      isValid: false,
      error: "Password is incorrect!",
    };
  }

  return { isValid: true };
};

module.exports = {
  checkUsername,
  checkPassword,
};
