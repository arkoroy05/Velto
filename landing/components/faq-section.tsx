"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqData = [
  {
    question: "How is Velto different from other AI memory tools?",
    answer:
      "Velto is the only vendor-agnostic, AI-agnostic memory OS. While other tools lock your memory into their ecosystem, Velto works across every AI, app, and device. Your memory stays with you, not trapped in one platform.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Absolutely. Velto processes your data locally with offline AI, meaning your information never leaves your device without your permission. We believe your memory should be private, portable, and always yours.",
  },
  {
    question: "What happens if I switch AI tools?",
    answer:
      "That's exactly why Velto exists. When you switch from ChatGPT to Claude, or any other AI tool, your entire conversation history and context comes with you. No more starting from scratch every time you change platforms.",
  },
  {
    question: "How does the capture feature work?",
    answer:
      "Velto integrates seamlessly into your workflow. Highlight text on any webpage, record voice notes, or use our one-click browser extension to capture anything, anywhere. It works across all your apps and devices automatically.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes, unlimited exports are included. We never want to lock you in. You can export your entire memory database at any time in multiple formats. Your data is yours, and it should stay that way.",
  },
  {
    question: "What if Velto shuts down?",
    answer:
      "Your memory is stored locally on your devices, so you'll always have access to your data. Plus, with unlimited exports, you can backup your entire memory system anytime. We're building Velto to be unkillable, just like your memory should be.",
  },
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onToggle()
  }
  return (
    <div
      className={`w-full bg-card border border-border overflow-hidden rounded-xl transition-all duration-500 ease-out cursor-pointer`}
      onClick={handleClick}
    >
      <div className="w-full px-6 py-5 flex justify-between items-center gap-5 text-left transition-all duration-300 ease-out">
        <div className="flex-1 text-foreground text-lg font-semibold leading-7 break-words">{question}</div>
        <div className="flex justify-center items-center">
          <ChevronDown
            className={`w-6 h-6 text-muted-foreground transition-all duration-500 ease-out ${isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          transitionProperty: "max-height, opacity, padding",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={`px-6 transition-all duration-500 ease-out ${isOpen ? "pb-5 pt-2 translate-y-0" : "pb-0 pt-0 -translate-y-2"}`}
        >
          <div className="text-muted-foreground text-base font-normal leading-7 break-words">{answer}</div>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }
  return (
    <section id="faq" className="w-full pt-16 pb-20 px-5 relative flex flex-col justify-center items-center">
      <div className="w-[300px] h-[500px] absolute top-[150px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] z-0" />
      <div className="self-stretch pt-8 pb-8 md:pt-14 md:pb-14 flex flex-col justify-center items-center gap-2 relative z-10">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="w-full max-w-[600px] text-center text-foreground text-4xl md:text-5xl font-bold leading-tight break-words">
            Frequently Asked Questions
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-lg font-medium leading-relaxed break-words max-w-2xl">
            Everything you need to know about building your unkillable AI memory system
          </p>
        </div>
      </div>
      <div className="w-full max-w-[800px] pt-0.5 pb-10 flex flex-col justify-start items-start gap-4 relative z-10">
        {faqData.map((faq, index) => (
          <FAQItem key={index} {...faq} isOpen={openItems.has(index)} onToggle={() => toggleItem(index)} />
        ))}
      </div>
    </section>
  )
}
