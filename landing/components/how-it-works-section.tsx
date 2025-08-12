import { MousePointer, Brain, Search } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: <MousePointer className="w-8 h-8" />,
      title: "Capture Anything",
      description: "Highlight, voice, or click to save anything from any app or website",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Velto Understands",
      description: "AI tags, organizes, and links your information automatically",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Recall Instantly",
      description: "Ask in plain language and get exactly what you need",
    },
  ]

  return (
    <section id="how-it-works" className="w-full px-5 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to never forget anything again
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <div className="text-primary">{step.icon}</div>
              </div>
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold text-lg">
                {index + 1}
              </div>
              <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-lg">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
