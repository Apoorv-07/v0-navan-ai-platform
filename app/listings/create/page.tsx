"use client"

import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { WasteListingForm } from "@/components/WasteListingForm"
import { MaterialNeedForm } from "@/components/MaterialNeedForm" // Import MaterialNeedForm
import { useState } from "react"

export default function CreateListingPage() {
  const [listingType, setListingType] = useState<"waste" | "need" | null>(null)

  if (!listingType) {
    return (
      <main className="min-h-screen grid-bg">
        <Navbar />
        <div className="flex pt-20">
          <Sidebar />
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="max-w-2xl w-full space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-glow mb-2">Create New Listing</h1>
                <p className="text-foreground/60">What would you like to post?</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => setListingType("waste")}
                  className="glass-hover p-8 space-y-4 text-left group hover:border-cyan-500/50"
                >
                  <div className="text-5xl">♻️</div>
                  <h3 className="text-2xl font-bold text-foreground">Post Waste</h3>
                  <p className="text-foreground/60">List materials you want to dispose or sell</p>
                </button>

                <button
                  onClick={() => setListingType("need")}
                  className="glass-hover p-8 space-y-4 text-left group hover:border-green-500/50"
                >
                  <div className="text-5xl">🎯</div>
                  <h3 className="text-2xl font-bold text-foreground">Seek Materials</h3>
                  <p className="text-foreground/60">Find materials you need from other companies</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen grid-bg">
      <Navbar />
      <div className="flex pt-20">
        <Sidebar />
        <div className="flex-1 p-8">{listingType === "waste" ? <WasteListingForm /> : <MaterialNeedForm />}</div>
      </div>
    </main>
  )
}
