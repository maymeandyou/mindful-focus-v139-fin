"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCategoryContext } from "@/contexts/category-context"

const readyToGoThemes = [
  {
    id: "happy",
    title: "Be Happy",
    description: "Boost your mood with joy-centered practices that elevate your vibration and attract positivity",
    color: "from-amber-100 to-rose-100",
    categories: ["gratitude", "mood", "nature"],
  },
  {
    id: "calm",
    title: "Calm Down",
    description: "Find peace and quiet your mind with practices that bring stillness and clarity",
    color: "from-sage-100 to-stone-100",
    categories: ["meditation", "breathwork", "mindfulness"],
  },
  {
    id: "stress",
    title: "Stress Release",
    description: "Release tension and find relief through practices that restore your natural state of ease",
    color: "from-stone-100 to-sage-100",
    categories: ["breathwork", "nature", "exercise"],
  },
  {
    id: "energy",
    title: "Energizing",
    description: "Boost your vitality and motivation with practices that awaken your inner power",
    color: "from-rose-100 to-amber-100",
    categories: ["exercise", "challenge", "mood"],
  },
  {
    id: "growth",
    title: "Personal Growth",
    description: "Expand awareness and understanding through practices that unlock your potential",
    color: "from-taupe-100 to-rose-100",
    categories: ["self-awareness", "meditation", "challenge"],
  },
  {
    id: "connection",
    title: "Feel Connected",
    description: "Deepen relationships and belonging through practices that open your heart",
    color: "from-sage-100 to-amber-100",
    categories: ["gratitude", "nature", "mindfulness"],
  },
]

export default function ReadyToGoThemes() {
  const { setSelectedTheme, setGuidedFlow } = useCategoryContext()

  const startTheme = (theme: any) => {
    setSelectedTheme(theme.id)
    setGuidedFlow({
      isOpen: true,
      suggestion: null,
      theme: theme.id,
      category: null,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {readyToGoThemes.map((theme) => (
        <Card key={theme.id} className="mindful-card hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div
              className={`w-full h-24 bg-gradient-to-br ${theme.color} rounded-xl mb-4 flex items-center justify-center`}
            >
              <div className="text-center">
                <h3 className="tertiary-title">{theme.title}</h3>
              </div>
            </div>

            <p className="text-black text-sm font-normal leading-relaxed mb-4 px-1">{theme.description}</p>

            <div className="flex flex-wrap gap-1 mb-4">
              {theme.categories.map((cat) => (
                <Badge
                  key={cat}
                  variant="outline"
                  className="text-xs bg-white/50 text-gray-600 border-gray-300 font-normal"
                >
                  {cat}
                </Badge>
              ))}
            </div>

            <Button onClick={() => startTheme(theme)} className="w-full mindful-button">
              Start Journey
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
