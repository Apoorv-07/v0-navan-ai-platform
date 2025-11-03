"use client"

import type React from "react"

import { useState } from "react"
import { MultiStepForm } from "./MultiStepForm"

const CATEGORIES = ["Plastics", "Metals", "Electronics", "Textiles", "Paper", "Glass", "Organic", "Mixed"]
const FREQUENCIES = ["Once", "Weekly", "Monthly", "Annual"]
const PRICE_TYPES = ["Free", "Negotiable", "Fixed Price"]

export function WasteListingForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    quantity: "",
    quantityUnit: "kg",
    frequency: "Once",
    location: "",
    description: "",
    priceType: "Negotiable",
    priceValue: "",
    photos: [] as File[],
  })

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
    else {
      console.log("Submit waste listing:", formData)
      // TODO: Call API to create waste listing
    }
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const canProceed = () => {
    if (step === 1) return formData.title && formData.category
    if (step === 2) return formData.quantity && formData.frequency
    if (step === 3) return formData.location && formData.description
    return true
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, photos: Array.from(e.target.files) })
    }
  }

  return (
    <MultiStepForm
      stepNumber={step}
      totalSteps={4}
      title={["Material Info", "Quantity & Frequency", "Location & Details", "Photos & Pricing"][step - 1]}
      description={
        [
          "Tell us what waste you have",
          "Specify amount and frequency",
          "Where is it located?",
          "Add photos and set pricing",
        ][step - 1]
      }
      onNext={handleNext}
      onPrevious={handlePrevious}
      canNext={canProceed()}
    >
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Material Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full glass-hover px-4 py-3 text-foreground placeholder-muted-foreground"
              placeholder="e.g., Industrial Plastic Waste"
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
              <label className="block text-sm font-medium text-foreground/80 mb-2">Quantity</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full glass-hover px-4 py-3 text-foreground"
                placeholder="100"
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
            <label className="block text-sm font-medium text-foreground/80 mb-2">Frequency</label>
            <div className="grid grid-cols-2 gap-2">
              {FREQUENCIES.map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFormData({ ...formData, frequency: freq })}
                  className={`p-3 rounded-lg transition ${
                    formData.frequency === freq
                      ? "bg-gradient-to-r from-cyan-500/30 to-green-500/30 border border-cyan-500/50"
                      : "glass-hover"
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full glass-hover px-4 py-3 text-foreground"
              placeholder="City, State, Country"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full glass-hover px-4 py-3 text-foreground resize-none"
              placeholder="Describe your waste materials in detail..."
              rows={5}
              required
            />
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Upload Photos (Optional)</label>
            <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center hover:border-cyan-500/50 transition cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer space-y-2">
                <div className="text-3xl">📷</div>
                <p className="text-foreground/60">Drag and drop your photos here, or click to browse</p>
                {formData.photos.length > 0 && (
                  <p className="text-green-400">{formData.photos.length} photos selected</p>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground/80">Pricing</label>
            <div className="grid grid-cols-3 gap-2">
              {PRICE_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, priceType: type })}
                  className={`p-3 rounded-lg transition ${
                    formData.priceType === type
                      ? "bg-gradient-to-r from-cyan-500/30 to-green-500/30 border border-cyan-500/50"
                      : "glass-hover"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {formData.priceType === "Fixed Price" && (
              <input
                type="number"
                value={formData.priceValue}
                onChange={(e) => setFormData({ ...formData, priceValue: e.target.value })}
                className="w-full glass-hover px-4 py-3 text-foreground"
                placeholder="Enter price per unit"
              />
            )}
          </div>
        </div>
      )}
    </MultiStepForm>
  )
}
