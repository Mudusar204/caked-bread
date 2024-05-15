import User from "../../../../server/modal/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import dbConnect from "../../../../server/utils/dbConnect";

// @ts-ignore
export const POST = async (request) => {
  try {
    await dbConnect();
    const { email, password } = await request.json();
    console.log(email, "emial", password, "password");
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" });
    }
    console.log(user, "user from db");
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" });
    }
    console.log(passwordMatch, "pasword ");
    // Passwords match, login successful
    return NextResponse.json({ message: "success", data: user });
  } catch (error) {
    return NextResponse.json({
      error: "Something went wrong in server login ",
    });
  }
};
