"use client"

import { MousePointer, Brain, Search, Shield, Zap, Globe } from "lucide-react"
import { useEmailPopup } from "./email-popup-provider"
import { Button } from "@/components/ui/button"

export function HowItWorksBentoSection() {
  const { openPopup } = useEmailPopup()

  return (
    <section id="how-it-works" className="w-full px-5 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to never forget anything again
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {/* Main Step 1 - Large Card */}
          <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-2xl p-8 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <MousePointer className="w-8 h-8 text-primary" />
              </div>
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Capture Anything</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Highlight text, record voice notes, or click to save anything from any app or website. Velto works
                seamlessly across all your tools.
              </p>
            </div>
            <Button onClick={openPopup} className="mt-6 w-fit bg-primary text-primary-foreground hover:bg-primary/90">
              Try Capture
            </Button>
          </div>

          {/* Step 2 - Medium Card */}
          <div className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-3 font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Velto Understands</h3>
              <p className="text-muted-foreground">AI automatically tags, organizes, and links your information.</p>
            </div>
          </div>

          {/* Step 3 - Medium Card */}
          <div className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-3 font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Recall Instantly</h3>
              <p className="text-muted-foreground">
                Ask in plain language and get exactly what you need, when you need it.
              </p>
            </div>
          </div>

          {/* Privacy Feature */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Private & Secure</h3>
              <p className="text-muted-foreground text-sm">
                Your data stays yours. Local AI processing means maximum privacy.
              </p>
            </div>
          </div>

          {/* Speed Feature */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground text-sm">
                Instant search and recall across all your captured information.
              </p>
            </div>
          </div>

          {/* Universal Feature - Large Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-2xl p-8 flex flex-col justify-between min-h-[200px]">
            <div>
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Works Everywhere</h3>
              <p className="text-muted-foreground text-lg">
                ChatGPT, Claude, Notion, Slack, your browser — Velto connects them all into one unified memory system.
              </p>
            </div>
            <Button onClick={openPopup} className="mt-6 w-fit bg-blue-500 text-white hover:bg-blue-600">
              See All Integrations
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
