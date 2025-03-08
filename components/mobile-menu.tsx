"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  BookOpen,
  Download,
  MessageSquare,
  Users,
  Home,
  Briefcase,
  LayoutDashboard,
  MessageCircle,
} from "lucide-react"

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/jobs"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
          >
            <Briefcase className="h-5 w-5" />
            <span>Jobs</span>
          </Link>
          <Link
            href="/mentors"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
          >
            <Users className="h-5 w-5" />
            <span>Mentors</span>
          </Link>
          <Link
            href="/forum"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Forum</span>
          </Link>
          <Link
            href="/ai"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
          >
            <BookOpen className="h-5 w-5" />
            <span>Learn Skills</span>
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>

          <div className="border-t my-2 pt-2">
            <a
              href="http://t.me/placement01_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Telegram Bot</span>
            </a>
            <a
              href="https://apps.apple.com/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
            >
              <Download className="h-5 w-5" />
              <span>Download App</span>
            </a>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

