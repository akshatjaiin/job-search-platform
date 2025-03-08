import { Suspense } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Search, Loader2 } from "lucide-react"
import { generateLearningContent } from "./actions"

interface AIPageProps {
  searchParams: { skill?: string }
}

export default function AIPage({ searchParams }: AIPageProps) {
  const skill = searchParams.skill || ""

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Learn Skills with AI</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our AI-powered learning platform helps you master the skills you need for your dream job. Enter a skill below
          or click on skills from job listings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What do you want to learn?</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col sm:flex-row gap-4" action="/ai" method="GET">
            <Input
              name="skill"
              placeholder="Enter a skill (e.g., React, Python, UI Design...)"
              className="flex-1"
              defaultValue={skill}
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Learn
            </Button>
          </form>
        </CardContent>
      </Card>

      {skill && (
        <Suspense fallback={<LearningContentSkeleton skill={skill} />}>
          <LearningContent skill={skill} />
        </Suspense>
      )}

      {!skill && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {popularSkills.map((skill) => (
            <Card key={skill} className="hover:border-primary transition-colors">
              <CardContent className="p-4">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href={`/ai?skill=${encodeURIComponent(skill)}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    {skill}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

async function LearningContent({ skill }: { skill: string }) {
  const content = await generateLearningContent(skill)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning {skill}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none dark:prose-invert">
          {content.split("\n").map((line, index) => {
            if (line.startsWith("# ")) {
              return (
                <h2 key={index} className="text-2xl font-bold mt-6 mb-4">
                  {line.replace("# ", "")}
                </h2>
              )
            } else if (line.startsWith("## ")) {
              return (
                <h3 key={index} className="text-xl font-bold mt-5 mb-3">
                  {line.replace("## ", "")}
                </h3>
              )
            } else if (line.startsWith("### ")) {
              return (
                <h4 key={index} className="text-lg font-bold mt-4 mb-2">
                  {line.replace("### ", "")}
                </h4>
              )
            } else if (line.startsWith("- ")) {
              return (
                <li key={index} className="ml-6">
                  {line.replace("- ", "")}
                </li>
              )
            } else if (line.trim() === "") {
              return <br key={index} />
            } else {
              return (
                <p key={index} className="my-2">
                  {line}
                </p>
              )
            }
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function LearningContentSkeleton({ skill }: { skill: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning {skill}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Generating learning content...</span>
        </div>
      </CardContent>
    </Card>
  )
}

const popularSkills = [
  "React",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Python",
  "UI Design",
  "Docker",
  "AWS",
  "Machine Learning",
  "SQL",
  "Git",
  "Responsive Design",
]

