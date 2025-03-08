"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileUp, BarChart, Briefcase } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function ResumeAnalysisPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!file) return

    setIsAnalyzing(true)
    try {
      // In a real app, you would upload the file and get analysis
      // For demo purposes, we'll simulate a delay and use mock data
      setTimeout(() => {
        setAnalysis({
          score: 78,
          strengths: [
            "Clear education section with relevant degree",
            "Good use of action verbs in experience descriptions",
            "Includes quantifiable achievements",
          ],
          improvements: [
            "Add more keywords relevant to target jobs",
            "Expand on technical skills section",
            "Include more specific project outcomes",
          ],
          keywords: {
            present: ["React", "JavaScript", "Frontend", "UI/UX", "Testing"],
            missing: ["TypeScript", "Node.js", "API Integration", "Responsive Design"],
          },
          jobMatches: [
            {
              id: "1",
              title: "Frontend Developer",
              company: "TechCorp",
              match: 85,
            },
            {
              id: "3",
              title: "Full Stack Developer",
              company: "WebSolutions",
              match: 72,
            },
            {
              id: "7",
              title: "Mobile Developer",
              company: "AppWorks",
              match: 68,
            },
          ],
        })
        setIsAnalyzing(false)
      }, 2000)
    } catch (error) {
      console.error("Error analyzing resume:", error)
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Resume Analysis</h1>
        <p className="text-muted-foreground">
          Get AI-powered feedback on your resume and see how it matches with job listings
        </p>
      </div>

      {!analysis ? (
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Resume</CardTitle>
            <CardDescription>Upload your resume in PDF or DOCX format for analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <FileUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="mb-2 font-medium">Drag and drop your resume here</p>
              <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <Button onClick={() => document.getElementById("resume-upload")?.click()}>Select Resume</Button>
              {file && <p className="mt-2 text-sm">{file.name}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAnalyze} disabled={!file || isAnalyzing} className="w-full">
              {isAnalyzing ? (
                <>
                  <BarChart className="mr-2 h-4 w-4 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart className="mr-2 h-4 w-4" />
                  Analyze Resume
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="feedback">Detailed Feedback</TabsTrigger>
            <TabsTrigger value="jobs">Job Matches</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Resume Analysis Overview</CardTitle>
                <CardDescription>Here's how your resume scores and what you can improve</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Overall Score</h3>
                    <span className="font-medium">{analysis.score}/100</span>
                  </div>
                  <Progress value={analysis.score} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Strengths</h3>
                    <ul className="space-y-2">
                      {analysis.strengths.map((strength: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Areas to Improve</h3>
                    <ul className="space-y-2">
                      {analysis.improvements.map((improvement: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="text-amber-500 mr-2">!</span>
                          <span className="text-sm">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Top Job Matches</h3>
                  <div className="space-y-3">
                    {analysis.jobMatches.slice(0, 3).map((job: any) => (
                      <div key={job.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">{job.match}% Match</span>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/jobs/${job.id}`}>View Job</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setAnalysis(null)}>
                  Upload New Resume
                </Button>
                <Button asChild>
                  <Link href="/resume">Improve Resume</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Feedback</CardTitle>
                <CardDescription>Specific recommendations to improve your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Keyword Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Keywords Present</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywords.present.map((keyword: string, i: number) => (
                          <Badge key={i} variant="outline" className="bg-green-50">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Suggested Keywords to Add</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywords.missing.map((keyword: string, i: number) => (
                          <Badge key={i} variant="outline" className="bg-amber-50">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Section-by-Section Feedback</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">Professional Summary</h4>
                      <p className="text-sm mb-2">
                        Your summary is concise but could be more impactful. Consider highlighting your unique value
                        proposition and aligning it with your target roles.
                      </p>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <p className="font-medium mb-1">Suggestion:</p>
                        <p>
                          "Results-driven frontend developer with a passion for creating responsive, user-friendly web
                          applications. Experienced in React and JavaScript with a focus on performance optimization and
                          accessibility."
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">Work Experience</h4>
                      <p className="text-sm mb-2">
                        Your experience section uses good action verbs but lacks quantifiable achievements. Add metrics
                        to demonstrate your impact.
                      </p>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <p className="font-medium mb-1">Example:</p>
                        <p>
                          Instead of "Developed responsive web applications," try "Developed 3 responsive web
                          applications that increased user engagement by 27% and reduced bounce rate by 15%."
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">Skills Section</h4>
                      <p className="text-sm mb-2">
                        Your skills section is too generic. Organize skills by category and include proficiency levels
                        for technical skills.
                      </p>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <p className="font-medium mb-1">Suggestion:</p>
                        <p>
                          Group skills into categories like "Frontend Development," "Backend Technologies," and "Tools &
                          Methodologies" for better readability.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/resume">Apply These Improvements</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Job Matches</CardTitle>
                <CardDescription>Jobs that match your skills and experience based on your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.jobMatches.map((job: any) => (
                    <div key={job.id} className="p-4 border rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            job.match >= 80
                              ? "bg-green-50 text-green-700"
                              : job.match >= 60
                                ? "bg-amber-50 text-amber-700"
                                : "bg-gray-50"
                          }
                        >
                          {job.match}% Match
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium mb-1">Why this is a good match:</p>
                          <p className="text-sm">
                            Your experience with {analysis.keywords.present.slice(0, 3).join(", ")} aligns well with the
                            job requirements.
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Skills to highlight:</p>
                          <div className="flex flex-wrap gap-2">
                            {analysis.keywords.present.slice(0, 4).map((skill: string, i: number) => (
                              <Badge key={i} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Skills to develop:</p>
                          <div className="flex flex-wrap gap-2">
                            {analysis.keywords.missing.slice(0, 2).map((skill: string, i: number) => (
                              <Badge key={i} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button asChild>
                          <Link href={`/jobs/${job.id}`}>
                            <Briefcase className="mr-2 h-4 w-4" />
                            View Job
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

