export const PasswordValidation = (password, confirmPassword, userName) => {
  if (password !== undefined && confirmPassword !== undefined) {
    return password === "" ||
      confirmPassword === "" ||
      password.length !== confirmPassword.length ||
      password !== confirmPassword ||
      userName === ""
      ? false
      : true;
  }
};

export const HttpValidation = (link) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(link);
};
