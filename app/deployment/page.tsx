import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DeploymentGuide() {
  const options = [
    {
      title: "Render (Recommended)",
      description: "Easiest deployment with free tier. Supports full-stack applications.",
      features: ["Free tier available", "Auto deploys from Git", "Built-in MongoDB support", "Custom domains"],
      pros: ["Simplest setup", "Automatic deployments", "Great for beginners", "Good uptime guarantee"],
      cons: ["Limited free tier", "Slower cold starts on free tier"],
      time: "15-20 minutes",
      complexity: "Beginner",
    },
    {
      title: "Vercel (Frontend) + Render (Backend)",
      description: "Best for Next.js. Vercel for frontend, Render for backend API.",
      features: ["Vercel optimized for Next.js", "Separate scaling", "Edge functions", "Analytics included"],
      pros: ["Vercel is very fast", "Better Next.js integration", "Separate scaling", "Great DX"],
      cons: ["More setup steps", "Need two accounts"],
      time: "20-25 minutes",
      complexity: "Intermediate",
    },
    {
      title: "Railway",
      description: "All-in-one platform. Deploy everything together.",
      features: ["Full-stack in one place", "Auto-generated URLs", "GitHub integration", "Easy scaling"],
      pros: ["All in one place", "Very intuitive UI", "Free tier available", "Good documentation"],
      cons: ["Smaller community", "Limited free tier"],
      time: "10-15 minutes",
      complexity: "Beginner",
    },
  ]

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-glow">Deployment Options</h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Choose the deployment platform that best fits your needs. All options support production deployment.
          </p>
        </div>

        {/* Quick Access Links */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/docs/DEPLOYMENT_GUIDE.md">
            <Button className="w-full h-12 bg-transparent" variant="outline">
              📖 Full Deployment Guide
            </Button>
          </Link>
          <Link href="/deployment/checklist">
            <Button className="w-full h-12 bg-gradient-to-r from-cyan-500 to-green-500 text-background">
              ✅ Deployment Checklist
            </Button>
          </Link>
        </div>

        {/* Deployment Options */}
        <div className="grid md:grid-cols-3 gap-6">
          {options.map((option) => (
            <Card key={option.title} className="glass p-6 space-y-6 flex flex-col">
              {/* Header */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">{option.title}</h2>
                <p className="text-sm text-foreground/60">{option.description}</p>
              </div>

              {/* Metadata */}
              <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                <div>
                  <span className="text-foreground/60">Setup Time:</span>
                  <p className="text-foreground font-semibold">{option.time}</p>
                </div>
                <div>
                  <span className="text-foreground/60">Complexity:</span>
                  <p
                    className={`font-semibold ${option.complexity === "Beginner" ? "text-green-400" : "text-cyan-400"}`}
                  >
                    {option.complexity}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-foreground/80">Features</h3>
                <ul className="space-y-1 text-sm">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-foreground/70">
                      <span className="text-green-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pros & Cons */}
              <div className="space-y-4 text-sm flex-1">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Pros</h4>
                  <ul className="space-y-1">
                    {option.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-foreground/70">
                        <span className="text-green-400 mt-1">+</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Cons</h4>
                  <ul className="space-y-1">
                    {option.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-foreground/70">
                        <span className="text-orange-400 mt-1">-</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Learn More */}
              <Link href={`/deployment/${option.title.toLowerCase().replace(/ /g, "-")}`} className="block">
                <Button className="w-full mt-4">Learn More</Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Quick Start Section */}
        <Card className="glass p-8 space-y-6">
          <h2 className="text-2xl font-bold">Quick Start (5 Minutes)</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 flex items-center justify-center text-background font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Push Code to GitHub</h3>
                <pre className="bg-black/30 p-2 rounded text-sm overflow-x-auto">
                  <code>git add . && git commit -m "Ready for deployment" && git push origin main</code>
                </pre>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 flex items-center justify-center text-background font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Create MongoDB Atlas Cluster</h3>
                <p className="text-sm text-foreground/70">Go to mongodb.com/cloud/atlas, create free M0 cluster</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 flex items-center justify-center text-background font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Deploy to Render</h3>
                <p className="text-sm text-foreground/70">Go to render.com, connect GitHub, set env vars, deploy</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 flex items-center justify-center text-background font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Test Your Deployment</h3>
                <p className="text-sm text-foreground/70">Visit your live URL and register a test account</p>
              </div>
            </div>
          </div>

          <Link href="/docs/DEPLOYMENT_GUIDE.md">
            <Button className="w-full" size="lg">
              Go to Full Deployment Guide
            </Button>
          </Link>
        </Card>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Common Questions</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="glass p-4 space-y-2">
              <h3 className="font-semibold text-foreground">Which option should I choose?</h3>
              <p className="text-sm text-foreground/70">
                For beginners: Choose Render (simplest). For Next.js optimization: Choose Vercel + Render. For
                all-in-one: Choose Railway.
              </p>
            </Card>

            <Card className="glass p-4 space-y-2">
              <h3 className="font-semibold text-foreground">Can I use the free tier?</h3>
              <p className="text-sm text-foreground/70">
                Yes, all options have free tiers. Render and Railway include MongoDB support. Check their pricing for
                limits.
              </p>
            </Card>

            <Card className="glass p-4 space-y-2">
              <h3 className="font-semibold text-foreground">How do I scale later?</h3>
              <p className="text-sm text-foreground/70">
                All platforms support automatic scaling. Simply upgrade your plan as traffic grows.
              </p>
            </Card>

            <Card className="glass p-4 space-y-2">
              <h3 className="font-semibold text-foreground">Do I need a custom domain?</h3>
              <p className="text-sm text-foreground/70">
                No, all platforms provide free subdomains. Add custom domains in settings (optional, paid feature).
              </p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
