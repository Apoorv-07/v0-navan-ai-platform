"use client"

import { useState } from "react"
import { MultiStepForm } from "./MultiStepForm"

const CATEGORIES = ["Plastics", "Metals", "Electronics", "Textiles", "Paper", "Glass", "Organic", "Mixed"]

export function MaterialNeedForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    quantityNeeded: "",
    quantityUnit: "kg",
    location: "",
    budgetMin: "",
    budgetMax: "",
    specifications: "",
    savedSearch: false,
  })

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else {
      console.log("Submit material need:", formData)
      // TODO: Call API to create material need
    }
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const canProceed = () => {
    if (step === 1) return formData.title && formData.category
    if (step === 2) return formData.quantityNeeded && formData.location
    return true
  }

  return (
    <MultiStepForm
      stepNumber={step}
      totalSteps={3}
      title={["Material Info", "Quantity & Location", "Budget & Details"][step - 1]}
      description={["What materials do you need?", "How much and where?", "Set your budget"][step - 1]}
      onNext={handleNext}
      onPrevious={handlePrevious}
      canNext={canProceed()}
    >
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Material Name</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full glass-hover px-4 py-3 text-foreground placeholder-muted-foreground"
              placeholder="e.g., Recycled Plastic Pellets"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full glass-hover px-4 py-3 text-foreground"
              required
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Quantity Needed</label>
              <input
                type="number"
                value={formData.quantityNeeded}
                onChange={(e) => setFormData({ ...formData, quantityNeeded: e.target.value })}
                className="w-full glass-hover px-4 py-3 text-foreground"
                placeholder="500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Unit</label>
              <select
                value={formData.quantityUnit}
                onChange={(e) => setFormData({ ...formData, quantityUnit: e.target.value })}
                className="w-full glass-hover px-4 py-3 text-foreground"
              >
                <option>kg</option>
                <option>tons</option>
                <option>units</option>
                <option>m³</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Preferred Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full glass-hover px-4 py-3 text-foreground"
              placeholder="City, State, Country (or radius)"
              required
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Budget Min</label>
              <input
                type="number"
                value={formData.budgetMin}
                onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                className="w-full glass-hover px-4 py-3 text-foreground"
                placeholder="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Budget Max</label>
              <input
                type="number"
                value={formData.budgetMax}
                onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                className="w-full glass-hover px-4 py-3 text-foreground"
                placeholder="5000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Specifications</label>
            <textarea
              value={formData.specifications}
              onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
              className="w-full glass-hover px-4 py-3 text-foreground resize-none"
              placeholder="Any specific requirements or quality standards?"
              rows={4}
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.savedSearch}
              onChange={(e) => setFormData({ ...formData, savedSearch: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-foreground/80">Save this search for recurring notifications</span>
          </label>
        </div>
      )}
    </MultiStepForm>
  )
}
