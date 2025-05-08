import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Intern } from '@/models/Intern';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    if (password.length < 4) {
      return NextResponse.json(
        { message: "Password must be at least 4 characters long" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingIntern = await Intern.findOne({ email });
    if (existingIntern) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newIntern = await Intern.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    const tokenPayload = {
      id: newIntern._id,
      email: newIntern.email,
      firstName: newIntern.firstName,
      lastName: newIntern.lastName
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "7d"
    });

    return NextResponse.json(
      { message: "Registration successful", token },
      { status: 201 }
    );

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
