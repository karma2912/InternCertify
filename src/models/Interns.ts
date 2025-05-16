import mongoose from "mongoose";

const InternSchema = new mongoose.Schema(
  {
    stipend: { type: Number, required: true },
    name: { type: String, required: true },
    doj: { type: String, default: "19-Jan-2023" },
    email: { type: String, required: true, unique: true },
    doe: { type: String, default: "19-Mar-2023" },
    intern: { type: String, required: true },
  },
  { timestamps: true, collection: "internname" }
);

export const Intern = mongoose.models.Intern || mongoose.model("Intern", InternSchema);
