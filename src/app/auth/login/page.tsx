import { LoginForm } from "@/components/login-form"

export default function Page() {
  return (
    <div className="flex light min-h-svh w-full items-center justify-center bg-yellow-400 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
