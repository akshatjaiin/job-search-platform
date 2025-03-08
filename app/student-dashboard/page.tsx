"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, Clock, Calendar, BookOpen, Award } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Track your learning progress, job search activities, and career development
        </p>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="roadmap">Career Roadmap</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="progress">Learning Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>Your learning and job search activity for the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end justify-between">
                    {weeklyActivity.map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="flex space-x-1">
                          <div
                            className="bg-primary/80 rounded-t-sm w-5"
                            style={{ height: `${day.learning * 3}px` }}
                            title={`${day.learning} learning minutes`}
                          ></div>
                          <div
                            className="bg-primary/40 rounded-t-sm w-5"
                            style={{ height: `${day.jobSearch * 3}px` }}
                            title={`${day.jobSearch} job search minutes`}
                          ></div>
                        </div>
                        <span className="text-xs mt-2">{day.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4 space-x-6">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary/80 rounded-sm mr-2"></div>
                      <span className="text-sm">Learning</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary/40 rounded-sm mr-2"></div>
                      <span className="text-sm">Job Search</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Interviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {upcomingInterviews.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingInterviews.map((interview, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                            <div>
                              <p className="font-medium">{interview.company}</p>
                              <p className="text-sm text-muted-foreground">{interview.position}</p>
                              <div className="flex items-center mt-1 text-sm">
                                <Calendar className="h-3 w-3 mr-1" />
                                {interview.date}
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Prepare
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <Calendar className="h-10 w-10 mx-auto mb-2 opacity-20" />
                        <p>No upcoming interviews</p>
                        <Button variant="link" size="sm" asChild>
                          <Link href="/jobs">Apply to jobs</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skills Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skillsProgress.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                          </div>
                          <Progress value={skill.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/assessments">Take Skill Assessments</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold">{jobApplicationStats.total}</p>
                      <p className="text-sm text-muted-foreground">Total Applications</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold">{jobApplicationStats.interviews}</p>
                      <p className="text-sm text-muted-foreground">Interviews</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Application to Interview Rate</span>
                      <span className="font-medium">{jobApplicationStats.interviewRate}%</span>
                    </div>
                    <Progress value={jobApplicationStats.interviewRate} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full" asChild>
                    <Link href="/jobs">Find More Jobs</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Today's Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaysTasks.map((task, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Checkbox id={`task-${index}`} checked={task.completed} />
                        <div className="grid gap-1.5">
                          <Label
                            htmlFor={`task-${index}`}
                            className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {task.title}
                          </Label>
                          {task.dueTime && (
                            <p className="text-xs text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {task.dueTime}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/student-dashboard?tab=tasks">View All Tasks</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="roadmap">
          <Card>
            <CardHeader>
              <CardTitle>Frontend Developer Career Roadmap</CardTitle>
              <CardDescription>A step-by-step guide to becoming a frontend developer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-muted pl-6 pb-6 space-y-6">
                {careerRoadmap.map((stage, index) => (
                  <div key={index} className="relative">
                    <div
                      className={`absolute -left-8 p-1 rounded-full ${stage.completed ? "bg-green-500" : "bg-muted"}`}
                    >
                      {stage.completed ? <CheckCircle className="h-4 w-4 text-white" /> : <div className="h-4 w-4" />}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">{stage.title}</h3>
                      <p className="text-muted-foreground">{stage.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {stage.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant={skill.learned ? "default" : "outline"}>
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={stage.resourceLink}>View Resources</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Task Manager</CardTitle>
              <CardDescription>Organize your job search and learning activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="todo">
                <TabsList className="mb-4">
                  <TabsTrigger value="todo">To Do</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="todo">
                  <div className="space-y-4">
                    {allTasks
                      .filter((task) => task.status === "todo")
                      .map((task, index) => (
                        <div key={index} className="flex items-start space-x-2 p-3 border rounded-md">
                          <Checkbox id={`todo-task-${index}`} />
                          <div className="grid gap-1.5 flex-1">
                            <div className="flex justify-between">
                              <Label htmlFor={`todo-task-${index}`} className="text-sm font-medium">
                                {task.title}
                              </Label>
                              <Badge variant="outline">{task.category}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{task.description}</p>
                            {task.dueDate && (
                              <p className="text-xs text-muted-foreground flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                Due: {task.dueDate}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="in-progress">
                  <div className="space-y-4">
                    {allTasks
                      .filter((task) => task.status === "in-progress")
                      .map((task, index) => (
                        <div key={index} className="flex items-start space-x-2 p-3 border rounded-md">
                          <Checkbox id={`in-progress-task-${index}`} />
                          <div className="grid gap-1.5 flex-1">
                            <div className="flex justify-between">
                              <Label htmlFor={`in-progress-task-${index}`} className="text-sm font-medium">
                                {task.title}
                              </Label>
                              <Badge variant="outline">{task.category}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{task.description}</p>
                            {task.dueDate && (
                              <p className="text-xs text-muted-foreground flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                Due: {task.dueDate}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="completed">
                  <div className="space-y-4">
                    {allTasks
                      .filter((task) => task.status === "completed")
                      .map((task, index) => (
                        <div key={index} className="flex items-start space-x-2 p-3 border rounded-md bg-muted/20">
                          <Checkbox id={`completed-task-${index}`} checked />
                          <div className="grid gap-1.5 flex-1">
                            <div className="flex justify-between">
                              <Label
                                htmlFor={`completed-task-${index}`}
                                className="text-sm font-medium line-through text-muted-foreground"
                              >
                                {task.title}
                              </Label>
                              <Badge variant="outline">{task.category}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{task.description}</p>
                            <p className="text-xs text-muted-foreground flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed: {task.completedDate}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add New Task</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Hours</CardTitle>
                <CardDescription>Hours spent learning new skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between">
                  {learningHours.map((month, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="bg-primary/80 rounded-t-sm w-8"
                        style={{ height: `${month.hours * 2}px` }}
                        title={`${month.hours} hours`}
                      ></div>
                      <span className="text-xs mt-2">{month.month}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Total Learning Hours: {learningHours.reduce((acc, curr) => acc + curr.hours, 0)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills Acquired</CardTitle>
                <CardDescription>New skills you've learned over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillsAcquired.map((category, index) => (
                    <div key={index}>
                      <h3 className="text-sm font-medium mb-2">{category.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant={skill.proficiency === "Advanced" ? "default" : "outline"}>
                            {skill.name}
                            {skill.proficiency && (
                              <span className="ml-1 text-xs opacity-70">({skill.proficiency})</span>
                            )}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/ai">Learn New Skills</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications & Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border rounded-md">
                      <Award className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        <p className="text-xs text-muted-foreground mt-1">Earned: {cert.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningRecommendations.map((rec, index) => (
                    <div key={index} className="p-3 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{rec.title}</h3>
                          <p className="text-sm text-muted-foreground">{rec.type}</p>
                        </div>
                        <Badge variant="outline">{rec.difficulty}</Badge>
                      </div>
                      <p className="text-sm mt-2">{rec.description}</p>
                      <div className="mt-4 flex justify-end">
                        <Button size="sm" asChild>
                          <a href={rec.link} target="_blank" rel="noopener noreferrer">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Start Learning
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Mock data
const weeklyActivity = [
  { day: "Mon", learning: 45, jobSearch: 30 },
  { day: "Tue", learning: 60, jobSearch: 15 },
  { day: "Wed", learning: 30, jobSearch: 45 },
  { day: "Thu", learning: 75, jobSearch: 20 },
  { day: "Fri", learning: 40, jobSearch: 60 },
  { day: "Sat", learning: 90, jobSearch: 10 },
  { day: "Sun", learning: 20, jobSearch: 5 },
]

const upcomingInterviews = [
  {
    company: "TechCorp",
    position: "Frontend Developer",
    date: "May 25, 2023 at 2:00 PM",
  },
  {
    company: "WebSolutions",
    position: "Full Stack Developer",
    date: "May 28, 2023 at 10:30 AM",
  },
]

const skillsProgress = [
  { name: "JavaScript", progress: 85 },
  { name: "React", progress: 70 },
  { name: "CSS/Tailwind", progress: 90 },
  { name: "Node.js", progress: 60 },
]

const jobApplicationStats = {
  total: 24,
  interviews: 5,
  interviewRate: 21,
}

const todaysTasks = [
  { title: "Apply to 3 jobs", completed: true, dueTime: "12:00 PM" },
  { title: "Complete React tutorial", completed: false, dueTime: "3:00 PM" },
  { title: "Update portfolio website", completed: false, dueTime: "5:00 PM" },
  { title: "Practice interview questions", completed: false, dueTime: "7:00 PM" },
]

const careerRoadmap = [
  {
    title: "HTML, CSS & JavaScript Fundamentals",
    description: "Master the core technologies of the web",
    completed: true,
    skills: [
      { name: "HTML5", learned: true },
      { name: "CSS3", learned: true },
      { name: "JavaScript", learned: true },
      { name: "Responsive Design", learned: true },
    ],
    resourceLink: "/ai?skill=JavaScript",
  },
  {
    title: "Frontend Frameworks & Libraries",
    description: "Learn modern frameworks for building interactive UIs",
    completed: false,
    skills: [
      { name: "React", learned: true },
      { name: "Redux", learned: false },
      { name: "TypeScript", learned: false },
      { name: "Tailwind CSS", learned: true },
    ],
    resourceLink: "/ai?skill=React",
  },
  {
    title: "Version Control & Deployment",
    description: "Learn to manage code and deploy applications",
    completed: false,
    skills: [
      { name: "Git", learned: true },
      { name: "GitHub", learned: true },
      { name: "CI/CD", learned: false },
      { name: "Vercel/Netlify", learned: false },
    ],
    resourceLink: "/ai?skill=Git",
  },
  {
    title: "Backend Integration",
    description: "Connect your frontend to data sources and APIs",
    completed: false,
    skills: [
      { name: "RESTful APIs", learned: false },
      { name: "GraphQL", learned: false },
      { name: "Authentication", learned: false },
      { name: "Node.js Basics", learned: false },
    ],
    resourceLink: "/ai?skill=APIs",
  },
  {
    title: "Professional Development",
    description: "Build a portfolio and prepare for interviews",
    completed: false,
    skills: [
      { name: "Portfolio", learned: false },
      { name: "Technical Interviews", learned: false },
      { name: "Networking", learned: false },
      { name: "Soft Skills", learned: false },
    ],
    resourceLink: "/ai?skill=Portfolio",
  },
]

const allTasks = [
  {
    title: "Apply to Frontend Developer position at TechCorp",
    description: "Review job description and tailor resume before applying",
    category: "Job Search",
    status: "todo",
    dueDate: "May 25, 2023",
  },
  {
    title: "Complete React Hooks tutorial",
    description: "Learn useEffect, useContext, and custom hooks",
    category: "Learning",
    status: "in-progress",
    dueDate: "May 23, 2023",
  },
  {
    title: "Update portfolio with recent projects",
    description: "Add JobSkill project and update skills section",
    category: "Portfolio",
    status: "todo",
    dueDate: "May 27, 2023",
  },
  {
    title: "Prepare for TechCorp interview",
    description: "Research company and practice common interview questions",
    category: "Interview Prep",
    status: "todo",
    dueDate: "May 24, 2023",
  },
  {
    title: "Network with 3 professionals on LinkedIn",
    description: "Connect with people in target companies",
    category: "Networking",
    status: "in-progress",
    dueDate: "May 22, 2023",
  },
  {
    title: "Complete JavaScript assessment",
    description: "Test knowledge of JavaScript fundamentals",
    category: "Learning",
    status: "completed",
    completedDate: "May 15, 2023",
  },
  {
    title: "Apply to WebSolutions",
    description: "Submitted application for Full Stack Developer position",
    category: "Job Search",
    status: "completed",
    completedDate: "May 18, 2023",
  },
]

const learningHours = [
  { month: "Jan", hours: 25 },
  { month: "Feb", hours: 30 },
  { month: "Mar", hours: 45 },
  { month: "Apr", hours: 60 },
  { month: "May", hours: 40 },
]

const skillsAcquired = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML", proficiency: "Advanced" },
      { name: "CSS", proficiency: "Advanced" },
      { name: "JavaScript", proficiency: "Advanced" },
      { name: "React", proficiency: "Intermediate" },
      { name: "Tailwind", proficiency: "Intermediate" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", proficiency: "Beginner" },
      { name: "Express", proficiency: "Beginner" },
      { name: "REST APIs", proficiency: "Intermediate" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", proficiency: "Intermediate" },
      { name: "VS Code", proficiency: "Advanced" },
      { name: "Chrome DevTools", proficiency: "Intermediate" },
    ],
  },
]

const certifications = [
  {
    name: "JavaScript Fundamentals",
    issuer: "JobSkill Platform",
    date: "May 15, 2023",
  },
  {
    name: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "April 10, 2023",
  },
  {
    name: "Git & GitHub Basics",
    issuer: "JobSkill Platform",
    date: "March 22, 2023",
  },
]

const learningRecommendations = [
  {
    title: "Advanced React Patterns",
    type: "Course",
    difficulty: "Intermediate",
    description: "Learn advanced React patterns including render props, compound components, and custom hooks.",
    link: "/ai?skill=Advanced%20React",
  },
  {
    title: "TypeScript for React Developers",
    type: "Tutorial Series",
    difficulty: "Intermediate",
    description: "Add type safety to your React applications with TypeScript.",
    link: "/ai?skill=TypeScript",
  },
  {
    title: "Building a Full Stack Application",
    type: "Project-based Course",
    difficulty: "Advanced",
    description: "Build a complete application with React, Node.js, and MongoDB.",
    link: "/ai?skill=Full%20Stack",
  },
]

