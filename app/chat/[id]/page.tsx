"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { students } from "@/lib/data"
import { Send, Paperclip, Star, CheckCircle } from "lucide-react"

interface Message {
  id: string
  sender: "user" | "student"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const student = students.find((s) => s.id === params.id)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initial welcome message
  useEffect(() => {
    if (student && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        sender: "student",
        content: `Hello! I'm ${student.name}. Thank you for reaching out! How can I help you with your marketing needs?`,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [student, messages.length])

  if (!student) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header showBack onBack={() => router.push("/students")} />
        <main className="flex flex-1 items-center justify-center">
          <p>Student not found</p>
        </main>
      </div>
    )
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate student response
    setTimeout(() => {
      const responses = [
        "That sounds like a great project! I'd love to help you with that.",
        "I have experience with similar work. Let me share some ideas.",
        "I can definitely help. When would you like to start?",
        "That's within my skill set. Would you like to discuss the details?",
        "I'm available and excited about this opportunity!",
      ]

      const studentMessage: Message = {
        id: Date.now().toString(),
        sender: "student",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, studentMessage])
    }, 1500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex min-h-screen flex-col bg-secondary/20">
      <Header showBack onBack={() => router.push("/students")} />

      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
          {/* Student Info Header */}
          <div className="border-b border-border bg-background p-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                <AvatarFallback>{student.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold">{student.name}</h1>
                  {student.verified && <CheckCircle className="h-4 w-4 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">{student.college}</p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  {student.rating}
                </Badge>
                <Badge variant="outline">{student.completedJobs} jobs</Badge>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex max-w-[80%] gap-2 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      {message.sender === "student" ? (
                        <>
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback>{student.name[0]}</AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="/cafe-logo.png" alt="You" />
                          <AvatarFallback>You</AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div>
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-background border border-border"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p
                        className={`mt-1 text-xs text-muted-foreground ${message.sender === "user" ? "text-right" : "text-left"}`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-border bg-background p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder={t("typeMessage")}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="shrink-0">
                <Send className="h-4 w-4 mr-2" />
                {t("send")}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
