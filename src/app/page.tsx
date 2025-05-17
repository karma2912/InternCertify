
import { redirect } from "next/navigation";
export default function Home() {
  redirect("/auth/login")
  return (
    <div className="min-h-full border-2 border-white bg-black rounded-3xl p-6 w-full text-white">
      Hii
    </div>
  );
}