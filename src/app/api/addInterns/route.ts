import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Intern } from "@/models/Interns";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const newIntern = new Intern(body);
    const savedIntern = await newIntern.save();
    revalidatePath("")
    return NextResponse.json(savedIntern, { status: 201 });
  } catch (error) {
    console.error('Error saving intern:', error);
    return NextResponse.json({ message: 'Error saving intern' }, { status: 500 });
  }
}