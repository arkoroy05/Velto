"use client"

import { Twitter } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="w-full border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left side - Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </a>
          </div>
          
          {/* Right side - Copyright */}
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm">
              Velto © 2025 — Built for humans who work with AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
