
import mongoose from 'mongoose';

const InternSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
}, { timestamps: true ,
    collection: "internname"
 });

export const Intern = mongoose.models.Intern || mongoose.model("Intern", InternSchema);
