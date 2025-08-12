"use client"

import { Button } from "@/components/ui/button"
import { useEmailPopup } from "./email-popup-provider"

export function FinalCTASection() {
  const { openPopup } = useEmailPopup()

  return (
    <section className="w-full px-5 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
          Never forget anything you've read, said, or built
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Across every AI, app, and device — and recall it instantly
        </p>

        <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
          <p className="text-lg text-foreground mb-6 font-medium">Don't trust your memory to one AI company. Own it.</p>
          <p className="text-muted-foreground mb-8">
            In 6 months, your AI will remember nothing you said today. Velto will.
          </p>
          <Button
            onClick={openPopup}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-4 rounded-full font-bold text-xl"
          >
            Start My AI Brain
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          AI companies want your memory locked in their ecosystem — we give it back to you.
        </p>
      </div>
    </section>
  )
}
