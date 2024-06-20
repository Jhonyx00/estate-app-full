import bcrypt from "bcrypt";
import prisma from "../lib/prisma";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //hash the password
    const hashedpassword = await bcrypt.hash(password, 10);
    console.log(hashedpassword);

    //create a new user and save to database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedpassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User created succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};
export const login = (req, res) => {};
export const logout = (req, res) => {};
