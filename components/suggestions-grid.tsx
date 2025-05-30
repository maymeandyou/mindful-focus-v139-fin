"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Play, Heart } from "lucide-react"
import { useCategoryContext } from "@/contexts/category-context"

const suggestions = [
  {
    id: "morning-gratitude",
    title: "Morning Gratitude Practice",
    description: "Start your day by acknowledging three things you're grateful for",
    category: "gratitude",
    duration: "5 min",
    type: "journal",
    difficulty: "Easy",
  },
  {
    id: "box-breathing",
    title: "Box Breathing for Calm",
    description: "4-4-4-4 breathing pattern to reduce stress and anxiety",
    category: "breathwork",
    duration: "10 min",
    type: "breathwork",
    difficulty: "Easy",
  },
  {
    id: "body-scan",
    title: "Mindful Body Scan",
    description: "Progressive awareness of physical sensations from head to toe",
    category: "meditation",
    duration: "15 min",
    type: "meditation",
    difficulty: "Medium",
  },
  {
    id: "nature-walk",
    title: "Mindful Nature Walk",
    description: "Connect with the natural world through conscious observation",
    category: "nature",
    duration: "20 min",
    type: "activity",
    difficulty: "Easy",
  },
  {
    id: "mood-check",
    title: "Emotional Weather Report",
    description: "Observe and name your current emotional state without judgment",
    category: "mood",
    duration: "5 min",
    type: "reflection",
    difficulty: "Easy",
  },
  {
    id: "present-moment",
    title: "5-4-3-2-1 Grounding",
    description: "Use your senses to anchor yourself in the present moment",
    category: "mindfulness",
    duration: "5 min",
    type: "technique",
    difficulty: "Easy",
  },
  {
    id: "values-reflection",
    title: "Core Values Check-in",
    description: "Reflect on your values and how they guide your decisions",
    category: "self-awareness",
    duration: "15 min",
    type: "reflection",
    difficulty: "Medium",
  },
  {
    id: "mindful-movement",
    title: "Gentle Mindful Stretching",
    description: "Connect with your body through slow, conscious movement",
    category: "exercise",
    duration: "10 min",
    type: "movement",
    difficulty: "Easy",
  },
  {
    id: "new-perspective",
    title: "Different Route Challenge",
    description: "Take a new path to a familiar destination and notice what you observe",
    category: "challenge",
    duration: "Variable",
    type: "challenge",
    difficulty: "Easy",
  },
  {
    id: "loving-kindness",
    title: "Loving-Kindness Meditation",
    description: "Send compassionate wishes to yourself and others",
    category: "meditation",
    duration: "12 min",
    type: "meditation",
    difficulty: "Medium",
  },
  {
    id: "breath-awareness",
    title: "Simple Breath Awareness",
    description: "Focus on the natural rhythm of your breathing",
    category: "breathwork",
    duration: "8 min",
    type: "breathwork",
    difficulty: "Easy",
  },
  {
    id: "appreciation-walk",
    title: "Gratitude Photography",
    description: "Take photos of things you appreciate during a mindful walk",
    category: "gratitude",
    duration: "15 min",
    type: "activity",
    difficulty: "Easy",
  },
]

const themeMapping = {
  happy: ["gratitude", "mood", "nature"],
  calm: ["meditation", "breathwork", "mindfulness"],
  stress: ["breathwork", "nature", "exercise"],
  energy: ["exercise", "challenge", "mood"],
  growth: ["self-awareness", "meditation", "challenge"],
  connection: ["gratitude", "nature", "mindfulness"],
}

export default function SuggestionsGrid() {
  const { selectedCategory, selectedTheme, setGuidedFlow } = useCategoryContext()
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions)

  useEffect(() => {
    let filtered = suggestions

    if (selectedCategory) {
      filtered = suggestions.filter((s) => s.category === selectedCategory)
    } else if (selectedTheme && themeMapping[selectedTheme]) {
      const themeCategories = themeMapping[selectedTheme]
      filtered = suggestions.filter((s) => themeCategories.includes(s.category))
    }

    setFilteredSuggestions(filtered)
  }, [selectedCategory, selectedTheme])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-300"
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-300"
      case "Hard":
        return "bg-rose-100 text-rose-800 border-rose-300"
      default:
        return "bg-stone-100 text-stone-800 border-stone-300"
    }
  }

  const startPractice = (suggestion) => {
    // Navigate to timer page with practice details
    window.location.href = `/timer?practice=${suggestion.id}&duration=${suggestion.duration}&title=${encodeURIComponent(suggestion.title)}&description=${encodeURIComponent(suggestion.description)}`
  }

  return (
    <Card className="mindful-card">
      <CardHeader>
        <CardTitle className="text-taupe-800 font-display">
          {selectedCategory
            ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Practices`
            : selectedTheme
              ? `Practices for: ${selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}`
              : "All Practices"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-4 rounded-xl bg-gradient-to-br from-white/60 to-sage-50/60 border border-sage-200/50 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <Badge variant="outline" className="text-xs bg-white/50 text-taupe-600 border-taupe-300">
                  {suggestion.category}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-taupe-500" />
                  <span className="text-xs text-taupe-500">{suggestion.duration}</span>
                </div>
              </div>

              <h3 className="font-semibold text-taupe-800 mb-2 group-hover:text-taupe-900 transition-colors">
                {suggestion.title}
              </h3>

              <p className="text-sm text-taupe-600 mb-3 leading-relaxed">{suggestion.description}</p>

              <div className="flex items-center justify-between">
                <Badge variant="outline" className={`text-xs ${getDifficultyColor(suggestion.difficulty)}`}>
                  {suggestion.difficulty}
                </Badge>
                <Button
                  onClick={() => startPractice(suggestion)}
                  className="bg-gradient-to-r from-sage-400 to-rose-400 hover:from-sage-500 hover:to-rose-500 text-white text-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Play className="w-3 h-3 mr-2" />
                  Start Practice
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredSuggestions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-sage-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-taupe-500" />
            </div>
            <p className="text-taupe-600 mb-2">No practices found</p>
            <p className="text-sm text-taupe-500">Try selecting a different category or theme</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
