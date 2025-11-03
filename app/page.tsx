"use client"

import Link from "next/link"
import { HolographicRecycling } from "@/components/HolographicRecycling"
import { AnimatedCounter } from "@/components/AnimatedCounter"
import { Navbar } from "@/components/Navbar"

export default function Home() {
  const features = [
    {
      title: "AI Matching",
      description: "Intelligent algorithm matches your waste with companies seeking materials",
      icon: "🤖",
    },
    {
      title: "Cost Savings",
      description: "Turn waste into revenue opportunities with fair market pricing",
      icon: "💰",
    },
    {
      title: "Environmental Impact",
      description: "Track your carbon footprint reduction in real-time",
      icon: "🌍",
    },
  ]

  return (
    <main className="min-h-screen grid-bg">
      <Navbar />

      {/* Background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl">
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h1 className="text-6xl font-bold mb-4 leading-tight">
                <span className="text-glow">Waste Symbiosis</span>
                <br />
                <span className="text-foreground">Reimagined</span>
              </h1>
              <p className="text-xl text-foreground/60 mb-8">
                Connect your waste streams with companies seeking materials. Powered by AI matching, enabled by
                sustainable practices.
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-green-500 text-background font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link href="/login" className="px-8 py-4 glass-hover font-bold transition">
                Sign In
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <HolographicRecycling />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <AnimatedCounter target={15000} label="Tons of Waste Diverted" suffix="T" />
            <AnimatedCounter target={450} label="Companies Connected" />
            <AnimatedCounter target={35000} label="CO₂ Saved" suffix=" kg" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-glow text-center mb-16">Why Choose Navan?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="glass-hover p-8 space-y-4">
                <div className="text-5xl">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-foreground/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-glow">Ready to Transform Your Waste?</h2>
          <p className="text-xl text-foreground/60">Join hundreds of companies creating a circular economy</p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-green-500 text-background font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
          >
            Start for Free
          </Link>
        </div>
      </section>
    </main>
  )
}
