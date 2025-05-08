'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { GoogleIcon } from "@/components/icons"
import { GitHubIcon } from "@/components/icons"

export default function SignupPage() {

  const router = useRouter()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  
  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
  
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Signup failed");
      } else {
        localStorage.setItem("Token",data.token)
        alert("Signup successful!");
        router.push("/main/dashboard")
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-yellow-400 p-6 md:p-10 ">
        <div className="text-3xl font-bold">
            Welcome to Entwicklera 
        </div>
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription>
          Enter your information to get started
        </CardDescription>
      </CardHeader>
      
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstName" value={form.firstName} onChange={handleChange} placeholder="Yash" />

          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastName" value={form.lastName} onChange={handleChange} placeholder="Rajak" />

          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="rajakyash@example.com" />

        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={form.password} onChange={handleChange} />

        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />

        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the <a href="#" className="underline">Terms and Conditions</a>
          </label>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600" onClick={handleSubmit}>
          Sign Up
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
  <Button variant="outline">
    <GoogleIcon className="mr-2 h-4 w-4" />
    Google
  </Button>
  <Button variant="outline">
    <GitHubIcon className="mr-2 h-4 w-4" />
    GitHub
  </Button>
</div>
        
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline text-yellow-500">
            log in
          </Link>
        </p>
      </CardFooter>
    </Card>
    </div>
  )
}