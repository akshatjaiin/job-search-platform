import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ThumbsUp, MessageCircle, Flag, Share2, Bookmark, CheckCircle } from "lucide-react"
import { notFound } from "next/navigation"

interface ForumPostPageProps {
  params: {
    id: string
  }
}

export default function ForumPostPage({ params }: ForumPostPageProps) {
  const post = forumPosts.find((p) => p.id === params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/forum">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Forum
        </Link>
      </Button>

      <Card className="mb-6">
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

          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <p className="mb-4">{post.content || post.excerpt}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag: string, i: number) => (
              <Badge key={i} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Helpful (42)
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmark
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Flag className="h-4 w-4 mr-2" />
                Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Replies ({post.replies})</h2>

        <div className="space-y-6">
          {replies.map((reply) => (
            <Card key={reply.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                      <img
                        src={reply.authorImage || "/placeholder.svg"}
                        alt={reply.author}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium">{reply.author}</p>
                        {reply.isSolution && (
                          <Badge variant="outline" className="ml-2 bg-green-50 text-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Solution
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{reply.date}</p>
                    </div>
                  </div>
                </div>

                <p className="mb-4">{reply.content}</p>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Helpful ({reply.likes})
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">Add Your Reply</h3>
          <Textarea placeholder="Share your thoughts or advice..." className="min-h-[120px] mb-4" />
          <div className="flex justify-end">
            <Button>
              <MessageCircle className="h-4 w-4 mr-2" />
              Post Reply
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <div>
        <h2 className="text-xl font-bold mb-4">Related Discussions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedPosts.map((related) => (
            <Card key={related.id}>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2">
                  {related.category}
                </Badge>
                <Link href={`/forum/${related.id}`} className="font-medium hover:underline">
                  {related.title}
                </Link>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    <span>{related.replies} replies</span>
                  </div>
                  <span>{related.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
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
    content:
      "I have a system design interview coming up next week with a major tech company. This is my first system design interview, and I'm feeling quite nervous about it. I've been practicing coding problems on LeetCode, but system design feels much more open-ended and subjective.\n\nWhat resources (books, courses, websites) would you recommend for quick but effective preparation? Also, what approach do you take when tackling system design problems in interviews? Any specific frameworks or methodologies that have worked well for you?\n\nI'm particularly interested in understanding how to handle the ambiguity and how to structure my answers in a way that demonstrates both breadth and depth of knowledge. Any tips or personal experiences would be greatly appreciated!",
    tags: ["System Design", "Interviews", "Tech Career"],
    replies: 24,
    views: 342,
    lastActivity: "3 hours ago",
    trending: true,
  },
]

// Mock data for replies
const replies = [
  {
    id: "1",
    author: "Sarah Johnson",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "2 days ago",
    content:
      "I recently went through several system design interviews and found 'System Design Interview: An Insider's Guide' by Alex Xu extremely helpful. It breaks down common problems and provides frameworks for approaching them.\n\nAs for the approach, I recommend the following structure:\n\n1. Clarify requirements and constraints (ask questions!)\n2. Define the API endpoints\n3. Design the high-level system architecture\n4. Dive deeper into specific components\n5. Discuss potential bottlenecks and solutions\n\nRemember that communication is key. Explain your thought process as you go, and don't be afraid to ask for feedback or clarification from the interviewer. Good luck!",
    likes: 18,
    isSolution: true,
  },
  {
    id: "2",
    author: "Michael Chen",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "1 day ago",
    content:
      "In addition to what Sarah mentioned, I'd recommend practicing with real-world systems you're familiar with. Try to design Twitter, Netflix, or Uber from scratch. This helps you develop a systematic approach.\n\nAlso, don't forget about non-functional requirements like scalability, reliability, and performance. Discussing these aspects shows that you think beyond just making something work.\n\nFor resources, check out:\n- Grokking the System Design Interview course\n- System Design Primer on GitHub\n- YouTube videos by Tech Dummies and Gaurav Sen\n\nAnd remember, there's rarely one 'correct' answer in system design. It's about tradeoffs and justifying your decisions.",
    likes: 12,
    isSolution: false,
  },
  {
    id: "3",
    author: "Jessica Kim",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "1 day ago",
    content:
      "One thing that helped me a lot was understanding the scale of the problem. Always ask about the expected number of users, requests per second, data storage requirements, etc. This will guide your design decisions.\n\nFor example, a system serving 100 users vs 100 million users will have very different architecture considerations. Similarly, read-heavy vs write-heavy systems require different optimizations.\n\nAlso, practice drawing clear diagrams. A well-structured visual representation of your system can make a huge difference in how your ideas are perceived.",
    likes: 8,
    isSolution: false,
  },
]

// Mock data for related posts
const relatedPosts = [
  {
    id: "11",
    title: "How to prepare for behavioral interviews at tech companies",
    category: "Interview Prep",
    replies: 16,
    date: "1 week ago",
  },
  {
    id: "12",
    title: "System design resources for backend developers",
    category: "Learning",
    replies: 22,
    date: "2 weeks ago",
  },
  {
    id: "13",
    title: "Failed my first system design interview - lessons learned",
    category: "Interview Prep",
    replies: 34,
    date: "3 days ago",
  },
  {
    id: "14",
    title: "How important are system design skills for frontend developers?",
    category: "Career Advice",
    replies: 28,
    date: "5 days ago",
  },
]

