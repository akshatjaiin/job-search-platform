import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock, User, Share2, Bookmark, ThumbsUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            {post.categories.map((category, index) => (
              <Badge key={index} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              {post.readTime}
            </div>
            <div>{post.date}</div>
          </div>
        </div>

        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="object-cover w-full h-full" />
        </div>

        <div className="prose max-w-none">
          {post.content.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}

          {post.sections.map((section, index) => (
            <div key={index} className="mt-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="mb-4">
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="my-4 space-y-2">
                  {section.list.map((item, iIndex) => (
                    <li key={iIndex} className="ml-6 list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between py-6 border-t border-b">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Helpful
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post, index) => (
              <Card key={index}>
                <div className="aspect-video bg-muted">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="object-cover w-full h-full" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {post.readTime}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
    content: [
      "Your resume is often the first impression you make on potential employers. In today's competitive job market, having a well-crafted resume can be the difference between landing an interview and being overlooked.",
      "As a fresh graduate or early career professional, your resume needs to highlight your potential even if you don't have extensive work experience. The good news is that with the right approach, you can create a compelling resume that gets you noticed.",
    ],
    sections: [
      {
        title: "1. Tailor Your Resume for Each Application",
        paragraphs: [
          "One of the biggest mistakes job seekers make is using the same generic resume for every application. Employers can spot a generic resume immediately, and it signals that you haven't put in the effort to understand their specific needs.",
          "Take the time to customize your resume for each position you apply for. Analyze the job description and identify key skills and requirements. Then, make sure your resume highlights these elements prominently.",
        ],
        list: null,
      },
      {
        title: "2. Focus on Achievements, Not Just Responsibilities",
        paragraphs: [
          "Instead of simply listing your job duties, focus on your accomplishments. Employers want to know what you achieved in your previous roles, not just what you were supposed to do.",
          "Use quantifiable metrics whenever possible. For example, instead of saying 'Managed social media accounts,' say 'Increased social media engagement by 45% over six months through strategic content planning.'",
        ],
        list: null,
      },
      {
        title: "3. Keep It Concise and Relevant",
        paragraphs: [
          "Recruiters spend an average of just 7 seconds scanning a resume initially. Make those seconds count by keeping your resume concise, well-organized, and focused on relevant information.",
        ],
        list: [
          "Limit your resume to 1-2 pages",
          "Use bullet points instead of paragraphs",
          "Prioritize recent and relevant experience",
          "Eliminate outdated or irrelevant information",
          "Use white space effectively to improve readability",
        ],
      },
      {
        title: "4. Optimize for Applicant Tracking Systems (ATS)",
        paragraphs: [
          "Many companies use ATS software to screen resumes before they reach human eyes. To ensure your resume passes this initial screening:",
          "Include relevant keywords from the job description, use standard section headings, avoid complex formatting and tables, and submit your resume in a compatible format (usually PDF or Word).",
        ],
        list: null,
      },
      {
        title: "5. Showcase Your Skills Effectively",
        paragraphs: [
          "For fresh graduates or those with limited work experience, the skills section becomes particularly important. Include both hard skills (technical abilities) and soft skills (interpersonal qualities).",
          "Be specific about your technical skills. Instead of just listing 'Programming,' specify languages like 'JavaScript, Python, and React.' For soft skills, provide context or examples that demonstrate these qualities.",
        ],
        list: null,
      },
    ],
  },
]

const relatedPosts = [
  {
    title: "How to Write a Cover Letter That Gets Noticed",
    slug: "cover-letter-writing-guide",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "LinkedIn Profile Optimization for Job Seekers",
    slug: "linkedin-profile-optimization",
    readTime: "7 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "How to Explain Employment Gaps in Your Resume",
    slug: "explaining-employment-gaps",
    readTime: "4 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
]

