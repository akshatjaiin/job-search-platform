"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, Clock, Code, Brain, FileText } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState("available")
  const [currentTest, setCurrentTest] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [testCompleted, setTestCompleted] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)

  const startTest = (test: any) => {
    setCurrentTest(test)
    setCurrentQuestion(0)
    setAnswers({})
    setTestCompleted(false)
    setTestResults(null)
  }

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer })
  }

  const nextQuestion = () => {
    if (currentQuestion < currentTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      completeTest()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const completeTest = () => {
    // Calculate results
    let correctAnswers = 0
    Object.keys(answers).forEach((questionIndex) => {
      const qIndex = Number.parseInt(questionIndex)
      if (answers[qIndex] === currentTest.questions[qIndex].correctAnswer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / currentTest.questions.length) * 100)

    // Generate feedback based on score
    let feedback = ""
    let skillGaps = []

    if (score >= 80) {
      feedback = "Excellent! You have a strong understanding of this subject."
      skillGaps = ["Advanced concepts", "Real-world application"]
    } else if (score >= 60) {
      feedback = "Good job! You have a solid foundation but there's room for improvement."
      skillGaps = currentTest.skillGaps.intermediate
    } else {
      feedback = "You should focus on strengthening your knowledge in this area."
      skillGaps = currentTest.skillGaps.beginner
    }

    setTestResults({
      score,
      correctAnswers,
      totalQuestions: currentTest.questions.length,
      feedback,
      skillGaps,
      recommendedResources: currentTest.recommendedResources,
    })

    setTestCompleted(true)
  }

  const resetTest = () => {
    setCurrentTest(null)
    setTestCompleted(false)
    setTestResults(null)
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
        <h1 className="text-3xl font-bold">Skill Assessments</h1>
        <p className="text-muted-foreground">
          Test your knowledge and identify areas for improvement with our AI-powered assessments
        </p>
      </div>

      {!currentTest ? (
        <Tabs defaultValue="available" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">Available Tests</TabsTrigger>
            <TabsTrigger value="completed">Completed Tests</TabsTrigger>
            <TabsTrigger value="recommended">Recommended for You</TabsTrigger>
          </TabsList>
          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableTests.map((test) => (
                <Card key={test.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center">
                        {test.icon === "code" && <Code className="mr-2 h-5 w-5 text-primary" />}
                        {test.icon === "brain" && <Brain className="mr-2 h-5 w-5 text-primary" />}
                        {test.icon === "file" && <FileText className="mr-2 h-5 w-5 text-primary" />}
                        {test.title}
                      </CardTitle>
                      <Badge variant="outline">{test.level}</Badge>
                    </div>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {test.timeEstimate}
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        {test.questions.length} questions
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => startTest(test)} className="w-full">
                      Start Assessment
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedTests.map((test) => (
                <Card key={test.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center">
                        {test.icon === "code" && <Code className="mr-2 h-5 w-5 text-primary" />}
                        {test.icon === "brain" && <Brain className="mr-2 h-5 w-5 text-primary" />}
                        {test.icon === "file" && <FileText className="mr-2 h-5 w-5 text-primary" />}
                        {test.title}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={
                          test.score >= 80
                            ? "bg-green-50 text-green-700"
                            : test.score >= 60
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-700"
                        }
                      >
                        {test.score}%
                      </Badge>
                    </div>
                    <CardDescription>Completed on {test.completedDate}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Score</span>
                        <span className="font-medium">{test.score}%</span>
                      </div>
                      <Progress value={test.score} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/ai?skill=${encodeURIComponent(test.title)}`}>Learn More</Link>
                    </Button>
                    <Button size="sm" onClick={() => startTest(availableTests.find((t) => t.id === test.id))}>
                      Retake Test
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recommended">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedTests.map((test) => (
                <Card key={test.id} className="overflow-hidden border-primary/20">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center">
                        {test.icon === "code" && <Code className="mr-2 h-5 w-5 text-primary" />}
                        {test.icon === "brain" && <Brain className="mr-2 h-5 w-5 text-primary" />}
                        {test.icon === "file" && <FileText className="mr-2 h-5 w-5 text-primary" />}
                        {test.title}
                      </CardTitle>
                      <Badge variant="outline">{test.level}</Badge>
                    </div>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {test.timeEstimate}
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        {test.questions.length} questions
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Why recommended:</span> {test.whyRecommended}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => startTest(test)} className="w-full">
                      Start Assessment
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : !testCompleted ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{currentTest.title} Assessment</CardTitle>
              <Button variant="ghost" size="sm" onClick={resetTest}>
                Exit
              </Button>
            </div>
            <CardDescription>
              Question {currentQuestion + 1} of {currentTest.questions.length}
            </CardDescription>
            <Progress value={((currentQuestion + 1) / currentTest.questions.length) * 100} className="h-2 mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">{currentTest.questions[currentQuestion].question}</h3>
              <RadioGroup value={answers[currentQuestion] || ""} onValueChange={handleAnswer} className="space-y-3">
                {currentTest.questions[currentQuestion].options.map((option: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
              Previous
            </Button>
            <Button onClick={nextQuestion}>
              {currentQuestion === currentTest.questions.length - 1 ? "Finish" : "Next"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Assessment Results</CardTitle>
            <CardDescription>{currentTest.title} - Completed just now</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center rounded-full bg-muted p-8 mb-4">
                <span className="text-4xl font-bold">{testResults.score}%</span>
              </div>
              <h3 className="text-xl font-medium mb-2">
                {testResults.score >= 80 ? "Excellent!" : testResults.score >= 60 ? "Good job!" : "Keep practicing!"}
              </h3>
              <p className="text-muted-foreground">
                You answered {testResults.correctAnswers} out of {testResults.totalQuestions} questions correctly.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Feedback</h3>
              <p>{testResults.feedback}</p>

              <h3 className="text-lg font-medium mt-4">Areas to Improve</h3>
              <ul className="space-y-2">
                {testResults.skillGaps.map((gap: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-medium mt-4">Recommended Resources</h3>
              <div className="space-y-2">
                {testResults.recommendedResources.map((resource: any, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground">{resource.type}</p>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <a href={resource.link} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetTest}>
              Back to Assessments
            </Button>
            <Button asChild>
              <Link href={`/ai?skill=${encodeURIComponent(currentTest.title)}`}>Learn This Skill</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

// Mock data
const availableTests = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics including variables, functions, and control flow.",
    icon: "code",
    level: "Beginner",
    timeEstimate: "15 minutes",
    questions: [
      {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Symbol"],
        correctAnswer: "Float",
      },
      {
        question: "What will the following code output? console.log(typeof [])",
        options: ["array", "object", "undefined", "null"],
        correctAnswer: "object",
      },
      {
        question: "Which method is used to add elements to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: "push()",
      },
      {
        question: "What is the correct way to create a function in JavaScript?",
        options: [
          "function = myFunction() {}",
          "function myFunction() {}",
          "function:myFunction() {}",
          "create function myFunction() {}",
        ],
        correctAnswer: "function myFunction() {}",
      },
      {
        question: "Which operator is used for strict equality comparison?",
        options: ["==", "===", "=", "!="],
        correctAnswer: "===",
      },
    ],
    skillGaps: {
      beginner: [
        "Understanding JavaScript data types",
        "Working with arrays and array methods",
        "Function declaration and expressions",
        "Equality operators and type coercion",
      ],
      intermediate: ["Scope and closures", "Asynchronous JavaScript", "Error handling"],
    },
    recommendedResources: [
      {
        title: "JavaScript Fundamentals Course",
        type: "Online Course",
        link: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
      },
      {
        title: "JavaScript: The Good Parts",
        type: "Book",
        link: "https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742",
      },
      {
        title: "MDN JavaScript Guide",
        type: "Documentation",
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
      },
    ],
  },
  {
    id: "2",
    title: "React Basics",
    description: "Assess your understanding of React components, props, state, and hooks.",
    icon: "code",
    level: "Intermediate",
    timeEstimate: "20 minutes",
    questions: [
      {
        question: "What is JSX in React?",
        options: [
          "A JavaScript library",
          "A syntax extension for JavaScript that looks similar to HTML",
          "A database for React",
          "A testing framework for React",
        ],
        correctAnswer: "A syntax extension for JavaScript that looks similar to HTML",
      },
      {
        question: "Which hook is used to perform side effects in a function component?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctAnswer: "useEffect",
      },
      {
        question: "What is the correct way to update state in a React component?",
        options: [
          "this.state.count = this.state.count + 1",
          "this.setState({ count: this.state.count + 1 })",
          "state.count = state.count + 1",
          "setState(count + 1)",
        ],
        correctAnswer: "this.setState({ count: this.state.count + 1 })",
      },
      {
        question: "What are props in React?",
        options: ["Internal component state", "CSS properties", "Properties passed to a component", "HTML attributes"],
        correctAnswer: "Properties passed to a component",
      },
      {
        question: "Which of the following is NOT a React hook?",
        options: ["useState", "useEffect", "useHistory", "useComponent"],
        correctAnswer: "useComponent",
      },
    ],
    skillGaps: {
      beginner: ["Understanding React components", "Props vs State", "JSX syntax", "React hooks basics"],
      intermediate: ["Component lifecycle", "Context API", "Performance optimization", "Custom hooks"],
    },
    recommendedResources: [
      {
        title: "React Official Documentation",
        type: "Documentation",
        link: "https://reactjs.org/docs/getting-started.html",
      },
      {
        title: "React - The Complete Guide",
        type: "Online Course",
        link: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
      },
      {
        title: "React Hooks Tutorial",
        type: "Tutorial",
        link: "https://www.valentinog.com/blog/hooks/",
      },
    ],
  },
  {
    id: "3",
    title: "Technical Interview Prep",
    description: "Practice common technical interview questions and improve your problem-solving skills.",
    icon: "brain",
    level: "Advanced",
    timeEstimate: "30 minutes",
    questions: [
      {
        question: "What is the time complexity of searching for an element in a balanced binary search tree?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(log n)",
      },
      {
        question: "Which data structure would be most efficient for implementing a priority queue?",
        options: ["Array", "Linked List", "Heap", "Hash Table"],
        correctAnswer: "Heap",
      },
      {
        question:
          "What is the output of the following code?\n\nfunction foo() {\n  console.log(a);\n  var a = 1;\n  console.log(a);\n}\nfoo();",
        options: ["undefined, 1", "1, 1", "Error", "null, 1"],
        correctAnswer: "undefined, 1",
      },
      {
        question: "Which sorting algorithm has the best average-case time complexity?",
        options: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Selection Sort"],
        correctAnswer: "Quick Sort",
      },
      {
        question: "What is a closure in JavaScript?",
        options: [
          "A way to close a browser window",
          "A function that has access to variables in its outer lexical environment",
          "A method to close database connections",
          "A design pattern for object creation",
        ],
        correctAnswer: "A function that has access to variables in its outer lexical environment",
      },
    ],
    skillGaps: {
      beginner: [
        "Basic data structures",
        "Time and space complexity",
        "JavaScript fundamentals",
        "Problem-solving approach",
      ],
      intermediate: [
        "Advanced algorithms",
        "System design basics",
        "JavaScript closures and scope",
        "Optimization techniques",
      ],
    },
    recommendedResources: [
      {
        title: "Cracking the Coding Interview",
        type: "Book",
        link: "https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850",
      },
      {
        title: "LeetCode",
        type: "Practice Platform",
        link: "https://leetcode.com/",
      },
      {
        title: "System Design Primer",
        type: "GitHub Repository",
        link: "https://github.com/donnemartin/system-design-primer",
      },
    ],
  },
]

const completedTests = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    icon: "code",
    score: 80,
    completedDate: "May 15, 2023",
  },
  {
    id: "3",
    title: "Technical Interview Prep",
    icon: "brain",
    score: 65,
    completedDate: "May 20, 2023",
  },
]

const recommendedTests = [
  {
    id: "2",
    title: "React Basics",
    description: "Assess your understanding of React components, props, state, and hooks.",
    icon: "code",
    level: "Intermediate",
    timeEstimate: "  props, state, and hooks.",
    icon: "code",
    level: "Intermediate",
    timeEstimate: "20 minutes",
    questions: [
      {
        question: "What is JSX in React?",
        options: [
          "A JavaScript library",
          "A syntax extension for JavaScript that looks similar to HTML",
          "A database for React",
          "A testing framework for React",
        ],
        correctAnswer: "A syntax extension for JavaScript that looks similar to HTML",
      },
      {
        question: "Which hook is used to perform side effects in a function component?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctAnswer: "useEffect",
      },
      {
        question: "What is the correct way to update state in a React component?",
        options: [
          "this.state.count = this.state.count + 1",
          "this.setState({ count: this.state.count + 1 })",
          "state.count = state.count + 1",
          "setState(count + 1)",
        ],
        correctAnswer: "this.setState({ count: this.state.count + 1 })",
      },
      {
        question: "What are props in React?",
        options: ["Internal component state", "CSS properties", "Properties passed to a component", "HTML attributes"],
        correctAnswer: "Properties passed to a component",
      },
      {
        question: "Which of the following is NOT a React hook?",
        options: ["useState", "useEffect", "useHistory", "useComponent"],
        correctAnswer: "useComponent",
      },
    ],
    whyRecommended:
      "Based on your JavaScript skills, learning React would be a natural next step for frontend development.",
  },
]

