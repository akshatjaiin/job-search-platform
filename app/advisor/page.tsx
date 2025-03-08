"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, FileUp, User, Bot, Paperclip, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
  jobSuggestions?: JobSuggestion[]
  skillGaps?: string[]
}

interface JobSuggestion {
  id: string
  title: string
  company: string
  match: number
  reasons: string[]
}

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm your AI Career Advisor. I can help you find job opportunities that match your skills and experience, identify skill gaps, and provide personalized career advice. You can also upload your resume for analysis.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (input.trim() === "" && !file) return

    const userMessage: Message = {
      role: "user",
      content: file ? `I'm uploading my resume: ${file.name}` : input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate AI response
      setTimeout(() => {
        let responseMessage: Message

        if (file) {
          responseMessage = {
            role: "assistant",
            content:
              "I've analyzed your resume and found some insights. Here are job recommendations based on your experience and skills:",
            timestamp: new Date(),
            jobSuggestions: [
              {
                id: "1",
                title: "Frontend Developer",
                company: "TechCorp",
                match: 85,
                reasons: [
                  "Your React experience matches the job requirements",
                  "You have projects demonstrating UI/UX skills",
                  "Your JavaScript proficiency is a strong match",
                ],
              },
              {
                id: "3",
                title: "Full Stack Developer",
                company: "WebSolutions",
                match: 78,
                reasons: [
                  "Your experience with both frontend and backend technologies",
                  "Project work shows ability to develop complete applications",
                  "Good match with required technical skills",
                ],
              },
            ],
            skillGaps: [
              "TypeScript - Consider learning this to enhance your JavaScript skills",
              "GraphQL - This is becoming popular for API development",
              "Testing frameworks like Jest or Cypress",
              "CI/CD experience would strengthen your profile",
            ],
          }
          setFile(null)
        } else if (input.toLowerCase().includes("job") || input.toLowerCase().includes("work")) {
          responseMessage = {
            role: "assistant",
            content: "Based on the current job market trends, here are some opportunities that might interest you:",
            timestamp: new Date(),
            jobSuggestions: [
              {
                id: "1",
                title: "Frontend Developer",
                company: "TechCorp",
                match: 92,
                reasons: ["High demand for React developers", "Entry-level friendly", "Good growth potential"],
              },
              {
                id: "5",
                title: "DevOps Engineer",
                company: "CloudTech",
                match: 78,
                reasons: ["Growing field", "Higher than average salary", "Good for technical problem solvers"],
              },
            ],
          }
        } else if (input.toLowerCase().includes("skill") || input.toLowerCase().includes("learn")) {
          responseMessage = {
            role: "assistant",
            content: "Here are some in-demand skills that can boost your employability as a fresh graduate:",
            timestamp: new Date(),
            skillGaps: [
              "React.js - The most popular frontend framework",
              "Node.js - For backend development",
              "Cloud services (AWS, Azure, or GCP)",
              "Data structures and algorithms",
              "Git and version control",
            ],
          }
        } else {
          responseMessage = {
            role: "assistant",
            content:
              "I'm here to help with your job search and career questions. You can ask me about job recommendations, skill development, resume tips, or upload your resume for personalized advice.",
            timestamp: new Date(),
          }
        }

        setMessages((prev) => [...prev, responseMessage])
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ])
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Career Advisor</h1>
        <p className="text-muted-foreground">
          Get personalized career guidance and job recommendations from our AI advisor
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Chat with Career Advisor</CardTitle>
            <CardDescription>
              Ask questions about jobs, skills, or upload your resume for personalized advice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] overflow-y-auto border rounded-md p-4 mb-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
                  <div
                    className={`flex ${message.role === "user" ? "flex-row-reverse" : "flex-row"} gap-3 max-w-[80%]`}
                  >
                    <Avatar className="h-8 w-8">
                      {message.role === "user" ? (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      {message.jobSuggestions && (
                        <div className="mt-3 space-y-3">
                          {message.jobSuggestions.map((job) => (
                            <Card key={job.id}>
                              <CardContent className="p-3">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium">{job.title}</h4>
                                    <p className="text-sm text-muted-foreground">{job.company}</p>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={
                                      job.match >= 80
                                        ? "bg-green-50 text-green-700"
                                        : job.match >= 60
                                          ? "bg-amber-50 text-amber-700"
                                          : "bg-gray-50"
                                    }
                                  >
                                    {job.match}% Match
                                  </Badge>
                                </div>
                                <div className="mt-2">
                                  <p className="text-xs font-medium mb-1">Why this is a good match:</p>
                                  <ul className="text-xs space-y-1">
                                    {job.reasons.map((reason, i) => (
                                      <li key={i} className="flex items-start">
                                        <span className="text-green-500 mr-1">✓</span>
                                        {reason}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="mt-2 flex justify-end">
                                  <Button size="sm" asChild>
                                    <Link href={`/jobs/${job.id}`}>View Job</Link>
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      {message.skillGaps && (
                        <div className="mt-3">
                          <p className="text-xs font-medium mb-2">Skills to develop:</p>
                          <div className="space-y-1">
                            {message.skillGaps.map((skill, i) => (
                              <div key={i} className="flex items-start">
                                <span className="text-amber-500 mr-1 text-xs">•</span>
                                <p className="text-xs">{skill}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-2 flex justify-end">
                            <Button size="sm" variant="outline" asChild>
                              <Link href="/ai">Learn Skills</Link>
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="flex flex-row gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-muted">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => document.getElementById("resume-upload")?.click()}
                className="shrink-0"
              >
                <Paperclip className="h-5 w-5" />
                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </Button>
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button onClick={handleSend} disabled={isLoading} className="shrink-0">
                <Send className="h-5 w-5" />
              </Button>
            </div>
            {file && (
              <div className="mt-2 p-2 bg-muted rounded-md flex items-center justify-between">
                <div className="flex items-center">
                  <FileUp className="h-4 w-4 mr-2" />
                  <span className="text-sm truncate">{file.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setFile(null)} className="h-6 w-6 p-0 rounded-full">
                  &times;
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggested Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => {
                  setInput("What jobs are suitable for a fresh graduate in computer science?")
                  handleSend()
                }}
              >
                Jobs for CS graduates
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => {
                  setInput("What skills should I learn to become a frontend developer?")
                  handleSend()
                }}
              >
                Skills for frontend dev
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => {
                  setInput("How can I prepare for technical interviews?")
                  handleSend()
                }}
              >
                Technical interview prep
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => {
                  setInput("What should I include in my portfolio?")
                  handleSend()
                }}
              >
                Portfolio advice
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => {
                  setInput("How to network effectively as a job seeker?")
                  handleSend()
                }}
              >
                Networking tips
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

