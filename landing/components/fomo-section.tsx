"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useEmailPopup } from "./email-popup-provider"

export function FOMOSection() {
  const { openPopup } = useEmailPopup()
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 23,
    minutes: 45,
    seconds: 30,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="early-access" className="w-full px-5 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-2xl p-8 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Early Access Closes Soon</h2>
          <p className="text-xl text-muted-foreground">Join before we lock it down. Once it's full, waitlist only.</p>

          <div className="flex justify-center gap-4 my-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-background border border-border rounded-lg p-4 min-w-[80px]">
                <div className="text-2xl font-bold text-primary">{value}</div>
                <div className="text-sm text-muted-foreground capitalize">{unit}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-lg font-semibold text-foreground">
              7-Day Guarantee: Within 7 days, you'll have a personal AI brain that remembers more than you do — or you
              pay nothing.
            </p>
            <Button
              onClick={openPopup}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full font-semibold text-lg"
            >
              Get My AI Brain Now
            </Button>
            <p className="text-sm text-muted-foreground">Limited early-access invites remaining</p>
          </div>
        </div>
      </div>
    </section>
  )
}
