import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import bg from "./back_logo.jpg"
export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-yellow-400 p-6 md:p-10" >
      <div className="flex w-full max-w-sm flex-col gap-6">
       <div className="text-center text-3xl font-bold">
       Welcome to Entwicklera
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
