import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function OfferStackSection() {
  const offerings = [
    {
      title: "AI-Enhanced Universal Memory Workspace",
      description: "Your core memory system that works across every app and device",
      value: "$200/month value",
    },
    {
      title: "Local Offline AI Recall",
      description: "Maximum privacy with AI that works without internet",
      value: "$100/month value",
    },
    {
      title: "Timeline + Project-Based Memory Views",
      description: "Organize your thoughts by time and project automatically",
      value: "$75/month value",
    },
    {
      title: "Unlimited Exports",
      description: "Never get locked in — export your data anytime",
      value: "$50/month value",
    },
    {
      title: "1-Click Browser Capture",
      description: "Save anything from anywhere with a single click",
      value: "$25/month value",
    },
  ]

  return (
    <section id="pricing" className="w-full px-5 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Everything You Get</h2>
          <p className="text-xl text-muted-foreground">A complete AI brain system that's worth more than you'll pay</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
          {offerings.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-background/50">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground mb-2">{item.description}</p>
                <span className="text-sm text-primary font-medium">{item.value}</span>
              </div>
            </div>
          ))}

          <div className="border-t border-border pt-6 mt-8">
            <div className="text-center space-y-4">
              <div className="text-3xl font-bold text-foreground">
                Total Value: <span className="line-through text-muted-foreground">$450/month</span>
              </div>
              <div className="text-5xl font-bold text-primary">Your Price: $29/month</div>
              <p className="text-muted-foreground">Less than the cost of a coffee a week</p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full font-semibold text-lg"
              >
                Start My AI Brain
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
