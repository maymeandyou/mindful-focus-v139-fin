"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, RefreshCw, Plus } from "lucide-react"
import { useCategoryContext } from "@/contexts/category-context"

const categoryAffirmations = {
  meditation: [
    "I am present and aware in this moment",
    "My mind is calm and peaceful",
    "I observe my thoughts with gentle curiosity",
    "I find stillness within myself",
    "Each moment of meditation deepens my peace",
  ],
  breathwork: [
    "Each breath brings me peace and clarity",
    "I breathe in calm and breathe out tension",
    "My breath is my anchor to the present moment",
    "I trust in the rhythm of my breathing",
    "With each breath, I release what no longer serves me",
  ],
  gratitude: [
    "I am grateful for the abundance in my life",
    "I notice and appreciate life's simple gifts",
    "Gratitude fills my heart with joy",
    "I find reasons to be thankful in every moment",
    "My grateful heart attracts more blessings",
  ],
  mindfulness: [
    "I am fully present in this moment",
    "I observe my experience with kind awareness",
    "This moment is exactly as it should be",
    "I notice beauty in ordinary moments",
    "Mindfulness brings clarity to my life",
  ],
  mood: [
    "I acknowledge my emotions with compassion",
    "I have the power to influence my emotional state",
    "I choose thoughts that support my wellbeing",
    "My feelings are valid and temporary",
    "I respond to my emotions with kindness",
  ],
  nature: [
    "I am connected to the natural world around me",
    "Nature restores and energizes my spirit",
    "I find peace in the rhythms of the earth",
    "I am part of the beautiful web of life",
    "Nature teaches me patience and resilience",
  ],
  "self-awareness": [
    "I know myself deeply and accept what I discover",
    "I am curious about my inner landscape",
    "Self-awareness is the foundation of growth",
    "I embrace all aspects of who I am",
    "Understanding myself brings me freedom",
  ],
  exercise: [
    "My body is strong and capable",
    "I honor my body through mindful movement",
    "Movement brings me energy and vitality",
    "I listen to my body's wisdom",
    "Exercise is a celebration of what my body can do",
  ],
  different: [
    "I embrace new experiences with curiosity",
    "Change helps me grow and expand",
    "I am open to seeing life from new perspectives",
    "I welcome opportunities to learn and grow",
    "Trying new things brings excitement to my life",
  ],
}

const generalAffirmations = [
  "I am worthy of love and kindness, especially from myself.",
  "Each breath I take fills me with peace and clarity.",
  "I choose to respond to challenges with wisdom and grace.",
  "My mind is calm, my heart is open, and my spirit is free.",
  "I trust in my ability to navigate life's journey with mindfulness.",
  "Today I embrace both my strengths and my growth opportunities.",
  "I am present in this moment, and this moment is enough.",
  "My thoughts are like clouds - I observe them and let them pass.",
  "I cultivate compassion for myself and all beings around me.",
  "Every step I take is guided by intention and awareness.",
  "I release what no longer serves me and welcome what nurtures my soul.",
  "My inner wisdom guides me toward peace and understanding.",
  "I am grateful for this opportunity to grow and learn today.",
  "I choose thoughts that uplift and inspire my highest self.",
  "In stillness, I find strength; in breath, I find peace.",
]

export default function DailyAffirmation() {
  const { selectedCategory } = useCategoryContext()
  const [currentAffirmation, setCurrentAffirmation] = useState("")
  const [customAffirmations, setCustomAffirmations] = useState<string[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAffirmation, setNewAffirmation] = useState("")

  useEffect(() => {
    // Load custom affirmations
    const saved = localStorage.getItem("customAffirmations")
    if (saved) {
      setCustomAffirmations(JSON.parse(saved))
    }

    // Get daily affirmation based on selected category
    getNewAffirmation()
  }, [selectedCategory])

  const getNewAffirmation = () => {
    let affirmationPool = generalAffirmations

    // Use category-specific affirmations if a category is selected
    if (selectedCategory && categoryAffirmations[selectedCategory]) {
      affirmationPool = [...categoryAffirmations[selectedCategory], ...generalAffirmations]
    }

    // Add custom affirmations to the pool
    const allAffirmations = [...affirmationPool, ...customAffirmations]
    const randomIndex = Math.floor(Math.random() * allAffirmations.length)
    const newAffirmation = allAffirmations[randomIndex]

    setCurrentAffirmation(newAffirmation)
    localStorage.setItem("dailyAffirmation", newAffirmation)
    localStorage.setItem("affirmationDate", new Date().toDateString())
  }

  const addCustomAffirmation = () => {
    if (newAffirmation.trim()) {
      const updated = [...customAffirmations, newAffirmation.trim()]
      setCustomAffirmations(updated)
      localStorage.setItem("customAffirmations", JSON.stringify(updated))
      setNewAffirmation("")
      setShowAddForm(false)
    }
  }

  return (
    <Card className="mindful-card animate-scale-in">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center tertiary-title">
          <Sparkles className="w-5 h-5 mr-2" style={{ color: "#4a4a4a" }} />
          Daily Affirmation
          {selectedCategory && (
            <span
              className="ml-2 text-sm px-2 py-1 rounded-full form-text"
              style={{ backgroundColor: "#DDE5D4", color: "#4a4a4a" }}
            >
              {selectedCategory}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-6 rounded-xl text-center" style={{ backgroundColor: "#F5E8C8", border: "1px solid #e8d9b3" }}>
          <p className="quote-text">"{currentAffirmation}"</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={getNewAffirmation} className="flex-1 mindful-button">
            <RefreshCw className="w-4 h-4 mr-2" />
            New Affirmation
          </Button>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="mindful-button">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {showAddForm && (
          <div
            className="space-y-3 p-4 rounded-xl border"
            style={{ backgroundColor: "#E9E3DF", borderColor: "#d8cdc5" }}
          >
            <label className="body-text font-medium">Add your personal affirmation:</label>
            <Input
              placeholder="I am..."
              value={newAffirmation}
              onChange={(e) => setNewAffirmation(e.target.value)}
              className="mindful-input"
              onKeyPress={(e) => e.key === "Enter" && addCustomAffirmation()}
            />
            <div className="flex gap-2">
              <Button
                onClick={addCustomAffirmation}
                disabled={!newAffirmation.trim()}
                size="sm"
                className="mindful-button flex-1"
              >
                Add
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                size="sm"
                className="form-text"
                style={{ borderColor: "#DDE5D4", color: "#4a4a4a" }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="text-center pt-2">
          <p className="form-text">
            {selectedCategory
              ? `Affirmations focused on ${selectedCategory}`
              : "Speak these words with intention and belief"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
