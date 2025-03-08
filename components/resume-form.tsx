"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Trash2 } from "lucide-react"

interface ResumeFormProps {
  resumeData: any
  setResumeData: (data: any) => void
}

export default function ResumeForm({ resumeData, setResumeData }: ResumeFormProps) {
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    })
  }

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData({
      ...resumeData,
      summary: e.target.value,
    })
  }

  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newEducation = [...resumeData.education]
    newEducation[index] = { ...newEducation[index], [name]: value }
    setResumeData({
      ...resumeData,
      education: newEducation,
    })
  }

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" },
      ],
    })
  }

  const removeEducation = (index: number) => {
    const newEducation = [...resumeData.education]
    newEducation.splice(index, 1)
    setResumeData({
      ...resumeData,
      education: newEducation,
    })
  }

  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newExperience = [...resumeData.experience]
    newExperience[index] = { ...newExperience[index], [name]: value }
    setResumeData({
      ...resumeData,
      experience: newExperience,
    })
  }

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { company: "", position: "", startDate: "", endDate: "", description: "", location: "" },
      ],
    })
  }

  const removeExperience = (index: number) => {
    const newExperience = [...resumeData.experience]
    newExperience.splice(index, 1)
    setResumeData({
      ...resumeData,
      experience: newExperience,
    })
  }

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim())
    setResumeData({
      ...resumeData,
      skills,
    })
  }

  const handleProjectChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newProjects = [...resumeData.projects]
    newProjects[index] = { ...newProjects[index], [name]: value }
    setResumeData({
      ...resumeData,
      projects: newProjects,
    })
  }

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, { title: "", description: "", technologies: "", link: "" }],
    })
  }

  const removeProject = (index: number) => {
    const newProjects = [...resumeData.projects]
    newProjects.splice(index, 1)
    setResumeData({
      ...resumeData,
      projects: newProjects,
    })
  }

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible defaultValue="personal-info">
        <AccordionItem value="personal-info">
          <AccordionTrigger>Personal Information</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={resumeData.personalInfo.name}
                  onChange={handlePersonalInfoChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                  placeholder="(123) 456-7890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={resumeData.personalInfo.location}
                  onChange={handlePersonalInfoChange}
                  placeholder="City, State"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={resumeData.personalInfo.linkedin}
                  onChange={handlePersonalInfoChange}
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website/Portfolio</Label>
                <Input
                  id="website"
                  name="website"
                  value={resumeData.personalInfo.website}
                  onChange={handlePersonalInfoChange}
                  placeholder="johndoe.com"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="summary">
          <AccordionTrigger>Professional Summary</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={resumeData.summary}
                onChange={handleSummaryChange}
                placeholder="A brief summary of your professional background and career goals"
                className="min-h-[100px]"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger>Education</AccordionTrigger>
          <AccordionContent>
            {resumeData.education.map((edu: any, index: number) => (
              <div key={index} className="p-4 border rounded-md mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Education #{index + 1}</h4>
                  {resumeData.education.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${index}`}>Institution</Label>
                    <Input
                      id={`institution-${index}`}
                      name="institution"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="University Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${index}`}>Degree</Label>
                    <Input
                      id={`degree-${index}`}
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`field-${index}`}>Field of Study</Label>
                    <Input
                      id={`field-${index}`}
                      name="field"
                      value={edu.field}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`gpa-${index}`}>GPA (Optional)</Label>
                    <Input
                      id={`gpa-${index}`}
                      name="gpa"
                      value={edu.gpa}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="3.8/4.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                    <Input
                      id={`startDate-${index}`}
                      name="startDate"
                      value={edu.startDate}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${index}`}>End Date (or Expected)</Label>
                    <Input
                      id={`endDate-${index}`}
                      name="endDate"
                      value={edu.endDate}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="MM/YYYY or Present"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addEducation} className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger>Work Experience</AccordionTrigger>
          <AccordionContent>
            {resumeData.experience.map((exp: any, index: number) => (
              <div key={index} className="p-4 border rounded-md mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Experience #{index + 1}</h4>
                  {resumeData.experience.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`company-${index}`}>Company</Label>
                    <Input
                      id={`company-${index}`}
                      name="company"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`position-${index}`}>Position</Label>
                    <Input
                      id={`position-${index}`}
                      name="position"
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`location-${index}`}>Location</Label>
                    <Input
                      id={`location-${index}`}
                      name="location"
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="City, State or Remote"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      name="description"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Describe your responsibilities and achievements"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-exp-${index}`}>Start Date</Label>
                    <Input
                      id={`startDate-exp-${index}`}
                      name="startDate"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-exp-${index}`}>End Date</Label>
                    <Input
                      id={`endDate-exp-${index}`}
                      name="endDate"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="MM/YYYY or Present"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addExperience} className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills">
          <AccordionTrigger>Skills</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input
                id="skills"
                value={resumeData.skills.join(", ")}
                onChange={handleSkillsChange}
                placeholder="JavaScript, React, Node.js, TypeScript, HTML, CSS"
              />
              <p className="text-sm text-muted-foreground">
                Separate each skill with a comma. Include technical skills, soft skills, and tools you're proficient
                with.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="projects">
          <AccordionTrigger>Projects</AccordionTrigger>
          <AccordionContent>
            {resumeData.projects.map((project: any, index: number) => (
              <div key={index} className="p-4 border rounded-md mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Project #{index + 1}</h4>
                  {resumeData.projects.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeProject(index)} className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${index}`}>Project Title</Label>
                    <Input
                      id={`title-${index}`}
                      name="title"
                      value={project.title}
                      onChange={(e) => handleProjectChange(index, e)}
                      placeholder="E-commerce Website"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`technologies-${index}`}>Technologies Used</Label>
                    <Input
                      id={`technologies-${index}`}
                      name="technologies"
                      value={project.technologies}
                      onChange={(e) => handleProjectChange(index, e)}
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`description-proj-${index}`}>Description</Label>
                    <Textarea
                      id={`description-proj-${index}`}
                      name="description"
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, e)}
                      placeholder="Describe the project, your role, and the impact"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`link-${index}`}>Project Link (Optional)</Label>
                    <Input
                      id={`link-${index}`}
                      name="link"
                      value={project.link}
                      onChange={(e) => handleProjectChange(index, e)}
                      placeholder="https://github.com/yourusername/project"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addProject} className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

