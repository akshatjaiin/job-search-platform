import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, User, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Career Blog</h1>
        <p className="text-muted-foreground">
          Expert advice, tips, and insights to help you succeed in your job search and career
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="object-cover w-full h-full" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {post.categories.map((category, index) => (
                      <Badge key={index} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-2xl">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center">
                  <User className="mr-1 h-4 w-4" />
                  {post.author} • {post.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" asChild>
                  <Link href={`/blog/${post.slug}`}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTopics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="cursor-pointer hover:bg-secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularPosts.map((post, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <Link href={`/blog/${post.slug}`} className="font-medium hover:underline text-sm">
                        {post.title}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscribe to Updates</CardTitle>
              <CardDescription>Get the latest career advice in your inbox</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Mock data
const blogPosts = [
  {
    id: 1,
    title: "10 Resume Tips That Will Help You Get Hired",
    slug: "resume-tips-to-get-hired",
    author: "Sarah Johnson",
    date: "May 15, 2023",
    readTime: "5 min read",
    excerpt:
      "Your resume is your first impression to potential employers. Learn how to make it stand out with these expert tips that focus on clarity, relevance, and impact.",
    categories: ["Resume", "Job Search"],
    image: "/placeholder.svg?height=400&width=800",
  },
  {
    id: 2,
    title: "How to Ace Your Technical Interview: A Complete Guide",
    slug: "ace-technical-interview-guide",
    author: "Michael Chen",
    date: "May 10, 2023",
    readTime: "8 min read",
    excerpt:
      "Technical interviews can be intimidating, but with the right preparation, you can showcase your skills effectively. This guide covers everything from coding challenges to behavioral questions.",
    categories: ["Interviews", "Tech Careers"],
    image: "/placeholder.svg?height=400&width=800",
  },
  {
    id: 3,
    title: "The Power of Networking for Fresh Graduates",
    slug: "networking-for-fresh-graduates",
    author: "Priya Patel",
    date: "May 5, 2023",
    readTime: "6 min read",
    excerpt:
      "Networking isn't just about collecting contacts—it's about building meaningful professional relationships. Learn how to network effectively as a fresh graduate to open doors to opportunities.",
    categories: ["Networking", "Career Growth"],
    image: "/placeholder.svg?height=400&width=800",
  },
]

const popularTopics = [
  "Resume Writing",
  "Interview Prep",
  "Job Search",
  "Career Growth",
  "Networking",
  "Tech Skills",
  "Remote Work",
  "Salary Negotiation",
  "Portfolio Building",
  "Work-Life Balance",
]

const popularPosts = [
  {
    title: "5 Common Interview Mistakes and How to Avoid Them",
    slug: "common-interview-mistakes",
    date: "April 28, 2023",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    title: "How to Negotiate Your Salary as a Fresh Graduate",
    slug: "salary-negotiation-fresh-graduate",
    date: "April 20, 2023",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    title: "Building a Portfolio That Gets You Hired",
    slug: "portfolio-building-guide",
    date: "April 15, 2023",
    image: "/placeholder.svg?height=64&width=64",
  },
]

