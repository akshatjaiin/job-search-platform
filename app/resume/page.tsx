"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Eye, Save } from "lucide-react"
import ResumeForm from "@/components/resume-form"
import ResumePreview from "@/components/resume-preview"

export default function ResumePage() {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    summary: "",
    education: [{ institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" }],
    experience: [{ company: "", position: "", startDate: "", endDate: "", description: "", location: "" }],
    skills: [],
    projects: [{ title: "", description: "", technologies: "", link: "" }],
    certifications: [{ name: "", issuer: "", date: "", link: "" }],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <p className="text-muted-foreground">Create a professional resume that stands out to employers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit Resume</TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Resume Information</CardTitle>
              <CardDescription>
                Fill out the sections below to create your resume. All fields can be edited later.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Clear Form</Button>
              <Button>Save and Continue</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
              <CardDescription>This is how your resume will look to employers</CardDescription>
            </CardHeader>
            <CardContent>
              <ResumePreview resumeData={resumeData} />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/resume/analysis">Analyze Resume</Link>
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

