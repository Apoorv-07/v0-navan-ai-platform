"use client"

import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { CompanyProfile } from "@/components/CompanyProfile"

export default function ProfilePage() {
  return (
    <main className="min-h-screen grid-bg">
      <Navbar />
      <div className="flex pt-20">
        <Sidebar />
        <div className="flex-1 p-8">
          <CompanyProfile />
        </div>
      </div>
    </main>
  )
}
