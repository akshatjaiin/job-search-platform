"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Pause, RotateCcw, Bell, Volume2, VolumeX } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FocusPage() {
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [initialTime, setInitialTime] = useState(25 * 60)
  const [breaks, setBreaks] = useState(0)
  const [sessions, setSessions] = useState(0)
  const [sound, setSound] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive && time > 0) {
      timerRef.current = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (time === 0) {
      handleTimerComplete()
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isActive, time])

  const handleTimerComplete = () => {
    if (sound) {
      // Play sound
      const audio = new Audio("/notification.mp3")
      audio.play()
    }

    if (notifications) {
      // Show notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Focus Timer Complete", {
          body: "Time to take a break!",
          icon: "/favicon.ico",
        })
      }
    }

    // If it was a focus session, increment sessions and start a break
    if (initialTime >= 15 * 60) {
      setSessions(sessions + 1)
      setInitialTime(5 * 60) // 5 minute break
      setTime(5 * 60)
    } else {
      // If it was a break, increment breaks and start a focus session
      setBreaks(breaks + 1)
      setInitialTime(25 * 60) // 25 minute focus
      setTime(25 * 60)
    }

    setIsActive(false)
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setTime(initialTime)
    setIsActive(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0] * 60
    setInitialTime(newTime)
    setTime(newTime)
  }

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      if (permission !== "granted") {
        setNotifications(false)
      }
    }
  }

  useEffect(() => {
    if (notifications) {
      requestNotificationPermission()
    }
  }, [notifications])

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Focus Monitor</h1>
        <p className="text-muted-foreground">Improve your attention span and productivity with timed focus sessions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Focus Timer</CardTitle>
            <CardDescription>
              Use the Pomodoro Technique to maintain focus during job applications and learning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center">
              <div className="text-6xl font-bold tabular-nums mb-8">{formatTime(time)}</div>
              <Progress value={(time / initialTime) * 100} className="w-full h-2 mb-4" />
              <div className="flex gap-4">
                <Button size="lg" onClick={toggleTimer}>
                  {isActive ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                  {isActive ? "Pause" : "Start"}
                </Button>
                <Button size="lg" variant="outline" onClick={resetTimer}>
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Session Length (minutes)</h3>
              <Tabs defaultValue="pomodoro" className="w-full">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="pomodoro" onClick={() => handleTimeChange([25])}>
                    Pomodoro (25)
                  </TabsTrigger>
                  <TabsTrigger value="short" onClick={() => handleTimeChange([5])}>
                    Short Break (5)
                  </TabsTrigger>
                  <TabsTrigger value="long" onClick={() => handleTimeChange([15])}>
                    Long Break (15)
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="pomodoro" className="pt-4">
                  <Slider defaultValue={[25]} max={60} min={5} step={5} onValueChange={handleTimeChange} />
                </TabsContent>
                <TabsContent value="short" className="pt-4">
                  <Slider defaultValue={[5]} max={10} min={1} step={1} onValueChange={handleTimeChange} />
                </TabsContent>
                <TabsContent value="long" className="pt-4">
                  <Slider defaultValue={[15]} max={30} min={10} step={5} onValueChange={handleTimeChange} />
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center space-x-2">
                <Switch id="sound" checked={sound} onCheckedChange={setSound} />
                <Label htmlFor="sound" className="flex items-center">
                  {sound ? <Volume2 className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />}
                  Sound Alerts
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                <Label htmlFor="notifications" className="flex items-center">
                  <Bell className="mr-2 h-4 w-4" />
                  Desktop Notifications
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Focus Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">{sessions}</p>
                  <p className="text-sm text-muted-foreground">Focus Sessions</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">{breaks}</p>
                  <p className="text-sm text-muted-foreground">Breaks Taken</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">{sessions * 25}</p>
                  <p className="text-sm text-muted-foreground">Minutes Focused</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">
                    {sessions > 0 ? Math.round((sessions / (sessions + breaks)) * 100) : 0}%
                  </p>
                  <p className="text-sm text-muted-foreground">Focus Ratio</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Focus Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">The Pomodoro Technique</h3>
                <p className="text-sm text-muted-foreground">
                  Work for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 15-30 minute break.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Minimize Distractions</h3>
                <p className="text-sm text-muted-foreground">
                  Close unnecessary tabs, put your phone on silent, and find a quiet place to work.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Set Clear Goals</h3>
                <p className="text-sm text-muted-foreground">
                  Before each focus session, write down exactly what you want to accomplish.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

