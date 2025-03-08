import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Star, Calendar, MessageCircle, Users, BookOpen, Clock, DollarSign, CheckCircle } from "lucide-react"
import { notFound } from "next/navigation"

interface MentorPageProps {
  params: {
    id: string
  }
}

export default function MentorPage({ params }: MentorPageProps) {
  const mentor = mentors.find((m) => m.id === params.id)

  if (!mentor) {
    notFound()
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/mentors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Mentors
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <div className="aspect-square relative">
              <img src={mentor.image || "/placeholder.svg"} alt={mentor.name} className="object-cover w-full h-full" />
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{mentor.name}</h1>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="ml-1 font-medium">{mentor.rating}</span>
                </div>
              </div>
              <p className="text-muted-foreground">{mentor.title}</p>

              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill: string, i: number) => (
                  <Badge key={i} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{mentor.availability}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{mentor.mentees} mentees</span>
                </div>
                <div className="flex items-center text-sm">
                  <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{mentor.courses} courses</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <Button className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" className="flex-1">
                  Book Session
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mentor.sessionTypes.map((session: any, i: number) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <p className="font-medium">{session.type}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {session.duration}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{session.price}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {mentor.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Bio</h3>
                    <p>{mentor.fullBio || mentor.bio}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Experience</h3>
                    <div className="space-y-3">
                      {mentor.experience.map((exp: any, i: number) => (
                        <div key={i} className="border-l-2 pl-4 py-1">
                          <p className="font-medium">{exp.title}</p>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Education</h3>
                    <div className="space-y-3">
                      {mentor.education.map((edu: any, i: number) => (
                        <div key={i} className="border-l-2 pl-4 py-1">
                          <p className="font-medium">{edu.degree}</p>
                          <p className="text-sm text-muted-foreground">{edu.school}</p>
                          <p className="text-sm text-muted-foreground">{edu.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">How I Can Help You</h3>
                    <ul className="space-y-2">
                      {mentor.helpTopics.map((topic: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Courses by {mentor.name}</CardTitle>
                  <CardDescription>Enroll in structured learning programs created by this mentor</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mentor.coursesList.map((course: any, i: number) => (
                      <div key={i} className="border rounded-lg overflow-hidden">
                        <div className="aspect-video relative">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-4">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{course.duration}</span>
                            <span className="mx-2">•</span>
                            <span>{course.lessons} lessons</span>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                              <span>{course.rating}</span>
                            </div>
                          </div>
                          <p className="mb-4">{course.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <DollarSign className="h-5 w-5 text-muted-foreground" />
                              <span className="text-2xl font-bold">{course.price}</span>
                            </div>
                            <Button>Enroll Now</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reviews</CardTitle>
                  <CardDescription>What mentees say about {mentor.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mentor.reviews.map((review: any, i: number) => (
                      <div key={i} className="border-b pb-6 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                              <img
                                src={review.avatar || "/placeholder.svg"}
                                alt={review.name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{review.name}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-current" : "text-muted"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="availability" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                  <CardDescription>Book a session with {mentor.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Check Available Time Slots</h3>
                    <p className="text-muted-foreground mb-6">
                      Select a date to see available time slots for booking a session
                    </p>
                    <Button>View Calendar</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Mock data for mentors with extended details
const mentors = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Frontend Developer at Google",
    category: "Tech",
    expertise: ["React", "JavaScript", "Career Guidance"],
    bio: "10+ years of experience in frontend development. I help junior developers improve their coding skills and prepare for tech interviews.",
    fullBio:
      "I've been working in frontend development for over a decade, with the last 5 years at Google. Throughout my career, I've mentored dozens of junior developers and helped them grow into senior roles. My approach focuses on practical, hands-on learning with real-world projects and challenges. I'm passionate about clean code, performance optimization, and creating intuitive user experiences.",
    rating: 4.9,
    availability: "Evenings & Weekends",
    mentees: 24,
    courses: 2,
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "Google",
        period: "2018 - Present",
      },
      {
        title: "Frontend Developer",
        company: "Facebook",
        period: "2015 - 2018",
      },
      {
        title: "Web Developer",
        company: "Startup XYZ",
        period: "2012 - 2015",
      },
    ],
    education: [
      {
        degree: "M.S. Computer Science",
        school: "Stanford University",
        period: "2010 - 2012",
      },
      {
        degree: "B.S. Computer Science",
        school: "UC Berkeley",
        period: "2006 - 2010",
      },
    ],
    helpTopics: [
      "Master React and modern JavaScript frameworks",
      "Prepare for technical interviews at top tech companies",
      "Build a portfolio that stands out to employers",
      "Develop a career growth strategy in frontend development",
      "Improve code quality and performance optimization",
    ],
    sessionTypes: [
      {
        type: "Quick Chat",
        duration: "30 minutes",
        price: "$50",
      },
      {
        type: "Deep Dive Session",
        duration: "60 minutes",
        price: "$90",
      },
      {
        type: "Code Review",
        duration: "45 minutes",
        price: "$75",
      },
      {
        type: "Mock Interview",
        duration: "60 minutes",
        price: "$100",
      },
    ],
    coursesList: [
      {
        title: "Advanced React Patterns",
        description:
          "Master advanced React concepts including hooks, context, performance optimization, and design patterns for scalable applications.",
        duration: "6 weeks",
        lessons: 24,
        rating: 4.8,
        price: "$199",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Acing the Frontend Interview",
        description:
          "Comprehensive preparation for frontend developer interviews, covering coding challenges, system design, and behavioral questions.",
        duration: "4 weeks",
        lessons: 16,
        rating: 4.9,
        price: "$149",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
    reviews: [
      {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 months ago",
        comment:
          "Sarah is an amazing mentor! Her guidance helped me land a job at a FAANG company. Her feedback on my code and interview preparation was invaluable.",
      },
      {
        name: "Jessica Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "4 months ago",
        comment:
          "I took Sarah's Advanced React Patterns course and it transformed how I approach frontend development. She explains complex concepts in a way that's easy to understand.",
      },
      {
        name: "Michael Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "6 months ago",
        comment:
          "Great mentor with deep knowledge of React and modern JavaScript. Very responsive and provides detailed feedback on assignments.",
      },
    ],
  },
]

