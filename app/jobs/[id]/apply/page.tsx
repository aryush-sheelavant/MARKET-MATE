"use client"

import type React from "react"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { useNotifications } from "@/components/notification-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { jobs } from "@/lib/data"
import {
  MapPin,
  Clock,
  CheckCircle2,
  Upload,
  Briefcase,
  Building2,
  IndianRupee,
  ArrowLeft,
  FileText,
  User,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

export default function ApplyPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const { addNotification } = useNotifications()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    coverLetter: "",
    resumeFile: null as File | null,
  })

  const job = jobs.find((j) => j.id === params.id)

  if (!job) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <Briefcase className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Job not found</h2>
            <p className="text-muted-foreground mt-2">This job listing may have been removed.</p>
            <Button asChild className="mt-4">
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(salary)
  }

  const getTimeAgo = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    return `${days} days ago`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setApplicationSubmitted(true)
    setIsSubmitting(false)

    addNotification({
      title: "Application Submitted!",
      message: `Your application for ${job.title} at ${job.company} has been submitted successfully.`,
      type: "success",
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, resumeFile: file })
    }
  }

  if (applicationSubmitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center px-4 py-12">
          <Card className="w-full max-w-lg text-center">
            <CardContent className="pt-8 pb-8">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Application Submitted!</h1>
              <p className="text-muted-foreground mb-6">
                Your application for <span className="font-medium text-foreground">{job.title}</span> at{" "}
                <span className="font-medium text-foreground">{job.company}</span> has been successfully submitted.
              </p>

              <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  What happens next?
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      1
                    </span>
                    The employer will review your application
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      2
                    </span>
                    You'll receive a notification about the status
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      3
                    </span>
                    If shortlisted, you'll be contacted for next steps
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="outline">
                  <Link href="/jobs">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Browse More Jobs
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/dashboard">
                    <User className="h-4 w-4 mr-2" />
                    View My Applications
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/jobs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Application Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Apply for this Position</CardTitle>
                  <CardDescription>
                    Fill out the form below to submit your application for {job.title} at {job.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        Personal Information
                      </h3>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="college">College/University *</Label>
                          <Input
                            id="college"
                            placeholder="Your college name"
                            value={formData.college}
                            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        Cover Letter
                      </h3>
                      <div className="space-y-2">
                        <Label htmlFor="coverLetter">Why are you a good fit for this role? *</Label>
                        <Textarea
                          id="coverLetter"
                          placeholder="Tell us about your relevant experience, skills, and why you're interested in this position..."
                          value={formData.coverLetter}
                          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                          rows={6}
                          required
                        />
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <Upload className="h-4 w-4 text-primary" />
                        Resume (Optional)
                      </h3>
                      <div className="space-y-2">
                        <Label htmlFor="resume">Upload your resume</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                          <input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <label htmlFor="resume" className="cursor-pointer">
                            {formData.resumeFile ? (
                              <div className="flex items-center justify-center gap-2 text-sm">
                                <FileText className="h-5 w-5 text-primary" />
                                <span className="font-medium">{formData.resumeFile.name}</span>
                              </div>
                            ) : (
                              <>
                                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX (max 5MB)</p>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Job Details Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={job.companyLogo || "/placeholder.svg"}
                      alt={job.company}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {job.company}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </Badge>
                    <Badge variant="outline">{job.type}</Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <IndianRupee className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{formatSalary(job.salary)}</span>
                    <span className="text-muted-foreground">
                      {job.salaryType === "month" ? "per month" : "per project"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Posted {getTimeAgo(job.postedAt)}
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">Job Description</h4>
                    <p className="text-sm text-muted-foreground">{job.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
