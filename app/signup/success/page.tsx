import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function SignupSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center bg-secondary/20 p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Check your email!</CardTitle>
            <CardDescription>We've sent you a confirmation link to verify your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Click the link in your email to complete your registration and start using MARKETMATE.
            </p>
            <p className="text-sm text-muted-foreground">
              Already confirmed?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Login here
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
