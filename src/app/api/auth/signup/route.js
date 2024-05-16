import dbConnect from "../../../../config/dbConect";
import Users from "../../../../modal/User";
// import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// @ts-ignore
export const POST = async (request) => {
  try {
    await dbConnect();
    const { walletAddress, referCode } = await request.json();
    // const hashedPassword = await bcrypt.hash(password, 10);
    let userExist = await Users.findOne({ walletAddress: walletAddress });
    if (userExist) {
      return NextResponse.json({
        status: true,
        message: "Login success",
        data: userExist,
      });
    }
    let referralUser = null;
    if (referralCode != null) {
      referralUser = await Users.findOne({ referralCode: referCode });
    }
    const referralCode = Math.floor(100000 + Math.random() * 900000).toString();
    const newUser = new Users({
      walletAddress,
      referralCode,
      referredBy: referralUser?._id,
    });

    const res = await newUser.save();

    return NextResponse.json({
      status: true,
      message: "Signup success",
      data: res,
    });
  } catch (error) {
    console.log(error, "error");
    return NextResponse.json({
      status: false,
      error: error,
      message: "Something went wrong in server",
    });
  }
};
