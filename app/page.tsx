import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, ArrowRight, Users, MessageSquare, Download, Zap } from "lucide-react"
import JobList from "@/components/job-list"
import { jobs } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="text-center space-y-6">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm">
            <Zap className="h-3.5 w-3.5 mr-1 text-primary" />
            AI-Powered Career Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold">
            Find Your Dream Job & <span className="text-primary">Connect</span> with Mentors
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover job opportunities, learn in-demand skills, and get guidance from industry experts on your career
            journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Button size="lg" asChild className="flex-1">
              <Link href="/jobs">
                <Search className="mr-2 h-5 w-5" />
                Find Jobs
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="flex-1">
              <Link href="/mentors">
                <Users className="mr-2 h-5 w-5" />
                Find Mentors
              </Link>
            </Button>
          </div>
          <div className="flex justify-center gap-4 pt-2">
            <a
              href="http://t.me/placement01_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Join our Telegram Bot
            </a>
            <a
              href="https://apps.apple.com/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Download className="h-4 w-4 mr-1" />
              Download our App
            </a>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-muted py-8 px-6 rounded-lg">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Search for Jobs</h2>
          <form className="flex flex-col sm:flex-row gap-4" action="/jobs" method="GET">
            <Input name="q" placeholder="Job title, company, or skill..." className="flex-1" />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Jobs</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/jobs" className="flex items-center">
              View all jobs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <JobList jobs={jobs.slice(0, 4)} />
      </section>

      {/* Mentors Section */}
      <section className="bg-primary/5 py-10 px-6 rounded-lg">
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl font-bold">Learn from Industry Experts</h2>
          <p className="text-lg text-muted-foreground">
            Connect with experienced mentors who can guide you through your career journey, provide personalized advice,
            and help you develop in-demand skills.
          </p>
          <Button size="lg" asChild>
            <Link href="/mentors">
              <Users className="mr-2 h-5 w-5" />
              Browse Mentors
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredMentors.map((mentor, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={mentor.image || "/placeholder.svg"}
                  alt={mentor.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg">{mentor.name}</h3>
                <p className="text-muted-foreground mb-2">{mentor.title}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.expertise.map((skill, i) => (
                    <Badge key={i} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full">
                  <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Community Forum Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Community Forum</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/forum" className="flex items-center">
              Join discussions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {forumHighlights.map((post, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                      <img
                        src={post.authorImage || "/placeholder.svg"}
                        alt={post.author}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{post.category}</Badge>
                </div>
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{post.replies} replies</span>
                    <span>{post.views} views</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/forum/${post.id}`}>Read more</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-primary/5 py-10 px-6 rounded-lg">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold">Learn In-Demand Skills with AI</h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered learning platform helps you master the skills employers are looking for. Click on any skill
            in a job listing to start learning.
          </p>
          <Button size="lg" asChild>
            <Link href="/ai">
              <BookOpen className="mr-2 h-5 w-5" />
              Start Learning
            </Link>
          </Button>
        </div>
      </section>

      {/* App & Telegram Bot Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <Download className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-2">Get the Placement.ai App</h3>
            <p className="text-muted-foreground mb-6">
              Take your job search on the go. Apply to jobs, chat with mentors, and track your progress from anywhere.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <a href="https://apps.apple.com/placeholder" target="_blank" rel="noopener noreferrer">
                  App Store
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://play.google.com/placeholder" target="_blank" rel="noopener noreferrer">
                  Google Play
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <MessageSquare className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Join Our Telegram Bot</h3>
            <p className="text-muted-foreground mb-6">
              Get instant job alerts, career tips, and connect with our community through our Telegram bot.
            </p>
            <Button asChild className="bg-blue-500 hover:bg-blue-600">
              <a href="http://t.me/placement01_bot" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5" />
                Join Now
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

// Mock data for featured mentors
const featuredMentors = [
  {
    id: "1",
    name: "Jasskaran Singh",
    title: "Senior Frontend Developer at Google",
    expertise: ["React", "JavaScript", "Career Guidance"],
    image: "https://media.licdn.com/dms/image/v2/D5603AQH3OjAcTovnFw/profile-displayphoto-shrink_400_400/B56ZV3Zk3eGUAk-/0/1741464949602?e=1746662400&v=beta&t=LaKRApaNCiJS9pbsrbA4zs36vmN0P17uAfi9U8c1Ct4",
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Product Manager at Microsoft",
    expertise: ["Product Management", "UX Design", "Interview Prep"],
    image: "https://media.licdn.com/dms/image/v2/D5603AQGeA2bHY5giTQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1720014751158?e=1746662400&v=beta&t=WJVrqyoexjwghpkLa6HohjJErEbjFEROm1sI-yxhPgs",
  },
  {
    id: "3",
    name: "Priya Patel",
    title: "DevOps Engineer at Amazon",
    expertise: ["AWS", "CI/CD", "Cloud Architecture"],
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGxGxdKEe1Xzg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725023152834?e=1746662400&v=beta&t=Hz4ItYvByMGJc5h7DkWD65mxj079FfHvcCDoyv5s_EU",
  },
]

// Mock data for forum highlights
const forumHighlights = [
  {
    id: "1",
    title: "How to prepare for system design interviews?",
    author: "Alex Morgan",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "2 days ago",
    category: "Interview Prep",
    excerpt:
      "I have a system design interview coming up next week with a major tech company. What resources and approaches do you recommend to prepare effectively?",
    replies: 24,
    views: 342,
  },
  {
    id: "2",
    title: "Career switch from marketing to UX design - advice needed",
    author: "Jamie Lee",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "5 days ago",
    category: "Career Change",
    excerpt:
      "After 5 years in digital marketing, I'm looking to transition to UX design. Has anyone made a similar switch? What skills should I focus on first?",
    replies: 18,
    views: 276,
  },
]

