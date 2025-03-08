import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Video, Calendar, Clock, Star, ArrowRight, Brain, Code, Users, MessageSquare } from "lucide-react"

export default function MockInterviewsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI-Powered Mock Interviews</h1>
        <p className="text-muted-foreground">
          Practice with our AI interviewer or schedule sessions with real industry professionals
        </p>
      </div>

      <Tabs defaultValue="ai">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai">
            <Brain className="mr-2 h-4 w-4" />
            AI Interviews
          </TabsTrigger>
          <TabsTrigger value="expert">
            <Users className="mr-2 h-4 w-4" />
            Expert Interviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiInterviews.map((interview) => (
                  <Card key={interview.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle className="flex items-center">
                          {interview.icon === "code" && <Code className="mr-2 h-5 w-5 text-primary" />}
                          {interview.icon === "brain" && <Brain className="mr-2 h-5 w-5 text-primary" />}
                          {interview.icon === "users" && <Users className="mr-2 h-5 w-5 text-primary" />}
                          {interview.title && <Users className="mr-2 h-5 w-5 text-primary" />}
                          {interview.title}
                        </CardTitle>
                        <Badge variant="outline">{interview.level}</Badge>
                      </div>
                      <CardDescription>{interview.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {interview.duration}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="mr-1 h-4 w-4" />
                          {interview.questions} questions
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {interview.topics.map((topic, index) => (
                          <Badge key={index} variant="secondary">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/mock-interviews/ai/${interview.id}`}>Start Interview</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>How AI Interviews Work</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                      <Brain className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Realistic Simulation</p>
                      <p className="text-xs text-muted-foreground">
                        Our AI interviewer asks questions tailored to the role and provides real-time feedback.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                      <Video className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Video Recording</p>
                      <p className="text-xs text-muted-foreground">
                        Your responses are recorded so you can review your performance and body language.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Detailed Feedback</p>
                      <p className="text-xs text-muted-foreground">
                        Get personalized feedback on your answers, communication skills, and areas for improvement.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Unlimited Practice</p>
                      <p className="text-xs text-muted-foreground">
                        Practice as many times as you need to build confidence and improve your skills.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/mock-interviews/how-it-works">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Your Recent Interviews</CardTitle>
                </CardHeader>
                <CardContent>
                  {recentInterviews.length > 0 ? (
                    <div className="space-y-4">
                      {recentInterviews.map((interview, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <p className="font-medium">{interview.title}</p>
                            <p className="text-xs text-muted-foreground">{interview.date}</p>
                          </div>
                          <Badge variant={interview.score >= 80 ? "default" : "outline"}>{interview.score}%</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>No interview history yet</p>
                      <p className="text-sm">Start practicing to build your history</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="expert" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {expertInterviews.map((interview) => (
                  <Card key={interview.id}>
                    <div className="aspect-video relative">
                      <img
                        src={interview.image || "/placeholder.svg"}
                        alt={interview.title}
                        className="object-cover w-full h-full rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle>{interview.title}</CardTitle>
                        <Badge variant="outline">${interview.price}</Badge>
                      </div>
                      <CardDescription>{interview.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden mr-3">
                          <img
                            src={interview.expertImage || "/placeholder.svg"}
                            alt={interview.expertName}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{interview.expertName}</p>
                          <p className="text-xs text-muted-foreground">{interview.expertTitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {interview.duration}
                        </div>
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 text-yellow-500 fill-current" />
                          <span>{interview.rating}</span>
                          <span className="ml-1">({interview.reviews} reviews)</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/mock-interviews/expert/${interview.id}`}>Book Session</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Expert Interview Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Industry Professionals</p>
                      <p className="text-xs text-muted-foreground">
                        Practice with real hiring managers and senior professionals from top companies.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Personalized Feedback</p>
                      <p className="text-xs text-muted-foreground">
                        Get detailed insights from someone who actually conducts interviews in your field.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Flexible Scheduling</p>
                      <p className="text-xs text-muted-foreground">
                        Book sessions at times that work for you, with options for different time zones.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Networking Opportunity</p>
                      <p className="text-xs text-muted-foreground">
                        Build connections with professionals in your industry who can provide ongoing mentorship.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingSessions.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingSessions.map((session, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <p className="font-medium">{session.title}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              {session.date}
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <Calendar className="h-10 w-10 mx-auto mb-2 opacity-20" />
                      <p>No upcoming sessions</p>
                      <Button variant="link" size="sm" asChild>
                        <Link href="#expert-interviews">Book a session</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Mock data for AI interviews
const aiInterviews = [
  {
    id: "1",
    title: "Frontend Developer Interview",
    description: "Practice common frontend developer interview questions with our AI interviewer.",
    icon: "code",
    level: "All Levels",
    duration: "30-45 minutes",
    questions: 15,
    topics: ["React", "JavaScript", "CSS", "System Design", "Problem Solving"],
  },
  {
    id: "2",
    title: "Backend Developer Interview",
    description: "Prepare for backend developer interviews with questions on algorithms, databases, and system design.",
    icon: "code",
    level: "Intermediate",
    duration: "30-45 minutes",
    questions: 15,
    topics: ["Node.js", "Databases", "System Design", "Algorithms", "API Design"],
  },
  {
    id: "3",
    title: "Product Manager Interview",
    description: "Practice product management interviews with questions on strategy, execution, and leadership.",
    icon: "brain",
    level: "All Levels",
    duration: "30-45 minutes",
    questions: 12,
    topics: ["Product Strategy", "Prioritization", "User Research", "Metrics", "Case Studies"],
  },
  {
    id: "4",
    title: "Data Scientist Interview",
    description:
      "Prepare for data science interviews with questions on statistics, machine learning, and case studies.",
    icon: "brain",
    level: "Advanced",
    duration: "30-45 minutes",
    questions: 15,
    topics: ["Statistics", "Machine Learning", "SQL", "Python", "Case Studies"],
  },
  {
    id: "5",
    title: "Behavioral Interview",
    description: "Practice answering common behavioral questions using the STAR method.",
    icon: "users",
    level: "All Levels",
    duration: "20-30 minutes",
    questions: 10,
    topics: ["Leadership", "Teamwork", "Conflict Resolution", "Problem Solving", "Communication"],
  },
  {
    id: "6",
    title: "Technical Problem Solving",
    description: "Practice solving technical coding problems with real-time feedback.",
    icon: "code",
    level: "Intermediate",
    duration: "45-60 minutes",
    questions: 5,
    topics: ["Algorithms", "Data Structures", "Problem Solving", "Time Complexity", "Space Complexity"],
  },
]

// Mock data for expert interviews
const expertInterviews = [
  {
    id: "1",
    title: "FAANG Frontend Interview Prep",
    description: "Prepare for frontend interviews at top tech companies with a senior engineer.",
    expertName: "Sarah Johnson",
    expertTitle: "Senior Frontend Engineer at Google",
    expertImage: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=200&width=400",
    duration: "60 minutes",
    price: 99,
    rating: 4.9,
    reviews: 124,
  },
  {
    id: "2",
    title: "Backend System Design Interview",
    description: "Master system design interviews with guidance from a staff engineer.",
    expertName: "Michael Chen",
    expertTitle: "Staff Engineer at Amazon",
    expertImage: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=200&width=400",
    duration: "60 minutes",
    price: 129,
    rating: 4.8,
    reviews: 98,
  },
  {
    id: "3",
    title: "Product Manager Case Studies",
    description: "Practice PM case interviews with feedback from a senior product manager.",
    expertName: "Jessica Kim",
    expertTitle: "Senior PM at Microsoft",
    expertImage: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=200&width=400",
    duration: "60 minutes",
    price: 119,
    rating: 4.7,
    reviews: 87,
  },
  {
    id: "4",
    title: "Data Science Technical Interview",
    description: "Prepare for data science interviews with a focus on technical questions and case studies.",
    expertName: "David Wilson",
    expertTitle: "Data Science Manager at Netflix",
    expertImage: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=200&width=400",
    duration: "60 minutes",
    price: 109,
    rating: 4.8,
    reviews: 76,
  },
]

// Mock data for recent interviews
const recentInterviews = [
  {
    title: "Frontend Developer Interview",
    date: "May 15, 2023",
    score: 85,
  },
  {
    title: "Behavioral Interview",
    date: "May 10, 2023",
    score: 78,
  },
]

// Mock data for upcoming sessions
const upcomingSessions = [
  {
    title: "FAANG Frontend Interview Prep with Sarah Johnson",
    date: "May 25, 2023 at 2:00 PM",
  },
]

