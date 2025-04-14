"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { User } from "lucide-react"

import { cn } from "@/lib/utils"
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
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<string>(type)

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
      <DialogContent className="sm:max-w-[425px] border-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <DialogHeader>
          <DialogTitle>Welcome to TapLink</DialogTitle>
          <DialogDescription>Connect all your social profiles in one place and share them instantly.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email-signin">Email</Label>
              <Input id="email-signin" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password-signin">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password-signin" type="password" />
            </div>
            <Button className="w-full">Sign In</Button>
          </TabsContent>
          <TabsContent value="signup" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-signup">Email</Label>
              <Input id="email-signup" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-signup">Password</Label>
              <Input id="password-signup" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button className="w-full">Create Account</Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
