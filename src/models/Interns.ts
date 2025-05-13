import mongoose from "mongoose";

const InternSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    intern: { type: String, required: true },
    stipend: { type: Number, required: true },
    doj: { type: String, default: "19-Jan-2023" },
    doe: { type: String, default: "19-Mar-2023" },
  },
  { timestamps: true, collection: "internname" }
);

export const Intern = mongoose.models.Intern || mongoose.model("Intern", InternSchema);
