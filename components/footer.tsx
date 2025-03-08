import Link from "next/link"
import { BriefcaseBusiness, MessageSquare, Download } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BriefcaseBusiness className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Placement.ai</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your AI-powered career platform for job search, skill development, and professional networking.
            </p>
            <div className="flex gap-4">
              <a
                href="http://t.me/placement01_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm hover:text-primary transition-colors"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Telegram Bot
              </a>
              <a
                href="https://apps.apple.com/placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm hover:text-primary transition-colors"
              >
                <Download className="h-4 w-4 mr-1" />
                Get App
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="hover:text-primary transition-colors">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link href="/mentors" className="hover:text-primary transition-colors">
                  Connect with Mentors
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-primary transition-colors">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="/ai" className="hover:text-primary transition-colors">
                  Learn Skills
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-primary transition-colors">
                  Resume Builder
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Career Blog
                </Link>
              </li>
              <li>
                <Link href="/assessments" className="hover:text-primary transition-colors">
                  Skill Assessments
                </Link>
              </li>
              <li>
                <Link href="/mock-interviews" className="hover:text-primary transition-colors">
                  Mock Interviews
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-primary transition-colors">
                  Virtual Events
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Placement.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

