import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BriefcaseBusiness, Search, Download, MessageSquare, Users } from "lucide-react"
import MobileMenu from "@/components/mobile-menu"
import { Badge } from "@/components/ui/badge"

export default function Navbar() {
  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BriefcaseBusiness className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Placement.ai</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/jobs" className="text-sm font-medium hover:text-primary transition-colors">
            Jobs
          </Link>
          <Link href="/mentors" className="text-sm font-medium hover:text-primary transition-colors">
            Mentors
          </Link>
          <Link href="/forum" className="text-sm font-medium hover:text-primary transition-colors">
            Forum
          </Link>
          <Link href="/ai" className="text-sm font-medium hover:text-primary transition-colors">
            Learn Skills
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="hidden sm:flex">
            <Link href="/jobs">
              <Search className="h-4 w-4 mr-2" />
              Find Jobs
            </Link>
          </Button>
          <Button size="sm" asChild className="hidden sm:flex">
            <Link href="/mentors">
              <Users className="h-4 w-4 mr-2" />
              Find Mentors
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="hidden md:flex">
            <a href="https://apps.apple.com/placeholder" target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4 mr-2" />
              Get App
            </a>
          </Button>
          <Badge variant="secondary" className="hidden md:flex">
            <a
              href="http://t.me/placement01_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              Telegram Bot
            </a>
          </Badge>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

