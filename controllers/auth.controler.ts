import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  //hash the password

  const hashedpassword = await bcrypt.hash(password, 10);

  console.log(hashedpassword);

  //create a neew user and save to database
};
export const login = (req, res) => {};
export const logout = (req, res) => {};
