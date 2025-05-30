"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

const colorOptions = [
  { name: "sage", class: "bg-sage-100 border-sage-300", label: "Sage" },
  { name: "rose", class: "bg-rose-100 border-rose-300", label: "Rose" },
  { name: "amber", class: "bg-amber-100 border-amber-300", label: "Amber" },
  { name: "stone", class: "bg-stone-100 border-stone-300", label: "Stone" },
  { name: "taupe", class: "bg-taupe-100 border-taupe-300", label: "Taupe" },
]

const habitSuggestions = [
  "Morning meditation",
  "Gratitude journaling",
  "Mindful walking",
  "Deep breathing",
  "Evening reflection",
  "Digital detox hour",
  "Mindful eating",
  "Nature connection",
  "Loving-kindness practice",
  "Body scan meditation",
]

export default function HabitCreator() {
  const [habitName, setHabitName] = useState("")
  const [selectedColor, setSelectedColor] = useState("sage")
  const [isCreating, setIsCreating] = useState(false)

  const handleCreate = () => {
    if (habitName.trim()) {
      const newHabit = {
        id: Date.now(),
        name: habitName.trim(),
        color: selectedColor,
        streak: 0,
        completedToday: false,
        completedDates: [],
        createdAt: new Date().toISOString(),
      }

      const existingHabits = JSON.parse(localStorage.getItem("habits") || "[]")
      const updatedHabits = [...existingHabits, newHabit]
      localStorage.setItem("habits", JSON.stringify(updatedHabits))

      // Reset form
      setHabitName("")
      setSelectedColor("sage")
      setIsCreating(false)

      // Trigger a page refresh to show the new habit
      window.location.reload()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setHabitName(suggestion)
  }

  if (!isCreating) {
    return (
      <Card className="mindful-card animate-slide-up">
        <CardContent className="p-6">
          <Button
            onClick={() => setIsCreating(true)}
            className="w-full bg-gradient-to-r from-sage-300 to-rose-300 hover:from-sage-400 hover:to-rose-400 text-taupe-800 font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 button-text"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Habit
          </Button>

          <div className="mt-4 text-center">
            <p className="caption-text">Start building mindful practices that nurture your wellbeing</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mindful-card animate-scale-in">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center subheading">
          <Plus className="h-5 w-5 mr-2 text-sage-500" />
          New Habit
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Habit Suggestions */}
        <div className="space-y-3">
          <label className="body-text font-medium">Popular mindful habits:</label>
          <div className="grid grid-cols-2 gap-2">
            {habitSuggestions.slice(0, 6).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-left p-2 bg-gradient-to-r from-sage-50 to-stone-50 hover:from-sage-100 hover:to-stone-100 rounded-lg border border-sage-200/50 transition-all duration-200 caption-text text-taupe-700"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Habit Name Input */}
        <div className="space-y-2">
          <label className="body-text font-medium">Habit Name</label>
          <Input
            placeholder="e.g., Morning meditation"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="mindful-input"
            onKeyPress={(e) => e.key === "Enter" && handleCreate()}
          />
        </div>

        {/* Color Selection */}
        <div className="space-y-2">
          <label className="body-text font-medium">Choose a color</label>
          <div className="grid grid-cols-5 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`h-12 rounded-xl border-2 transition-all duration-200 ${color.class} ${
                  selectedColor === color.name ? "ring-2 ring-taupe-400 scale-105" : "hover:scale-105"
                }`}
                title={color.label}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setIsCreating(false)}
            className="flex-1 border-taupe-300 text-taupe-600 hover:bg-taupe-50 rounded-xl small-text"
          >
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!habitName.trim()} className="flex-1 mindful-button small-text">
            Create Habit
          </Button>
        </div>

        <div className="text-center pt-2">
          <p className="caption-text">Small consistent actions create lasting change</p>
        </div>
      </CardContent>
    </Card>
  )
}
