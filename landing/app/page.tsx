import { HeroSection } from "@/components/hero-section"
import { ProblemSolutionSection } from "@/components/problem-solution-section"
import { HowItWorksBentoSection } from "@/components/how-it-works-bento-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { FAQSection } from "@/components/faq-section"
import { FOMOSection } from "@/components/fomo-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { AnimatedSection } from "@/components/animated-section"
import { FooterSection } from "@/components/footer-section"
import { EmailPopupProvider } from "@/components/email-popup-provider"

export default function VeltoLandingPage() {
  return (
    <EmailPopupProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="relative z-10">
          <main className="max-w-[1320px] mx-auto relative">
            <HeroSection />
          </main>

          <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.1}>
            <ProblemSolutionSection />
          </AnimatedSection>

          <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
            <HowItWorksBentoSection />
          </AnimatedSection>

          <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
            <SocialProofSection />
          </AnimatedSection>

          <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
            <FAQSection />
          </AnimatedSection>

          <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
            <FOMOSection />
          </AnimatedSection>

          <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
            <FinalCTASection />
          </AnimatedSection>
        </div>

        {/* Footer */}
        <FooterSection />
      </div>
    </EmailPopupProvider>
  )
}
