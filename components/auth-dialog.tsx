"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { createClientSupabaseClient } from "@/lib/supabase-client"
import { redirectAfterAuth } from "@/lib/auth-utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AuthDialogProps {
  children?: React.ReactNode
  type?: "signin" | "signup"
  className?: string
}

export function AuthDialog({ children, type = "signin", className }: AuthDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<string>(type)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userRole, setUserRole] = useState("user")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showSignInPassword, setShowSignInPassword] = useState(false)

  const supabase = createClientSupabaseClient()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Get user profile with role
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single()

      if (profileError) throw profileError

      // Store role in localStorage for client-side access
      localStorage.setItem("userRole", profileData.role)

      setSuccess("Signed in successfully!")

      // Close the dialog after a short delay and redirect
      setTimeout(async () => {
        setOpen(false)
        const redirectPath = await redirectAfterAuth()
        router.push(redirectPath)
      }, 1000)
    } catch (error: any) {
      setError(error.message || "An error occurred during sign in")
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: userRole,
          },
        },
      })

      if (error) throw error

      // Manually create the profile entry as a fallback
      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: data.user.id,
          first_name: firstName,
          last_name: lastName,
          email: email,
          role: userRole,
        })

        if (profileError) {
          console.error("Error creating profile:", profileError)
        }
      }

      setSuccess("Account created successfully! Please check your email to confirm your account.")

      // Switch to sign in tab after successful signup
      setTimeout(() => {
        setActiveTab("signin")
        // Clear form fields
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setFirstName("")
        setLastName("")
        setUserRole("user")
      }, 2000)
    } catch (error: any) {
      setError(error.message || "An error occurred during sign up")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className={cn("gap-1", className)}>
            <User className="h-4 w-4" />
            Sign In
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto border-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg">Welcome to TapLink</DialogTitle>
          <DialogDescription className="text-sm">Connect all your social profiles in one place.</DialogDescription>
        </DialogHeader>
        {error && <div className="bg-destructive/10 text-destructive text-xs p-2 rounded-md">{error}</div>}
        {success && <div className="bg-green-500/10 text-green-500 text-xs p-2 rounded-md">{success}</div>}
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="space-y-3 py-2">
            <form onSubmit={handleSignIn} className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email-signin" className="text-sm">
                  Email
                </Label>
                <Input
                  id="email-signin"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-signin" className="text-sm">
                    Password
                  </Label>
                  <Link href="#" className="text-xs text-primary hover:underline">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password-signin"
                    type={showSignInPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-9"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowSignInPassword(!showSignInPassword)}
                  >
                    {showSignInPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showSignInPassword ? "Hide password" : "Show password"}</span>
                  </button>
                </div>
              </div>
              <Button className="w-full h-9 mt-2" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup" className="space-y-3 py-2">
            <form onSubmit={handleSignUp} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="first-name" className="text-sm">
                    First name
                  </Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="last-name" className="text-sm">
                    Last name
                  </Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="h-9"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email-signup" className="text-sm">
                  Email
                </Label>
                <Input
                  id="email-signup"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password-signup" className="text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password-signup"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-9"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password" className="text-sm">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-9"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="user-role" className="text-sm">
                  Account Type
                </Label>
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="role-user"
                      name="role"
                      value="user"
                      checked={userRole === "user"}
                      onChange={() => setUserRole("user")}
                      className="h-4 w-4 text-primary"
                    />
                    <label htmlFor="role-user" className="ml-2 text-sm">
                      User
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="role-admin"
                      name="role"
                      value="admin"
                      checked={userRole === "admin"}
                      onChange={() => setUserRole("admin")}
                      className="h-4 w-4 text-primary"
                    />
                    <label htmlFor="role-admin" className="ml-2 text-sm">
                      Admin
                    </label>
                  </div>
                </div>
              </div>
              <Button className="w-full h-9 mt-2" type="submit" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
