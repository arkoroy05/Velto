export function SocialProofSection() {
  const testimonials = [
    {
      quote: "Velto became my memory. Now I can switch AI tools freely without losing anything.",
      role: "AI Researcher",
    },
    {
      quote: "I've saved months of research that would have been lost in ChatGPT's memory holes.",
      role: "Consultant",
    },
    {
      quote: "Finally, an AI memory system that I own, not the other way around.",
      role: "Developer",
    },
  ]

  return (
    <section className="w-full px-5 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Join AI Power Users Who Never Forget</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6">
              <p className="text-foreground text-lg mb-4 italic">"{testimonial.quote}"</p>
              <p className="text-muted-foreground font-medium">— {testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
