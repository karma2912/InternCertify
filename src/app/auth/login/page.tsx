
import { LoginForm } from "@/components/login-form"
export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-yellow-400 bg p-6 md:p-10" >
      <div className="flex w-full max-w-sm flex-col gap-6">
       <div className="text-center text-3xl font-bold">
       Welcome to Entwicklera
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
