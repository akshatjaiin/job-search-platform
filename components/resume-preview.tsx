import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Mail, MapPin, Phone, Globe, Linkedin, FolderGit2 } from "lucide-react"

interface ResumePreviewProps {
  resumeData: any
}

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  const { personalInfo, summary, education, experience, skills, projects } = resumeData

  return (
    <div className="bg-white p-8 border rounded-lg shadow-sm max-w-4xl mx-auto text-black">
      {/* Header */}
      <div className="text-center mb-6 pb-6 border-b">
        <h1 className="text-3xl font-bold mb-2 text-black">{personalInfo.name || "Your Name"}</h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-1" />
              {personalInfo.linkedin}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              {personalInfo.website}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-black">Professional Summary</h2>
          <p className="text-sm text-gray-800">{summary}</p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && education[0].institution && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center text-black">
            <GraduationCap className="h-5 w-5 mr-2" />
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu: any, index: number) => (
              <div key={index} className="border-l-2 pl-4 py-1">
                <div className="flex justify-between">
                  <h3 className="font-medium text-black">{edu.institution}</h3>
                  <p className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                <p className="text-sm text-gray-800">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </p>
                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && experience[0].company && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center text-black">
            <Briefcase className="h-5 w-5 mr-2" />
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp: any, index: number) => (
              <div key={index} className="border-l-2 pl-4 py-1">
                <div className="flex justify-between">
                  <h3 className="font-medium text-black">{exp.position}</h3>
                  <p className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </p>
                </div>
                <p className="text-sm mb-2 text-gray-700">
                  {exp.company} {exp.location && `| ${exp.location}`}
                </p>
                <p className="text-sm text-gray-800">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-black">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-gray-800 bg-gray-100">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && projects[0].title && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center text-black">
            <FolderGit2 className="h-5 w-5 mr-2" />
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project: any, index: number) => (
              <div key={index} className="border-l-2 pl-4 py-1">
                <div className="flex justify-between">
                  <h3 className="font-medium text-black">{project.title}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary">
                      View Project
                    </a>
                  )}
                </div>
                {project.technologies && (
                  <p className="text-sm text-gray-600 mb-1">Technologies: {project.technologies}</p>
                )}
                <p className="text-sm text-gray-800">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

