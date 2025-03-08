import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, Brain, BarChart, Award, Clock, BookOpen, GraduationCap, MessageCircle } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Your Career Dashboard</h1>
        <p className="text-muted-foreground">
          Track your job search progress and improve your chances of landing your dream job.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Resume Builder
            </CardTitle>
            <CardDescription>Create and optimize your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Build a professional resume with our templates and get AI-powered feedback to stand out.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/resume">Build Resume</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-primary" />
              Resume Analysis
            </CardTitle>
            <CardDescription>Get feedback on your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Upload your existing resume for AI analysis and receive personalized improvement suggestions.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/resume/analysis">Analyze Resume</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Find Mentors
            </CardTitle>
            <CardDescription>Connect with industry experts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Get guidance from experienced professionals who can help you navigate your career path.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/mentors">Browse Mentors</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-primary" />
              Community Forum
            </CardTitle>
            <CardDescription>Join discussions with peers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Ask questions, share experiences, and get advice from the Placement.ai community.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/forum">Join Forum</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Referral Network
            </CardTitle>
            <CardDescription>Get referred by industry professionals</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Connect with professionals who can refer you to job openings at their companies.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/referrals">Find Referrals</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5 text-primary" />
              Career Advisor
            </CardTitle>
            <CardDescription>Get personalized career guidance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Chat with our AI career advisor to get personalized job recommendations and advice.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/advisor">Talk to Advisor</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              Focus Monitor
            </CardTitle>
            <CardDescription>Improve your attention span</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Track and improve your focus during job applications and skill learning sessions.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/focus">Start Focusing</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-primary" />
              Your Progress
            </CardTitle>
            <CardDescription>Track your job search journey</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Monitor your applications, interviews, and skill development progress.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/progress">View Progress</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-primary" />
              Skill Assessments
            </CardTitle>
            <CardDescription>Test your knowledge and identify skill gaps</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Take AI-powered assessments to evaluate your skills and get personalized learning recommendations.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/assessments">Take Assessments</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-primary" />
              Student Dashboard
            </CardTitle>
            <CardDescription>Track your learning progress</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">View your learning statistics, career roadmap, and manage your job search tasks.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/student-dashboard">View Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              Career Blog
            </CardTitle>
            <CardDescription>Expert advice and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Read articles on resume writing, interview preparation, and career development.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/blog">Read Articles</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-blue-500" />
              Telegram Bot
            </CardTitle>
            <CardDescription>Get job alerts and career tips</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Connect with our Telegram bot for instant job notifications and career advice on the go.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
              <a href="http://t.me/placement01_bot" target="_blank" rel="noopener noreferrer">
                Join Now
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

