import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Star, Calendar, MessageCircle, Users, BookOpen } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MentorsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Find Your Mentor</h1>
        <p className="text-muted-foreground">
          Connect with industry experts who can guide you through your career journey and help you develop in-demand
          skills.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Search mentors by name, expertise, or company..." />
        </div>
        <Button>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All Mentors</TabsTrigger>
          <TabsTrigger value="tech">Tech</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="tech" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors
              .filter((m) => m.category === "Tech")
              .map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="design" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors
              .filter((m) => m.category === "Design")
              .map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="business" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors
              .filter((m) => m.category === "Business")
              .map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MentorCardProps {
  mentor: any
}

function MentorCard({ mentor }: MentorCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <img src={mentor.image || "/placeholder.svg"} alt={mentor.name} className="object-cover w-full h-full" />
        {mentor.featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-yellow-500 hover:bg-yellow-600">
              <Star className="h-3 w-3 mr-1 fill-current" /> Featured
            </Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="font-bold">{mentor.name}</CardTitle>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{mentor.title}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {mentor.expertise.map((skill: string, i: number) => (
            <Badge key={i} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{mentor.availability}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{mentor.mentees} mentees</span>
          </div>
          <div className="flex items-center text-sm">
            <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{mentor.courses} courses</span>
          </div>
        </div>
        <p className="text-sm">{mentor.bio}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild className="flex-1">
          <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
        </Button>
        <Button variant="outline" className="flex-1">
          <MessageCircle className="h-4 w-4 mr-2" />
          Message
        </Button>
      </CardFooter>
    </Card>
  )
}

// Mock data for mentors
const mentors = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Frontend Developer at Google",
    category: "Tech",
    expertise: ["React", "JavaScript", "Career Guidance"],
    bio: "10+ years of experience in frontend development. I help junior developers improve their coding skills and prepare for tech interviews.",
    rating: 4.9,
    availability: "Evenings & Weekends",
    mentees: 24,
    courses: 2,
    image: "https://media.licdn.com/dms/image/v2/D5603AQHAKZQO7fFQDw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727097647438?e=1746662400&v=beta&t=goOHYT9Ugbw33g36ApRABkH4Bo75R6hV9oQy4zvQKxU",
    featured: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Product Manager at Microsoft",
    category: "Business",
    expertise: ["Product Management", "UX Design", "Interview Prep"],
    bio: "Passionate about product strategy and user experience. I can help you transition into product management or improve your PM skills.",
    rating: 4.8,
    availability: "Weekends",
    mentees: 18,
    courses: 1,
    image: "https://media.licdn.com/dms/image/v2/D5603AQGeA2bHY5giTQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1720014751158?e=1746662400&v=beta&t=WJVrqyoexjwghpkLa6HohjJErEbjFEROm1sI-yxhPgs",
    featured: false,
  },
  {
    id: "3",
    name: "Priya Patel",
    title: "DevOps Engineer at Amazon",
    category: "Tech",
    expertise: ["AWS", "CI/CD", "Cloud Architecture"],
    bio: "Specialized in cloud infrastructure and DevOps practices. I can help you master AWS and modern deployment strategies.",
    rating: 4.7,
    availability: "Flexible",
    mentees: 15,
    courses: 3,
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGxGxdKEe1Xzg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725023152834?e=1746662400&v=beta&t=Hz4ItYvByMGJc5h7DkWD65mxj079FfHvcCDoyv5s_EU",
    featured: false,
  },
  {
    id: "4",
    name: "David Wilson",
    title: "UX/UI Designer at Adobe",
    category: "Design",
    expertise: ["UI Design", "User Research", "Figma", "Portfolio Review"],
    bio: "Award-winning designer with a focus on creating intuitive user experiences. I can help you build a stunning portfolio and improve your design skills.",
    rating: 4.9,
    availability: "Weekdays",
    mentees: 30,
    courses: 4,
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
  },
  {
    id: "5",
    name: "Jennifer Lopez",
    title: "Marketing Director at Spotify",
    category: "Business",
    expertise: ["Digital Marketing", "Brand Strategy", "Growth"],
    bio: "Marketing expert with experience in both startups and large companies. I can help you develop effective marketing strategies and advance your career.",
    rating: 4.6,
    availability: "Evenings",
    mentees: 12,
    courses: 2,
    image: "https://media.licdn.com/dms/image/v2/D5603AQFo7XVR268H3A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723267505380?e=1746662400&v=beta&t=5ouVMt5TfN23QVLea6F4v4l25Oww5u1XS4lKr154D94",
    featured: false,
  },
  {
    id: "6",
    name: "Alex Rodriguez",
    title: "Full Stack Developer at Netflix",
    category: "Tech",
    expertise: ["Node.js", "React", "System Design", "Career Transition"],
    bio: "Self-taught developer who transitioned from finance to tech. I specialize in helping career changers break into the tech industry.",
    rating: 4.8,
    availability: "Weekends",
    mentees: 22,
    courses: 1,
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
  },
]

