"use client"

import { Button } from "@/components/ui/button"
import { Header } from "./header"
import { useEmailPopup } from "./email-popup-provider"
import { useEffect, useRef, useState } from "react"

export function HeroSection() {
  const { openPopup } = useEmailPopup()
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // Animate neural connections
    const connections = svg.querySelectorAll(".neural-connection")
    const nodes = svg.querySelectorAll(".neural-node")
    const pulses = svg.querySelectorAll(".neural-pulse")

    // Stagger the connection animations
    connections.forEach((connection, index) => {
      const line = connection as SVGLineElement
      line.style.animationDelay = `${index * 0.2}s`
    })

    // Stagger the node animations
    nodes.forEach((node, index) => {
      const circle = node as SVGCircleElement
      circle.style.animationDelay = `${index * 0.15}s`
    })

    // Stagger the pulse animations
    pulses.forEach((pulse, index) => {
      const circle = pulse as SVGCircleElement
      circle.style.animationDelay = `${index * 0.3}s`
    })

    // Mouse tracking for proximity effects
    const handleMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect()
      const scaleX = 1220 / rect.width
      const scaleY = 810 / rect.height
      setMousePosition({
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      })
    }

    svg.addEventListener("mousemove", handleMouseMove)
    return () => svg.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Calculate distance between mouse and node for proximity effects
  const getProximityIntensity = (nodeX: number, nodeY: number) => {
    const distance = Math.sqrt(Math.pow(mousePosition.x - nodeX, 2) + Math.pow(mousePosition.y - nodeY, 2))
    const maxDistance = 150
    return Math.max(0, 1 - distance / maxDistance)
  }

  return (
    <section className="flex flex-col items-center text-center relative mx-auto rounded-2xl overflow-hidden my-6 py-0 px-4 w-full h-[600px] md:w-[1220px] md:h-[700px] lg:h-[810px] md:px-0">
      {/* Animated Brain visualization background */}
      <div className="absolute inset-0 z-0">
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 1220 810"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          style={{ cursor: "none" }}
        >
          <defs>
            <radialGradient id="brainGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              <stop offset="30%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
              <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            </radialGradient>

            <radialGradient id="nodeGradientHover" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            </radialGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="proximityGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Central brain core with pulsing animation */}
          <circle
            cx="610"
            cy="405"
            r="180"
            fill="url(#brainGradient)"
            className="animate-pulse"
            style={{ animationDuration: "3s" }}
          />

          {/* Secondary brain layers */}
          <circle
            cx="610"
            cy="405"
            r="120"
            fill="url(#brainGradient)"
            className="animate-pulse"
            style={{ animationDuration: "2s", animationDelay: "0.5s" }}
          />

          {/* Neural network connections - animated */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180
            const innerRadius = 140
            const outerRadius = 280 + Math.sin(i * 0.5) * 40
            const x1 = 610 + Math.cos(angle) * innerRadius
            const y1 = 405 + Math.sin(angle) * innerRadius
            const x2 = 610 + Math.cos(angle) * outerRadius
            const y2 = 405 + Math.sin(angle) * outerRadius

            // Control points for curved connections
            const midX = (x1 + x2) / 2 + Math.sin(angle + Math.PI / 2) * 30
            const midY = (y1 + y2) / 2 + Math.cos(angle + Math.PI / 2) * 30

            const nodeId = `node-${i}`
            const isHovered = hoveredNode === nodeId
            const proximityIntensity = getProximityIntensity(x2, y2)
            const isNearMouse = proximityIntensity > 0.3

            return (
              <g key={i}>
                {/* Curved connection path */}
                <path
                  d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
                  stroke="hsl(var(--primary))"
                  strokeWidth={isHovered || isNearMouse ? "2.5" : "1.5"}
                  strokeOpacity={isHovered ? "1" : isNearMouse ? 0.8 : "0.6"}
                  fill="none"
                  filter={isHovered ? "url(#strongGlow)" : "url(#glow)"}
                  className="neural-connection"
                  style={{
                    strokeDasharray: "5 10",
                    animationName: "dash, fadeInOut",
                    animationDuration: `${isHovered ? "1.5s" : "3s"}, 4s`,
                    animationTimingFunction: "linear, ease-in-out",
                    animationIterationCount: "infinite, infinite",
                    animationDelay: `${i * 0.1}s, ${i * 0.1}s`,
                    transition: "all 0.3s ease",
                  }}
                />

                {/* Hover detection area (invisible) */}
                <circle
                  cx={x2}
                  cy={y2}
                  r="20"
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredNode(nodeId)}
                  onMouseLeave={() => setHoveredNode(null)}
                />

                {/* Proximity glow ring */}
                {proximityIntensity > 0.1 && (
                  <circle
                    cx={x2}
                    cy={y2}
                    r={12 + proximityIntensity * 8}
                    fill="hsl(var(--primary))"
                    fillOpacity={proximityIntensity * 0.2}
                    filter="url(#proximityGlow)"
                    style={{
                      animationName: "proximityPulse",
                      animationDuration: `${2 - proximityIntensity}s`,
                      animationTimingFunction: "ease-in-out",
                      animationIterationCount: "infinite",
                    }}
                  />
                )}

                {/* Outer nodes */}
                <circle
                  cx={x2}
                  cy={y2}
                  r={isHovered ? "10" : isNearMouse ? "8" : "6"}
                  fill={isHovered ? "url(#nodeGradientHover)" : "url(#nodeGradient)"}
                  filter={isHovered ? "url(#strongGlow)" : isNearMouse ? "url(#proximityGlow)" : "url(#glow)"}
                  className="neural-node"
                  style={{
                    animationName: "nodeGlow",
                    animationDuration: isHovered ? "1s" : "2s",
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                    animationDelay: `${i * 0.1}s`,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    transform: isHovered ? "scale(1.3)" : isNearMouse ? "scale(1.1)" : "scale(1)",
                    transformOrigin: "center",
                  }}
                  onMouseEnter={() => setHoveredNode(nodeId)}
                  onMouseLeave={() => setHoveredNode(null)}
                />

                {/* Pulsing effect on nodes */}
                <circle
                  cx={x2}
                  cy={y2}
                  r={isHovered ? "6" : "3"}
                  fill="hsl(var(--primary))"
                  fillOpacity={isHovered ? "1" : "0.8"}
                  className="neural-pulse"
                  style={{
                    animationName: "pulse",
                    animationDuration: isHovered ? "0.8s" : "2s",
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                    animationDelay: `${i * 0.15}s`,
                    transition: "all 0.3s ease",
                    pointerEvents: "none",
                  }}
                />

                {/* Ripple effect on hover */}
                {isHovered && (
                  <>
                    <circle
                      cx={x2}
                      cy={y2}
                      r="15"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      strokeOpacity="0.6"
                      style={{
                        animationName: "ripple",
                        animationDuration: "1s",
                        animationTimingFunction: "ease-out",
                        animationIterationCount: "infinite",
                      }}
                    />
                    <circle
                      cx={x2}
                      cy={y2}
                      r="25"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="1"
                      strokeOpacity="0.3"
                      style={{
                        animationName: "ripple",
                        animationDuration: "1s",
                        animationTimingFunction: "ease-out",
                        animationIterationCount: "infinite",
                        animationDelay: "0.3s",
                      }}
                    />
                  </>
                )}
              </g>
            )
          })}

          {/* Secondary network layer */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180
            const radius = 320
            const x = 610 + Math.cos(angle) * radius
            const y = 405 + Math.sin(angle) * radius

            const nodeId = `secondary-node-${i}`
            const isHovered = hoveredNode === nodeId
            const proximityIntensity = getProximityIntensity(x, y)
            const isNearMouse = proximityIntensity > 0.3

            return (
              <g key={`secondary-${i}`}>
                {/* Connecting lines to center */}
                <line
                  x1="610"
                  y1="405"
                  x2={x}
                  y2={y}
                  stroke="hsl(var(--primary))"
                  strokeWidth={isHovered || isNearMouse ? "1.5" : "0.8"}
                  strokeOpacity={isHovered ? "0.8" : isNearMouse ? "0.5" : "0.3"}
                  strokeDasharray="3 6"
                  className="neural-connection"
                  style={{
                    animationName: "dash, fadeInOut",
                    animationDuration: `${isHovered ? "2s" : "4s"}, 5s`,
                    animationTimingFunction: "linear, ease-in-out",
                    animationIterationCount: "infinite, infinite",
                    animationDelay: `${i * 0.2}s, ${i * 0.2}s`,
                    transition: "all 0.3s ease",
                  }}
                />

                {/* Hover detection area */}
                <circle
                  cx={x}
                  cy={y}
                  r="15"
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredNode(nodeId)}
                  onMouseLeave={() => setHoveredNode(null)}
                />

                {/* Proximity glow for secondary nodes */}
                {proximityIntensity > 0.2 && (
                  <circle
                    cx={x}
                    cy={y}
                    r={8 + proximityIntensity * 6}
                    fill="hsl(var(--primary))"
                    fillOpacity={proximityIntensity * 0.15}
                    filter="url(#proximityGlow)"
                  />
                )}

                {/* Secondary nodes */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? "7" : isNearMouse ? "5" : "4"}
                  fill="hsl(var(--primary))"
                  fillOpacity={isHovered ? "1" : isNearMouse ? "0.8" : "0.7"}
                  filter={isHovered ? "url(#strongGlow)" : "url(#glow)"}
                  className="neural-node"
                  style={{
                    animationName: "nodeGlow",
                    animationDuration: isHovered ? "1.5s" : "3s",
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                    animationDelay: `${i * 0.2}s`,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    transform: isHovered ? "scale(1.4)" : isNearMouse ? "scale(1.2)" : "scale(1)",
                    transformOrigin: "center",
                  }}
                  onMouseEnter={() => setHoveredNode(nodeId)}
                  onMouseLeave={() => setHoveredNode(null)}
                />
              </g>
            )
          })}

          {/* Floating particles */}
          {Array.from({ length: 8 }).map((_, i) => {
            const x = 300 + Math.random() * 620
            const y = 200 + Math.random() * 410
            const proximityIntensity = getProximityIntensity(x, y)

            return (
              <circle
                key={`particle-${i}`}
                cx={x}
                cy={y}
                r={proximityIntensity > 0.4 ? "4" : "2"}
                fill="hsl(var(--primary))"
                fillOpacity={proximityIntensity > 0.4 ? "0.9" : "0.6"}
                filter={proximityIntensity > 0.4 ? "url(#strongGlow)" : undefined}
                style={{
                  animationName: "float",
                  animationDuration: `${6 - proximityIntensity * 2}s`,
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationDelay: `${i * 0.5}s`,
                  transition: "all 0.3s ease",
                }}
              />
            )
          })}

          {/* Mouse cursor indicator */}
          <circle
            cx={mousePosition.x}
            cy={mousePosition.y}
            r="3"
            fill="hsl(var(--primary))"
            fillOpacity="0.8"
            filter="url(#glow)"
            style={{
              animationName: "pulse",
              animationDuration: "1s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              pointerEvents: "none",
            }}
          />
        </svg>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes dash {
          0% {
            stroke-dashoffset: 15;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes nodeGlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.4;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-10px) translateX(5px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-5px) translateX(-5px);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-15px) translateX(3px);
            opacity: 0.9;
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes proximityPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.1;
          }
        }

        .neural-connection {
          stroke-linecap: round;
        }

        .neural-node {
          transform-origin: center;
        }

        .neural-pulse {
          transform-origin: center;
        }
      `}</style>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header />
      </div>

      <div className="relative z-10 space-y-6 mb-8 max-w-4xl mt-32 md:mt-40 lg:mt-48 px-4">
        <h1 className="text-foreground text-4xl md:text-5xl lg:text-7xl font-semibold leading-tight">
          Your AI brain. Always with you.
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
          Velto remembers everything you do — across every app, AI, and device. Private, portable, and always yours.
        </p>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-4">
        <Button
          onClick={openPopup}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
        >
          Get My AI Brain
        </Button>
        <Button
          onClick={openPopup}
          variant="outline"
          className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg bg-transparent"
        >
          See How It Works
        </Button>
      </div>
    </section>
  )
}
