"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user) {
        const { data: profile } = await supabase.from("profiles").select("user_type").eq("id", session.user.id).single()

        if (profile?.user_type === "business") {
          window.location.href = "/merchant"
        } else {
          window.location.href = "/jobs"
        }
      }
    }
    checkSession()
  }, [])

  const handleLogin = async (e: React.FormEvent, type: string) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      console.log("[v0] Attempting login with email:", email)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("[v0] Login response:", { user: data.user?.email, error })

      if (error) throw error

      // Give Supabase time to set the session cookie
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Verify session was set
      const {
        data: { session },
      } = await supabase.auth.getSession()
      console.log("[v0] Session after login:", { session: session?.user?.email })

      // Check user type from profile and redirect accordingly
      const { data: profile } = await supabase.from("profiles").select("user_type").eq("id", data.user.id).single()

      console.log("[v0] Profile fetch:", { profile })

      if (profile?.user_type === "business" || type === "business") {
        window.location.href = "/merchant"
      } else {
        window.location.href = "/jobs"
      }
    } catch (err) {
      console.log("[v0] Login error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during login")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center bg-secondary/20 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">M</span>
            </div>
            <CardTitle className="text-2xl">{t("login")}</CardTitle>
            <CardDescription>Welcome back to MARKETMATE</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <form onSubmit={(e) => handleLogin(e, "student")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="student@college.edu"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login as Student"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="business">
                <form onSubmit={(e) => handleLogin(e, "business")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-email">Business Email</Label>
                    <Input
                      id="business-email"
                      type="email"
                      placeholder="contact@business.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-password">Password</Label>
                    <Input
                      id="business-password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login as Business"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                {t("signup")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
