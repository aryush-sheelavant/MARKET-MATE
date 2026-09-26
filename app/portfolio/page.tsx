"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  GraduationCap,
  FolderGit2,
  Award,
  FileText,
  Plus,
  Upload,
  ExternalLink,
  Github,
  Trash2,
  Edit,
  Calendar,
  Building2,
  CheckCircle,
  X,
} from "lucide-react"

interface Education {
  id: string
  degree: string
  major: string
  institution: string
  graduationYear: number
  gpa?: string
  transcriptUrl?: string
  certificateUrl?: string
}

interface Project {
  id: string
  title: string
  description: string
  role: string
  startDate: string
  endDate?: string
  projectUrl?: string
  githubUrl?: string
  demoUrl?: string
  imageUrls: string[]
  technologies: string[]
}

interface Certificate {
  id: string
  title: string
  issuingOrganization: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  skills: string[]
}

interface Resume {
  id: string
  fileName: string
  fileUrl: string
  isPrimary: boolean
  uploadedAt: Date
}

export default function PortfolioPage() {
  // Mock data - would be fetched from Supabase in production
  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      degree: "Bachelor's",
      major: "Marketing",
      institution: "Christ University, Bangalore",
      graduationYear: 2024,
      gpa: "8.5",
    },
  ])

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Social Media Campaign for Local Cafe",
      description:
        "Designed and executed a 3-month social media strategy that increased Instagram followers by 150% and drove 30% more foot traffic to the cafe.",
      role: "Social Media Manager",
      startDate: "2024-01",
      endDate: "2024-03",
      technologies: ["Instagram", "Canva", "Analytics", "Content Writing"],
      imageUrls: [],
    },
  ])

  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: "1",
      title: "Google Digital Marketing Fundamentals",
      issuingOrganization: "Google",
      issueDate: "2024-02",
      credentialUrl: "https://skillshop.credential.net/example",
      skills: ["SEO", "SEM", "Analytics"],
    },
  ])

  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: "1",
      fileName: "Priya_Sharma_Resume.pdf",
      fileUrl: "#",
      isPrimary: true,
      uploadedAt: new Date(),
    },
  ])

  const [showEducationDialog, setShowEducationDialog] = useState(false)
  const [showProjectDialog, setShowProjectDialog] = useState(false)
  const [showCertificateDialog, setShowCertificateDialog] = useState(false)

  const [newEducation, setNewEducation] = useState<Partial<Education>>({})
  const [newProject, setNewProject] = useState<Partial<Project>>({ technologies: [] })
  const [newCertificate, setNewCertificate] = useState<Partial<Certificate>>({ skills: [] })
  const [newTech, setNewTech] = useState("")
  const [newSkill, setNewSkill] = useState("")

  // Calculate portfolio completion
  const completionScore =
    [
      education.length > 0,
      projects.length > 0,
      certificates.length > 0,
      resumes.length > 0,
      education.some((e) => e.transcriptUrl),
    ].filter(Boolean).length * 20

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setEducation([...education, { ...newEducation, id: Date.now().toString() } as Education])
      setNewEducation({})
      setShowEducationDialog(false)
    }
  }

  const handleAddProject = () => {
    if (newProject.title) {
      setProjects([...projects, { ...newProject, id: Date.now().toString(), imageUrls: [] } as Project])
      setNewProject({ technologies: [] })
      setShowProjectDialog(false)
    }
  }

  const handleAddCertificate = () => {
    if (newCertificate.title && newCertificate.issuingOrganization) {
      setCertificates([...certificates, { ...newCertificate, id: Date.now().toString() } as Certificate])
      setNewCertificate({ skills: [] })
      setShowCertificateDialog(false)
    }
  }

  const handleDeleteEducation = (id: string) => {
    setEducation(education.filter((e) => e.id !== id))
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  const handleDeleteCertificate = (id: string) => {
    setCertificates(certificates.filter((c) => c.id !== id))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-secondary/20">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold sm:text-3xl">My Portfolio</h1>
            <p className="text-muted-foreground mt-1">
              Build a comprehensive portfolio to showcase your skills and experience to potential employers
            </p>
          </div>

          {/* Completion Progress */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-semibold">Portfolio Completion</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete your portfolio to increase visibility to merchants
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Progress value={completionScore} className="w-32" />
                  <span className="font-semibold">{completionScore}%</span>
                </div>
              </div>
              {completionScore < 100 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {education.length === 0 && <Badge variant="outline">Add education</Badge>}
                  {projects.length === 0 && <Badge variant="outline">Add a project</Badge>}
                  {certificates.length === 0 && <Badge variant="outline">Add certificates</Badge>}
                  {resumes.length === 0 && <Badge variant="outline">Upload resume</Badge>}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Portfolio Tabs */}
          <Tabs defaultValue="education" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="education" className="gap-2">
                <GraduationCap className="h-4 w-4 hidden sm:block" />
                Education
              </TabsTrigger>
              <TabsTrigger value="projects" className="gap-2">
                <FolderGit2 className="h-4 w-4 hidden sm:block" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="certificates" className="gap-2">
                <Award className="h-4 w-4 hidden sm:block" />
                Certificates
              </TabsTrigger>
              <TabsTrigger value="resume" className="gap-2">
                <FileText className="h-4 w-4 hidden sm:block" />
                Resume
              </TabsTrigger>
            </TabsList>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Academic Background</h2>
                  <p className="text-sm text-muted-foreground">
                    Add your educational qualifications and academic achievements
                  </p>
                </div>
                <Dialog open={showEducationDialog} onOpenChange={setShowEducationDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Education
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Add Education</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Degree Type</Label>
                          <Select
                            value={newEducation.degree}
                            onValueChange={(value) => setNewEducation({ ...newEducation, degree: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select degree" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                              <SelectItem value="Master's">Master's</SelectItem>
                              <SelectItem value="PhD">PhD</SelectItem>
                              <SelectItem value="Diploma">Diploma</SelectItem>
                              <SelectItem value="Certificate">Certificate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Major / Field of Study</Label>
                          <Input
                            placeholder="e.g., Marketing"
                            value={newEducation.major || ""}
                            onChange={(e) => setNewEducation({ ...newEducation, major: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Institution</Label>
                        <Input
                          placeholder="e.g., Christ University"
                          value={newEducation.institution || ""}
                          onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Graduation Year</Label>
                          <Input
                            type="number"
                            placeholder="2024"
                            value={newEducation.graduationYear || ""}
                            onChange={(e) =>
                              setNewEducation({ ...newEducation, graduationYear: Number.parseInt(e.target.value) })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>GPA (optional)</Label>
                          <Input
                            placeholder="e.g., 8.5"
                            value={newEducation.gpa || ""}
                            onChange={(e) => setNewEducation({ ...newEducation, gpa: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Upload Transcript (optional)</Label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground">PDF, PNG or JPG (max 10MB)</p>
                        </div>
                      </div>
                      <Button className="w-full" onClick={handleAddEducation}>
                        Add Education
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {education.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-1">No education added</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Add your educational qualifications to showcase to potential employers
                    </p>
                    <Button variant="outline" onClick={() => setShowEducationDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Education
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {education.map((edu) => (
                    <Card key={edu.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                              <GraduationCap className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {edu.degree} in {edu.major}
                              </h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {edu.institution}
                              </p>
                              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  Class of {edu.graduationYear}
                                </span>
                                {edu.gpa && <Badge variant="secondary">GPA: {edu.gpa}</Badge>}
                                {edu.transcriptUrl && (
                                  <Badge variant="outline" className="gap-1">
                                    <CheckCircle className="h-3 w-3" />
                                    Transcript Uploaded
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteEducation(edu.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Project Showcase</h2>
                  <p className="text-sm text-muted-foreground">Highlight your best work and accomplishments</p>
                </div>
                <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add Project</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Project Title</Label>
                        <Input
                          placeholder="e.g., Social Media Campaign for Local Cafe"
                          value={newProject.title || ""}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Your Role</Label>
                        <Input
                          placeholder="e.g., Social Media Manager"
                          value={newProject.role || ""}
                          onChange={(e) => setNewProject({ ...newProject, role: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Describe the project, your contributions, and the results..."
                          value={newProject.description || ""}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={newProject.startDate || ""}
                            onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date (optional)</Label>
                          <Input
                            type="month"
                            value={newProject.endDate || ""}
                            onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Technologies / Skills Used</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a skill"
                            value={newTech}
                            onChange={(e) => setNewTech(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && newTech.trim()) {
                                e.preventDefault()
                                setNewProject({
                                  ...newProject,
                                  technologies: [...(newProject.technologies || []), newTech.trim()],
                                })
                                setNewTech("")
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              if (newTech.trim()) {
                                setNewProject({
                                  ...newProject,
                                  technologies: [...(newProject.technologies || []), newTech.trim()],
                                })
                                setNewTech("")
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        {newProject.technologies && newProject.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {newProject.technologies.map((tech, index) => (
                              <Badge key={index} variant="secondary" className="gap-1">
                                {tech}
                                <X
                                  className="h-3 w-3 cursor-pointer"
                                  onClick={() =>
                                    setNewProject({
                                      ...newProject,
                                      technologies: newProject.technologies?.filter((_, i) => i !== index),
                                    })
                                  }
                                />
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Project URL (optional)</Label>
                          <Input
                            placeholder="https://..."
                            value={newProject.projectUrl || ""}
                            onChange={(e) => setNewProject({ ...newProject, projectUrl: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>GitHub URL (optional)</Label>
                          <Input
                            placeholder="https://github.com/..."
                            value={newProject.githubUrl || ""}
                            onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Project Images (optional)</Label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload images</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG (max 5MB each)</p>
                        </div>
                      </div>
                      <Button className="w-full" onClick={handleAddProject}>
                        Add Project
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {projects.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FolderGit2 className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-1">No projects added</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Showcase your best work to impress potential employers
                    </p>
                    <Button variant="outline" onClick={() => setShowProjectDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold">{project.title}</h3>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{project.role}</p>
                        <p className="text-xs text-muted-foreground mb-3">
                          {project.startDate} - {project.endDate || "Present"}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {project.projectUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-1 h-3 w-3" />
                                View
                              </a>
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-1 h-3 w-3" />
                                Code
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Certificates Tab */}
            <TabsContent value="certificates" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Certificates & Courses</h2>
                  <p className="text-sm text-muted-foreground">
                    Add certifications from online courses and professional training
                  </p>
                </div>
                <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Certificate
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Add Certificate</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Certificate Title</Label>
                        <Input
                          placeholder="e.g., Google Digital Marketing Fundamentals"
                          value={newCertificate.title || ""}
                          onChange={(e) => setNewCertificate({ ...newCertificate, title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Issuing Organization</Label>
                        <Input
                          placeholder="e.g., Google, Coursera, Udemy"
                          value={newCertificate.issuingOrganization || ""}
                          onChange={(e) =>
                            setNewCertificate({ ...newCertificate, issuingOrganization: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Issue Date</Label>
                          <Input
                            type="month"
                            value={newCertificate.issueDate || ""}
                            onChange={(e) => setNewCertificate({ ...newCertificate, issueDate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Expiry Date (optional)</Label>
                          <Input
                            type="month"
                            value={newCertificate.expiryDate || ""}
                            onChange={(e) => setNewCertificate({ ...newCertificate, expiryDate: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Credential ID (optional)</Label>
                          <Input
                            placeholder="e.g., ABC123XYZ"
                            value={newCertificate.credentialId || ""}
                            onChange={(e) => setNewCertificate({ ...newCertificate, credentialId: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Credential URL (optional)</Label>
                          <Input
                            placeholder="https://..."
                            value={newCertificate.credentialUrl || ""}
                            onChange={(e) => setNewCertificate({ ...newCertificate, credentialUrl: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Skills Gained</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a skill"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && newSkill.trim()) {
                                e.preventDefault()
                                setNewCertificate({
                                  ...newCertificate,
                                  skills: [...(newCertificate.skills || []), newSkill.trim()],
                                })
                                setNewSkill("")
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              if (newSkill.trim()) {
                                setNewCertificate({
                                  ...newCertificate,
                                  skills: [...(newCertificate.skills || []), newSkill.trim()],
                                })
                                setNewSkill("")
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        {newCertificate.skills && newCertificate.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {newCertificate.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="gap-1">
                                {skill}
                                <X
                                  className="h-3 w-3 cursor-pointer"
                                  onClick={() =>
                                    setNewCertificate({
                                      ...newCertificate,
                                      skills: newCertificate.skills?.filter((_, i) => i !== index),
                                    })
                                  }
                                />
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Upload Certificate (optional)</Label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload certificate</p>
                          <p className="text-xs text-muted-foreground">PDF, PNG or JPG (max 10MB)</p>
                        </div>
                      </div>
                      <Button className="w-full" onClick={handleAddCertificate}>
                        Add Certificate
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {certificates.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Award className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-1">No certificates added</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Add certifications to verify your skills and expertise
                    </p>
                    <Button variant="outline" onClick={() => setShowCertificateDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Certificate
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {certificates.map((cert) => (
                    <Card key={cert.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <Award className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{cert.title}</h3>
                              <p className="text-sm text-muted-foreground">{cert.issuingOrganization}</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDeleteCertificate(cert.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                          Issued: {cert.issueDate}
                          {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {cert.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        {cert.credentialUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 h-3 w-3" />
                              View Credential
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Resume Tab */}
            <TabsContent value="resume" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Resume / CV</h2>
                  <p className="text-sm text-muted-foreground">
                    Upload your latest resume for easy access by employers
                  </p>
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  {resumes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-1">No resume uploaded</h3>
                      <p className="text-sm text-muted-foreground text-center mb-4">
                        Upload your resume to make it easy for employers to review your qualifications
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {resumes.map((resume) => (
                        <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{resume.fileName}</p>
                              <p className="text-xs text-muted-foreground">
                                Uploaded {resume.uploadedAt.toLocaleDateString()}
                              </p>
                            </div>
                            {resume.isPrimary && <Badge>Primary</Badge>}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="mr-1 h-3 w-3" />
                              View
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                    <h3 className="font-semibold mb-1">Upload New Resume</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Drag and drop your resume here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">PDF format recommended (max 10MB)</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
