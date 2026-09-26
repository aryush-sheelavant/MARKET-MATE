"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLanguage } from "./language-provider"
import { useLocation } from "./location-provider"
import { jobs, students } from "@/lib/data"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
  jobCards?: typeof jobs
  studentCards?: typeof students
}

const quickActions = [
  { label: "Find jobs near me", icon: MapPin },
  { label: "Show remote jobs", icon: Briefcase },
  { label: "Top rated students", icon: GraduationCap },
  { label: "How to apply?", icon: Sparkles },
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()
  const { city } = useLocation()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: city
          ? `Hello! I'm MarketMate AI, your personal assistant. I see you're in ${city}! How can I help you find the perfect marketing opportunity today?`
          : `Hello! I'm MarketMate AI, your personal assistant. I can help you find jobs, connect with students, or answer any questions about our platform. What would you like to do?`,
        timestamp: new Date(),
        suggestions: ["Find jobs near me", "Show all remote jobs", "Browse top students", "How does it work?"],
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length, city])

  const processUserMessage = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase()

    // Job search queries
    if (lowerInput.includes("job") || lowerInput.includes("work") || lowerInput.includes("opportunity")) {
      if (lowerInput.includes("remote")) {
        const remoteJobs = jobs.filter((j) => j.type === "remote")
        return {
          id: Date.now().toString(),
          role: "assistant",
          content: `I found ${remoteJobs.length} remote jobs for you! Here are some great opportunities you can do from anywhere:`,
          timestamp: new Date(),
          jobCards: remoteJobs.slice(0, 3),
          suggestions: ["Show more remote jobs", "Jobs in Bangalore", "Highest paying jobs"],
        }
      }

      if (
        lowerInput.includes("near") ||
        lowerInput.includes("local") ||
        (city && lowerInput.includes(city.toLowerCase()))
      ) {
        const localJobs = city
          ? jobs.filter((j) => j.location.toLowerCase() === city.toLowerCase() || j.type === "remote")
          : jobs
        return {
          id: Date.now().toString(),
          role: "assistant",
          content: city
            ? `Here are ${localJobs.length} jobs available in ${city} and remote positions:`
            : `Here are some jobs available in your area. Enable location for more accurate results!`,
          timestamp: new Date(),
          jobCards: localJobs.slice(0, 3),
          suggestions: ["Show all jobs", "Remote only", "How to apply?"],
        }
      }

      if (lowerInput.includes("social media")) {
        const socialJobs = jobs.filter((j) => j.category === "Social Media")
        return {
          id: Date.now().toString(),
          role: "assistant",
          content: `Found ${socialJobs.length} social media marketing jobs! Perfect for building your online presence skills:`,
          timestamp: new Date(),
          jobCards: socialJobs.slice(0, 3),
          suggestions: ["Content creation jobs", "Video editing jobs", "All marketing jobs"],
        }
      }

      if (lowerInput.includes("video") || lowerInput.includes("editing")) {
        const videoJobs = jobs.filter((j) => j.category === "Video Production")
        return {
          id: Date.now().toString(),
          role: "assistant",
          content: `Here are ${videoJobs.length} video production opportunities:`,
          timestamp: new Date(),
          jobCards: videoJobs.slice(0, 3),
          suggestions: ["Content creation jobs", "Social media jobs", "All jobs"],
        }
      }

      if (lowerInput.includes("bangalore") || lowerInput.includes("bengaluru")) {
        const bangaloreJobs = jobs.filter((j) => j.location.toLowerCase() === "bangalore")
        return {
          id: Date.now().toString(),
          role: "assistant",
          content: `Found ${bangaloreJobs.length} jobs in Bangalore! Here are the top opportunities:`,
          timestamp: new Date(),
          jobCards: bangaloreJobs.slice(0, 3),
          suggestions: ["Remote jobs", "Jobs in Mysore", "All jobs"],
        }
      }

      if (lowerInput.includes("highest") || lowerInput.includes("best pay") || lowerInput.includes("salary")) {
        const sortedJobs = [...jobs].sort((a, b) => b.salary - a.salary)
        return {
          id: Date.now().toString(),
          role: "assistant",
          content: "Here are the highest paying jobs on our platform:",
          timestamp: new Date(),
          jobCards: sortedJobs.slice(0, 3),
          suggestions: ["Entry level jobs", "Remote jobs", "Part time jobs"],
        }
      }

      // Default job response
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `We have ${jobs.length} exciting marketing opportunities available! Here are some popular ones:`,
        timestamp: new Date(),
        jobCards: jobs.slice(0, 3),
        suggestions: ["Remote jobs", "Jobs near me", "Filter by category"],
      }
    }

    // Student queries
    if (lowerInput.includes("student") || lowerInput.includes("talent") || lowerInput.includes("hire")) {
      if (lowerInput.includes("top") || lowerInput.includes("best") || lowerInput.includes("rated")) {
        const topStudents = [...students].sort((a, b) => b.rating - a.rating)
        return {
          id: Date.now().toString(),
          role: "assistant",
          content: "Here are our top-rated marketing students with proven track records:",
          timestamp: new Date(),
          studentCards: topStudents.slice(0, 3),
          suggestions: ["Students with video skills", "Social media experts", "View all students"],
        }
      }

      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `We have ${students.length} talented students ready to help with your marketing needs! Here are some featured profiles:`,
        timestamp: new Date(),
        studentCards: students.slice(0, 3),
        suggestions: ["Top rated students", "Filter by skills", "How to hire?"],
      }
    }

    // How it works
    if (
      lowerInput.includes("how") &&
      (lowerInput.includes("work") || lowerInput.includes("apply") || lowerInput.includes("start"))
    ) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `Here's how MarketMate works:\n\n**For Students:**\n1. Create your profile with skills and portfolio\n2. Browse available jobs or get matched\n3. Apply with one click and chat with businesses\n4. Complete projects and get paid in INR\n\n**For Businesses:**\n1. Post your marketing needs\n2. Review applications from verified students\n3. Chat and discuss project details\n4. Pay securely through our platform\n\nWould you like to get started?`,
        timestamp: new Date(),
        suggestions: ["Create account", "Browse jobs", "Find students", "Contact support"],
      }
    }

    // Location queries
    if (lowerInput.includes("location") || lowerInput.includes("where") || lowerInput.includes("city")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: city
          ? `You're currently set to ${city}. I'm showing you jobs and opportunities in your area first. Would you like to change your location or see remote opportunities?`
          : `I don't have your location yet. Enable location services to see jobs near you, or you can manually select a city like Bangalore or Mysore.`,
        timestamp: new Date(),
        suggestions: ["Set location to Bangalore", "Set location to Mysore", "Show remote only"],
      }
    }

    // Greetings
    if (
      lowerInput.includes("hello") ||
      lowerInput.includes("hi") ||
      lowerInput.includes("hey") ||
      lowerInput.includes("namaste")
    ) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content:
          language === "kn"
            ? `ನಮಸ್ಕಾರ! MarketMate ಗೆ ಸ್ವಾಗತ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?`
            : `Hello! Welcome to MarketMate. I'm here to help you find the perfect marketing opportunity or talent. What are you looking for today?`,
        timestamp: new Date(),
        suggestions: ["Find jobs", "Browse students", "How it works", "Contact support"],
      }
    }

    // Thank you
    if (lowerInput.includes("thank") || lowerInput.includes("thanks")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "You're welcome! Is there anything else I can help you with? Feel free to ask about jobs, students, or how our platform works.",
        timestamp: new Date(),
        suggestions: ["Find more jobs", "Browse students", "That's all, thanks!"],
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      role: "assistant",
      content:
        "I'd be happy to help! I can assist you with:\n\n• Finding marketing jobs (remote, local, by category)\n• Discovering talented students for your business\n• Understanding how MarketMate works\n• Setting your location for better results\n\nWhat would you like to explore?",
      timestamp: new Date(),
      suggestions: ["Browse all jobs", "View top students", "How to get started?"],
    }
  }

  const handleSend = (messageText?: string) => {
    const text = messageText || input
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      const response = processUserMessage(text)
      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 800)
  }

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(salary)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all hover:scale-110 ${isOpen ? "hidden" : "flex"}`}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open chat assistant</span>
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] shadow-2xl border-primary/20 overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary-foreground/20">
                  <AvatarFallback className="bg-primary-foreground text-primary">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base font-semibold">MarketMate AI</CardTitle>
                  <p className="text-xs text-primary-foreground/80">Always here to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Messages Area */}
            <ScrollArea className="h-[350px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback
                          className={message.role === "user" ? "bg-secondary" : "bg-primary text-primary-foreground"}
                        >
                          {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                      </div>
                    </div>

                    {/* Job Cards */}
                    {message.jobCards && message.jobCards.length > 0 && (
                      <div className="mt-3 ml-10 space-y-2">
                        {message.jobCards.map((job) => (
                          <Link key={job.id} href={`/jobs/${job.id}/apply`}>
                            <div className="rounded-lg border bg-background p-3 hover:border-primary/50 transition-colors cursor-pointer">
                              <div className="flex items-start gap-2">
                                <img
                                  src={job.companyLogo || "/placeholder.svg"}
                                  alt=""
                                  className="h-8 w-8 rounded object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm truncate">{job.title}</h4>
                                  <p className="text-xs text-muted-foreground">{job.company}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                      <MapPin className="h-2.5 w-2.5 mr-0.5" />
                                      {job.location}
                                    </Badge>
                                    <span className="text-xs font-medium text-primary">{formatSalary(job.salary)}</span>
                                  </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </Link>
                        ))}
                        <Link href="/jobs" className="block">
                          <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                            View all jobs
                          </Button>
                        </Link>
                      </div>
                    )}

                    {/* Student Cards */}
                    {message.studentCards && message.studentCards.length > 0 && (
                      <div className="mt-3 ml-10 space-y-2">
                        {message.studentCards.map((student) => (
                          <Link key={student.id} href={`/chat/${student.id}`}>
                            <div className="rounded-lg border bg-background p-3 hover:border-primary/50 transition-colors cursor-pointer">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{student.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm truncate">{student.name}</h4>
                                  <p className="text-xs text-muted-foreground truncate">{student.college}</p>
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <span className="text-xs text-primary">★ {student.rating}</span>
                                    <span className="text-xs text-muted-foreground">
                                      • {student.completedJobs} jobs
                                    </span>
                                  </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </Link>
                        ))}
                        <Link href="/students" className="block">
                          <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                            View all students
                          </Button>
                        </Link>
                      </div>
                    )}

                    {/* Quick Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 ml-10 flex flex-wrap gap-1.5">
                        {message.suggestions.map((suggestion, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs px-2.5 bg-transparent"
                            onClick={() => handleSend(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-secondary rounded-2xl px-4 py-2">
                      <div className="flex gap-1">
                        <span
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Actions (shown only when no messages besides welcome) */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="justify-start gap-2 h-9 text-xs bg-transparent"
                      onClick={() => handleSend(action.label)}
                    >
                      <action.icon className="h-3.5 w-3.5" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t p-3">
              <div className="flex gap-2">
                <Input
                  placeholder={t("typeMessage")}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button onClick={() => handleSend()} disabled={!input.trim()} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
