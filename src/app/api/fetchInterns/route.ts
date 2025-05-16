import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Intern} from "@/models/Interns";

export async function GET() {
  await dbConnect();
  const interns = await Intern.find();

  const formatted = interns.map((intern, index) => ({
    id: `txn${String(index + 1).padStart(3, '0')}`,
    name: intern.name,
    email: intern.email,
    stipend: intern.stipend,
    doj: intern.doj,
    doe: intern.doe,
    intern: intern.intern,
  }));

  return NextResponse.json(formatted);
}