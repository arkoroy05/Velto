export function ProblemSolutionSection() {
  return (
    <section className="w-full px-5 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Problem Side */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Your AI forgets everything once you close the tab
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground text-lg">Switch models and lose your entire history</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground text-lg">
                  Months of work vanish when platforms change their policy
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground text-lg">Your ideas, research, and notes — gone forever</p>
              </div>
            </div>
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-foreground font-medium">You are here: juggling tabs, losing track of ideas</p>
            </div>
          </div>

          {/* Solution Side */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              One brain that remembers everything for you
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground text-lg">Never lose context switching between AI tools</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground text-lg">
                  Your memory stays with you, not locked in their ecosystem
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground text-lg">Recall anything instantly with plain language</p>
              </div>
            </div>
            <div className="p-6 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-foreground font-medium">
                You want to be here: one brain that remembers everything for you
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
