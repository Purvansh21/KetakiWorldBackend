"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AuthDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  // Login State
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  // Signup State
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [isSignupSubmitting, setIsSignupSubmitting] = useState(false)
  const [signupError, setSignupError] = useState<string | null>(null)

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null) // Clear previous errors
    setIsLoginSubmitting(true)

    try {
      // TODO: Replace with actual backend API call for login
      console.log("Login attempt with:", { email: loginEmail, password: loginPassword })
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Assuming success
      console.log("Login successful!")
      setOpen(false) // Close dialog on success
      // TODO: Add logic for successful login (e.g., redirect, set auth state)

    } catch (err) {
      // TODO: Handle API errors more specifically if needed
      console.error("Login failed:", err)
      setLoginError("Login failed. Please check your credentials.") // Generic error message
    } finally {
      setIsLoginSubmitting(false)
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError(null) // Clear previous errors
    setIsSignupSubmitting(true)

    try {
      // TODO: Replace with actual backend API call for signup
      console.log("Signup attempt with:", { name: signupName, email: signupEmail, password: signupPassword })
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Assuming success
      console.log("Signup successful!")
      setOpen(false) // Close dialog on success
      // TODO: Add logic for successful signup (e.g., auto-login, redirect)

    } catch (err) {
      // TODO: Handle API errors more specifically if needed
      console.error("Signup failed:", err)
      setSignupError("Signup failed. Please try again.") // Generic error message
    } finally {
      setIsSignupSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to Wonder Holidays</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
              </div>
              {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
              <Button type="submit" className="w-full" disabled={isLoginSubmitting}>
                {isLoginSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSignupSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="Enter your email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="Create a password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
              </div>
              {signupError && <p className="text-red-500 text-sm">{signupError}</p>}
              <Button type="submit" className="w-full" disabled={isSignupSubmitting}>
                {isSignupSubmitting ? 'Signing up...' : 'Sign Up'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 