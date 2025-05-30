"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Play, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

const themes = [
  {
    id: "focus-happy",
    title: "Be Happy",
    description: "Boost your mood with joy-centered practices",
    activities: [
      "Gratitude for Small Joys",
      "Laughter Practice",
      "Happy Memory Visualization",
      "Mood-Lifting Movement",
    ],
    duration: "15-20 min",
    route: "/timer?theme=happy",
  },
  {
    id: "calm-anxiety",
    title: "Calm Down",
    description: "Gentle practices to ease worry and tension",
    activities: ["4-7-8 Breathing", "Body Scan Relaxation", "Grounding Techniques", "Self-Compassion Practice"],
    duration: "10-15 min",
    route: "/breathwork?theme=calm",
  },
  {
    id: "morning-energy",
    title: "Energize",
    description: "Start your day with intention and vitality",
    activities: ["Energizing Breath", "Intention Setting", "Gratitude Practice", "Gentle Movement"],
    duration: "10-12 min",
    route: "/timer?theme=energy",
  },
  {
    id: "evening-peace",
    title: "Find Peace",
    description: "Wind down with calming, restorative practices",
    activities: ["Day Reflection", "Relaxation Breathing", "Loving-Kindness", "Peaceful Visualization"],
    duration: "15-20 min",
    route: "/timer?theme=peace",
  },
  {
    id: "self-discovery",
    title: "Discover Self",
    description: "Explore your inner landscape with curiosity",
    activities: ["Values Reflection", "Emotion Check-in", "Mindful Journaling", "Personal Strengths"],
    duration: "20-25 min",
    route: "/journal?theme=discovery",
  },
  {
    id: "nature-connection",
    title: "Connect Nature",
    description: "Find grounding through natural elements",
    activities: ["Earthing Practice", "Nature Sounds Meditation", "Seasonal Awareness", "Outdoor Mindfulness"],
    duration: "15-30 min",
    route: "/timer?theme=nature",
  },
]

export default function ReadyToGo() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0)
  const router = useRouter()

  const getRandomTheme = () => {
    const randomIndex = Math.floor(Math.random() * themes.length)
    setCurrentThemeIndex(randomIndex)
    setSelectedTheme(themes[randomIndex].id)
  }

  const startJourney = (theme: any) => {
    router.push(theme.route)
  }

  const currentTheme = themes[currentThemeIndex]

  return (
    <Card className="mindful-card">
      <CardHeader className="text-center pb-4">
        <CardTitle className="tertiary-title flex items-center justify-center">
          <Sparkles className="w-5 h-5 mr-3" style={{ color: "#4a4a4a" }} />
          Ready to Go
        </CardTitle>
        <p className="card-description" style={{ color: "#4a4a4a", paddingLeft: "0" }}>
          Curated themes for immediate practice
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Featured Theme */}
        <div className="p-4 rounded-xl bg-white border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <h3 className="tertiary-title">{currentTheme.title}</h3>
            <Badge variant="outline" className="difficulty-badge">
              {currentTheme.duration}
            </Badge>
          </div>

          <p className="mb-3" style={{ color: "#4a4a4a", fontSize: "12px", lineHeight: "1.4" }}>
            {currentTheme.description}
          </p>

          <div className="space-y-1 mb-4">
            {currentTheme.activities.map((activity, index) => (
              <p key={index} className="form-text" style={{ color: "#4a4a4a" }}>
                • {activity}
              </p>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={() => startJourney(currentTheme)} className="flex-1 mindful-button">
              <Play className="w-3 h-3 mr-2" />
              Start Journey
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={getRandomTheme}
              className="bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
            >
              <RefreshCw className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Quick Theme Grid */}
        <div className="space-y-3">
          <h4 className="form-text font-medium" style={{ color: "#4a4a4a" }}>
            Quick Themes
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {themes.slice(0, 4).map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  setSelectedTheme(theme.id)
                  setCurrentThemeIndex(themes.findIndex((t) => t.id === theme.id))
                }}
                className={`p-3 rounded-lg text-left transition-all duration-200 ${
                  selectedTheme === theme.id
                    ? "bg-gray-100 border-2 border-gray-300"
                    : "bg-white border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <p className="form-text font-medium" style={{ color: "#4a4a4a" }}>
                  {theme.title}
                </p>
                <p className="text-gray-500 mt-1" style={{ fontSize: "11px" }}>
                  {theme.duration}
                </p>
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
          onClick={() => router.push("/explore/ready")}
        >
          View All Themes
        </Button>
      </CardContent>
    </Card>
  )
}
