
import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
}, { timestamps: true ,
    collection: "admin"
 });

export const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
