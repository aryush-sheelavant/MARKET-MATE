"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"

export default function SignupPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    college: "",
    skills: "",
  })
  const [businessData, setBusinessData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    description: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleStudentSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    // Password confirmation check
    if (studentData.password !== studentData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (studentData.password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    console.log("[v0] Attempting student signup with email:", studentData.email)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: studentData.email,
        password: studentData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/jobs`,
          data: {
            full_name: studentData.name,
            user_type: "student",
            college: studentData.college,
            skills: studentData.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          },
        },
      })

      console.log("[v0] Signup response:", { data, error })

      if (error) throw error
      router.push("/signup/success")
    } catch (err) {
      console.log("[v0] Signup error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during signup")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBusinessSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    // Password confirmation check
    if (businessData.password !== businessData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (businessData.password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    console.log("[v0] Attempting business signup with email:", businessData.email)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: businessData.email,
        password: businessData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/merchant`,
          data: {
            full_name: businessData.name,
            user_type: "business",
            business_name: businessData.businessName,
            business_description: businessData.description,
          },
        },
      })

      console.log("[v0] Signup response:", { data, error })

      if (error) throw error
      router.push("/signup/success")
    } catch (err) {
      console.log("[v0] Signup error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during signup")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center bg-secondary/20 p-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">M</span>
            </div>
            <CardTitle className="text-2xl">{t("signup")}</CardTitle>
            <CardDescription>Join MARKETMATE today</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <form onSubmit={handleStudentSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-name">Full Name</Label>
                    <Input
                      id="student-name"
                      placeholder="Your name"
                      required
                      value={studentData.name}
                      onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="student@college.edu"
                      required
                      value={studentData.email}
                      onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      required
                      value={studentData.password}
                      onChange={(e) => setStudentData({ ...studentData, password: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-confirm-password">Confirm Password</Label>
                    <Input
                      id="student-confirm-password"
                      type="password"
                      required
                      value={studentData.confirmPassword}
                      onChange={(e) => setStudentData({ ...studentData, confirmPassword: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-college">College/University</Label>
                    <Input
                      id="student-college"
                      placeholder="Your college name"
                      value={studentData.college}
                      onChange={(e) => setStudentData({ ...studentData, college: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-skills">Skills (comma separated)</Label>
                    <Input
                      id="student-skills"
                      placeholder="e.g., Social Media, Content Writing"
                      value={studentData.skills}
                      onChange={(e) => setStudentData({ ...studentData, skills: e.target.value })}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Student Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="business">
                <form onSubmit={handleBusinessSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Contact Name</Label>
                    <Input
                      id="business-name"
                      placeholder="Your name"
                      required
                      value={businessData.name}
                      onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-email">Business Email</Label>
                    <Input
                      id="business-email"
                      type="email"
                      placeholder="contact@business.com"
                      required
                      value={businessData.email}
                      onChange={(e) => setBusinessData({ ...businessData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-password">Password</Label>
                    <Input
                      id="business-password"
                      type="password"
                      required
                      value={businessData.password}
                      onChange={(e) => setBusinessData({ ...businessData, password: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-confirm-password">Confirm Password</Label>
                    <Input
                      id="business-confirm-password"
                      type="password"
                      required
                      value={businessData.confirmPassword}
                      onChange={(e) => setBusinessData({ ...businessData, confirmPassword: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-businessName">Business Name</Label>
                    <Input
                      id="business-businessName"
                      placeholder="Your business name"
                      required
                      value={businessData.businessName}
                      onChange={(e) => setBusinessData({ ...businessData, businessName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-description">Business Description</Label>
                    <Textarea
                      id="business-description"
                      placeholder="Tell us about your business..."
                      value={businessData.description}
                      onChange={(e) => setBusinessData({ ...businessData, description: e.target.value })}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Business Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                {t("login")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
