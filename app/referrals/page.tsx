"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Users, Award, Gift, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ReferralsPage() {
  const [activeTab, setActiveTab] = useState("find")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Referral Network</h1>
        <p className="text-muted-foreground">
          Connect with professionals who can refer you to job openings at their companies
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <Tabs defaultValue="find" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="find">Find Referrers</TabsTrigger>
              <TabsTrigger value="my">My Referrals</TabsTrigger>
            </TabsList>
            <TabsContent value="find">
              <CardHeader>
                <CardTitle>Find Professionals for Referrals</CardTitle>
                <CardDescription>Search for professionals working at companies you're interested in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by company, job title, or skill..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>

                <div className="space-y-4">
                  {referrers.map((referrer) => (
                    <Card key={referrer.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                            <AvatarFallback>{referrer.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">{referrer.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {referrer.title} at {referrer.company}
                                </p>
                              </div>
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                {referrer.points} Points
                              </Badge>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm mb-2">{referrer.bio}</p>
                              <div className="flex flex-wrap gap-2">
                                {referrer.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button>Request Referral</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </TabsContent>
            <TabsContent value="my">
              <CardHeader>
                <CardTitle>My Referrals</CardTitle>
                <CardDescription>Track the status of your referral requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myReferrals.map((referral) => (
                    <Card key={referral.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                            <AvatarFallback>{referral.referrer.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">{referral.company}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Referred by {referral.referrer} for {referral.position}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  referral.status === "Accepted"
                                    ? "bg-green-50 text-green-700"
                                    : referral.status === "Pending"
                                      ? "bg-amber-50 text-amber-700"
                                      : "bg-red-50 text-red-700"
                                }
                              >
                                {referral.status}
                              </Badge>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm">
                                <span className="font-medium">Requested:</span> {referral.requestDate}
                              </p>
                              {referral.status === "Accepted" && (
                                <p className="text-sm">
                                  <span className="font-medium">Accepted:</span> {referral.responseDate}
                                </p>
                              )}
                              {referral.notes && <p className="text-sm mt-2">{referral.notes}</p>}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                          {referral.status === "Accepted" && (
                            <Button asChild>
                              <Link href={`/jobs/${referral.jobId}`}>View Job</Link>
                            </Button>
                          )}
                          <Button variant="outline">Send Message</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary" />
                Your Referral Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">150</p>
                <p className="text-sm text-muted-foreground">Points Available</p>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Total Earned:</span> 250 points
                </p>
                <p className="text-sm">
                  <span className="font-medium">Points Used:</span> 100 points
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Gift className="mr-2 h-4 w-4" />
                Redeem Points
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Request Referrals</p>
                  <p className="text-xs text-muted-foreground">
                    Search for professionals and request referrals using your points
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Earn Points</p>
                  <p className="text-xs text-muted-foreground">
                    Earn points by referring others, completing your profile, and more
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                  <Gift className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Redeem Rewards</p>
                  <p className="text-xs text-muted-foreground">
                    Use your points for premium features, resume reviews, and more
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Mock data
const referrers = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    bio: "I've been at TechCorp for 3 years and can refer candidates for engineering roles. Happy to review resumes and provide feedback.",
    skills: ["React", "JavaScript", "TypeScript", "Frontend"],
    points: 450,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Product Manager",
    company: "DataSystems",
    bio: "Working on the analytics team at DataSystems. Can refer for product, design, and engineering positions.",
    skills: ["Product Management", "Data Analytics", "UX Research"],
    points: 320,
  },
  {
    id: 3,
    name: "Priya Patel",
    title: "DevOps Engineer",
    company: "CloudTech",
    bio: "DevOps specialist with connections in the infrastructure team. Looking to help new grads break into tech.",
    skills: ["AWS", "Kubernetes", "CI/CD", "Infrastructure"],
    points: 280,
  },
]

const myReferrals = [
  {
    id: 1,
    company: "TechCorp",
    position: "Junior Frontend Developer",
    referrer: "Sarah Johnson",
    status: "Accepted",
    requestDate: "May 15, 2023",
    responseDate: "May 18, 2023",
    notes: "Your application has been forwarded to the hiring manager. Good luck!",
    jobId: "1",
  },
  {
    id: 2,
    company: "DataSystems",
    position: "Associate Product Manager",
    referrer: "Michael Chen",
    status: "Pending",
    requestDate: "May 20, 2023",
    notes: null,
    jobId: "2",
  },
]

