import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MessageCircle, Users, Clock, PlusCircle, TrendingUp, BookmarkPlus } from "lucide-react"

export default function ForumPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
        <p className="text-muted-foreground">
          Connect with peers, share experiences, and get advice from the Placement.ai community
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Search discussions..." />
        </div>
        <Button>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
        <Button variant="default">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Discussion
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Topics</TabsTrigger>
              <TabsTrigger value="trending">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              <TabsTrigger value="bookmarked">
                <BookmarkPlus className="h-4 w-4 mr-2" />
                Bookmarked
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6 space-y-4">
              {forumPosts.map((post) => (
                <ForumPostCard key={post.id} post={post} />
              ))}
            </TabsContent>
            <TabsContent value="trending" className="mt-6 space-y-4">
              {forumPosts
                .filter((post) => post.trending)
                .map((post) => (
                  <ForumPostCard key={post.id} post={post} />
                ))}
            </TabsContent>
            <TabsContent value="unanswered" className="mt-6 space-y-4">
              {forumPosts
                .filter((post) => post.replies === 0)
                .map((post) => (
                  <ForumPostCard key={post.id} post={post} />
                ))}
            </TabsContent>
            <TabsContent value="bookmarked" className="mt-6">
              <div className="text-center py-12">
                <BookmarkPlus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No bookmarked discussions yet</h3>
                <p className="text-muted-foreground mb-6">Bookmark discussions to save them for later</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {forumCategories.map((category) => (
                  <div key={category.id} className="flex justify-between items-center p-2 hover:bg-muted rounded-md">
                    <Link href={`/forum/category/${category.id}`} className="flex items-center">
                      <category.icon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{category.name}</span>
                    </Link>
                    <Badge variant="outline">{category.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContributors.map((contributor) => (
                  <div key={contributor.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                      <img
                        src={contributor.avatar || "/placeholder.svg"}
                        alt={contributor.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{contributor.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {contributor.posts} posts • {contributor.solutions} solutions
                      </p>
                    </div>
                    <Badge variant="secondary">{contributor.level}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Forum Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>Be respectful and supportive of other members</li>
                <li>Stay on topic and provide relevant information</li>
                <li>Do not share personal contact information</li>
                <li>No promotional content or spam</li>
                <li>Use appropriate language and tone</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/forum/guidelines">Read Full Guidelines</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface ForumPostCardProps {
  post: any
}

function ForumPostCard({ post }: ForumPostCardProps) {
  return (
    <Card>
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
        <Link href={`/forum/${post.id}`} className="hover:underline">
          <h3 className="font-bold text-lg mb-2">{post.title}</h3>
        </Link>
        <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag: string, i: number) => (
            <Badge key={i} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span>{post.replies} replies</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{post.views} views</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.lastActivity}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/forum/${post.id}`}>Read more</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Mock data for forum posts
const forumPosts = [
  {
    id: "1",
    title: "How to prepare for system design interviews?",
    author: "Alex Morgan",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "2 days ago",
    category: "Interview Prep",
    excerpt:
      "I have a system design interview coming up next week with a major tech company. What resources and approaches do you recommend to prepare effectively?",
    tags: ["System Design", "Interviews", "Tech Career"],
    replies: 24,
    views: 342,
    lastActivity: "3 hours ago",
    trending: true,
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
    tags: ["UX Design", "Career Change", "Skill Development"],
    replies: 18,
    views: 276,
    lastActivity: "1 day ago",
    trending: true,
  },
  {
    id: "3",
    title: "Best resources for learning React in 2023?",
    author: "Chris Wilson",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "1 week ago",
    category: "Learning",
    excerpt:
      "I'm trying to learn React from scratch. There are so many courses and tutorials out there. Which ones have you found most helpful and up-to-date?",
    tags: ["React", "Web Development", "Learning Resources"],
    replies: 32,
    views: 420,
    lastActivity: "12 hours ago",
    trending: false,
  },
  {
    id: "4",
    title: "Negotiating salary as a junior developer",
    author: "Taylor Swift",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "3 days ago",
    category: "Career Advice",
    excerpt:
      "I just received a job offer for my first developer role, but the salary seems low compared to market rates. How should I approach negotiation as a junior?",
    tags: ["Salary Negotiation", "Junior Developer", "Job Offers"],
    replies: 15,
    views: 198,
    lastActivity: "2 days ago",
    trending: false,
  },
  {
    id: "5",
    title: "Remote work productivity tips",
    author: "Sam Johnson",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "4 days ago",
    category: "Remote Work",
    excerpt:
      "I've been working remotely for 6 months now and still struggling with productivity and work-life balance. What strategies have worked for you?",
    tags: ["Remote Work", "Productivity", "Work-Life Balance"],
    replies: 27,
    views: 310,
    lastActivity: "6 hours ago",
    trending: true,
  },
  {
    id: "6",
    title: "Portfolio feedback request - Frontend Developer",
    author: "Emma Chen",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "2 days ago",
    category: "Portfolio Review",
    excerpt:
      "I've just completed my portfolio website and would appreciate some constructive feedback before I start applying for jobs. Link in the post.",
    tags: ["Portfolio", "Frontend", "Feedback Request"],
    replies: 8,
    views: 142,
    lastActivity: "1 day ago",
    trending: false,
  },
  {
    id: "7",
    title: "How important is a CS degree in 2023?",
    author: "Jordan Peterson",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "1 week ago",
    category: "Education",
    excerpt:
      "I'm considering whether to pursue a CS degree or focus on self-learning and bootcamps. For those in the industry, how valuable is a formal CS education today?",
    tags: ["CS Degree", "Self-Learning", "Education"],
    replies: 45,
    views: 520,
    lastActivity: "5 hours ago",
    trending: true,
  },
  {
    id: "8",
    title: "First technical interview tomorrow - any last minute tips?",
    author: "Raj Patel",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "1 day ago",
    category: "Interview Prep",
    excerpt:
      "I have my first technical interview tomorrow for a frontend role. Any last minute advice or things I should definitely prepare for?",
    tags: ["Technical Interview", "Frontend", "Preparation"],
    replies: 12,
    views: 180,
    lastActivity: "4 hours ago",
    trending: false,
  },
  {
    id: "9",
    title: "Dealing with imposter syndrome as a new developer",
    author: "Sofia Garcia",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "6 days ago",
    category: "Mental Health",
    excerpt:
      "I recently landed my first dev job but constantly feel like I don't belong and that I'll be exposed as a fraud. How do you deal with imposter syndrome?",
    tags: ["Imposter Syndrome", "Mental Health", "Career Growth"],
    replies: 38,
    views: 425,
    lastActivity: "1 day ago",
    trending: true,
  },
  {
    id: "10",
    title: "Best approach for learning data structures and algorithms?",
    author: "Mike Johnson",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "3 days ago",
    category: "Learning",
    excerpt:
      "I'm struggling with DSA concepts and practice problems. What resources or study methods have helped you master these topics?",
    tags: ["DSA", "Learning", "Coding Interviews"],
    replies: 0,
    views: 95,
    lastActivity: "3 days ago",
    trending: false,
  },
]

// Mock data for forum categories
const forumCategories = [
  {
    id: "interview-prep",
    name: "Interview Preparation",
    count: 156,
    icon: MessageCircle,
  },
  {
    id: "career-advice",
    name: "Career Advice",
    count: 124,
    icon: MessageCircle,
  },
  {
    id: "learning",
    name: "Learning Resources",
    count: 98,
    icon: MessageCircle,
  },
  {
    id: "tech-discussion",
    name: "Technical Discussions",
    count: 87,
    icon: MessageCircle,
  },
  {
    id: "job-search",
    name: "Job Search",
    count: 76,
    icon: MessageCircle,
  },
  {
    id: "portfolio-review",
    name: "Portfolio Reviews",
    count: 65,
    icon: MessageCircle,
  },
  {
    id: "remote-work",
    name: "Remote Work",
    count: 54,
    icon: MessageCircle,
  },
  {
    id: "mental-health",
    name: "Mental Health & Wellbeing",
    count: 43,
    icon: MessageCircle,
  },
]

// Mock data for top contributors
const topContributors = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    posts: 156,
    solutions: 87,
    level: "Expert",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    posts: 124,
    solutions: 62,
    level: "Advanced",
  },
  {
    id: "3",
    name: "Jessica Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    posts: 98,
    solutions: 45,
    level: "Advanced",
  },
  {
    id: "4",
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    posts: 76,
    solutions: 38,
    level: "Intermediate",
  },
  {
    id: "5",
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    posts: 65,
    solutions: 29,
    level: "Intermediate",
  },
]

