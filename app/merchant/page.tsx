"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { jobs, reviews } from "@/lib/data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Briefcase, Users, Star, Plus, MapPin, Clock, CheckCircle, XCircle, MessageCircle } from "lucide-react"
import Link from "next/link"

interface Application {
  id: string
  studentId: string
  studentName: string
  studentAvatar: string
  jobTitle: string
  appliedAt: Date
  status: "pending" | "accepted" | "rejected"
}

export default function MerchantDashboard() {
  const { t } = useLanguage()
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      studentId: "1",
      studentName: "Priya Sharma",
      studentAvatar: "/indian-female-student-portrait.png",
      jobTitle: "Social Media Manager",
      appliedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: "pending",
    },
    {
      id: "2",
      studentId: "2",
      studentName: "Rahul Gowda",
      studentAvatar: "/indian-male-student-portrait.png",
      jobTitle: "Content Creator",
      appliedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: "pending",
    },
    {
      id: "3",
      studentId: "3",
      studentName: "Ananya Reddy",
      studentAvatar: "/indian-female-student-smiling.png",
      jobTitle: "Digital Marketing Intern",
      appliedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
      status: "accepted",
    },
  ])

  const [showPostJob, setShowPostJob] = useState(false)
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState("")
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    type: "hybrid",
    salary: "",
    salaryType: "month",
    skills: "",
    category: "Social Media",
  })

  const stats = [
    { label: "Active Jobs", value: jobs.length, icon: Briefcase, change: "+2 this week" },
    { label: "Applications", value: applications.length, icon: Users, change: "+5 today" },
    { label: "Hired Students", value: 8, icon: CheckCircle, change: "+1 this month" },
    { label: "Avg. Rating Given", value: "4.7", icon: Star, change: "12 reviews" },
  ]

  const handleAcceptApplication = (id: string) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: "accepted" } : app)))
  }

  const handleRejectApplication = (id: string) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: "rejected" } : app)))
  }

  const handlePostJob = () => {
    console.log("Posting job:", newJob)
    setShowPostJob(false)
    setNewJob({
      title: "",
      description: "",
      location: "",
      type: "hybrid",
      salary: "",
      salaryType: "month",
      skills: "",
      category: "Social Media",
    })
  }

  const handleSubmitReview = () => {
    console.log("Submitting review:", { studentId: selectedStudent, rating: reviewRating, comment: reviewComment })
    setShowReviewDialog(false)
    setSelectedStudent(null)
    setReviewRating(5)
    setReviewComment("")
  }

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60))
    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(salary)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{t("dashboard")}</h1>
              <p className="text-muted-foreground">Welcome back, TechStart Cafe</p>
            </div>
            <Dialog open={showPostJob} onOpenChange={setShowPostJob}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Post New Job
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Post a New Job</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Social Media Manager"
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the role and responsibilities..."
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="e.g., Bangalore"
                        value={newJob.location}
                        onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Job Type</Label>
                      <Select
                        value={newJob.type}
                        onValueChange={(value) =>
                          setNewJob({ ...newJob, type: value as "remote" | "onsite" | "hybrid" })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="onsite">On-site</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="salary">Salary (INR)</Label>
                      <Input
                        id="salary"
                        type="number"
                        placeholder="e.g., 15000"
                        value={newJob.salary}
                        onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Payment Type</Label>
                      <Select
                        value={newJob.salaryType}
                        onValueChange={(value) => setNewJob({ ...newJob, salaryType: value as "month" | "project" })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="month">Per Month</SelectItem>
                          <SelectItem value="project">Per Project</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={newJob.category}
                      onValueChange={(value) => setNewJob({ ...newJob, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Social Media">Social Media</SelectItem>
                        <SelectItem value="Content Creation">Content Creation</SelectItem>
                        <SelectItem value="Digital Advertising">Digital Advertising</SelectItem>
                        <SelectItem value="Field Marketing">Field Marketing</SelectItem>
                        <SelectItem value="Video Production">Video Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skills">Required Skills (comma separated)</Label>
                    <Input
                      id="skills"
                      placeholder="e.g., Instagram, Canva, Content Writing"
                      value={newJob.skills}
                      onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                    />
                  </div>
                  <Button className="w-full" onClick={handlePostJob}>
                    Post Job
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="applications" className="space-y-6">
            <TabsList>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="jobs">My Jobs</TabsTrigger>
              <TabsTrigger value="reviews">{t("reviews")}</TabsTrigger>
            </TabsList>

            {/* Applications Tab */}
            <TabsContent value="applications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <div
                        key={application.id}
                        className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={application.studentAvatar || "/placeholder.svg"} />
                            <AvatarFallback>{application.studentName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{application.studentName}</p>
                            <p className="text-sm text-muted-foreground">Applied for: {application.jobTitle}</p>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatTimeAgo(application.appliedAt)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {application.status === "pending" ? (
                            <>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/chat/${application.studentId}`}>
                                  <MessageCircle className="mr-1 h-4 w-4" />
                                  Chat
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive bg-transparent"
                                onClick={() => handleRejectApplication(application.id)}
                              >
                                <XCircle className="mr-1 h-4 w-4" />
                                Reject
                              </Button>
                              <Button size="sm" onClick={() => handleAcceptApplication(application.id)}>
                                <CheckCircle className="mr-1 h-4 w-4" />
                                Accept
                              </Button>
                            </>
                          ) : (
                            <>
                              <Badge
                                variant={application.status === "accepted" ? "default" : "destructive"}
                                className={application.status === "accepted" ? "bg-success" : ""}
                              >
                                {application.status === "accepted" ? t("accepted") : t("rejected")}
                              </Badge>
                              {application.status === "accepted" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedStudent(application.studentId)
                                    setShowReviewDialog(true)
                                  }}
                                >
                                  <Star className="mr-1 h-4 w-4" />
                                  {t("writeReview")}
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Jobs Tab */}
            <TabsContent value="jobs" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {jobs.slice(0, 4).map((job) => (
                  <Card key={job.id}>
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </div>
                        </div>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">{formatSalary(job.salary)}</span>
                        <span className="text-xs text-muted-foreground">3 applicants</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reviews Given</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="rounded-lg border border-border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="font-medium">{review.studentName}</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {review.createdAt.toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Review Dialog */}
          <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("writeReview")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button key={i} type="button" onClick={() => setReviewRating(i + 1)} className="p-1">
                        <Star
                          className={`h-6 w-6 ${i < reviewRating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment">Comment</Label>
                  <Textarea
                    id="comment"
                    placeholder="Share your experience working with this student..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleSubmitReview}>
                  {t("submitReview")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>

      <Footer />
    </div>
  )
}
