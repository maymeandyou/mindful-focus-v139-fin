"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Heart, Star, Target, Sparkles } from "lucide-react"

// Comprehensive intention library
const intentionLibrary = [
  // Hope & Optimism
  { id: 1, text: "I choose hope over fear", category: "Hope", tags: ["hope", "courage", "positivity"] },
  {
    id: 2,
    text: "I trust that everything is working out for my highest good",
    category: "Hope",
    tags: ["hope", "trust", "faith"],
  },
  {
    id: 3,
    text: "I see possibilities where others see obstacles",
    category: "Hope",
    tags: ["hope", "optimism", "perspective"],
  },
  { id: 4, text: "I am hopeful about my future", category: "Hope", tags: ["hope", "future", "optimism"] },
  {
    id: 5,
    text: "I maintain hope even in challenging times",
    category: "Hope",
    tags: ["hope", "resilience", "strength"],
  },

  // Self-Love & Acceptance
  { id: 6, text: "I am worthy of love and respect", category: "Self-Love", tags: ["self-love", "worth", "respect"] },
  {
    id: 7,
    text: "I accept myself completely as I am",
    category: "Self-Love",
    tags: ["self-love", "acceptance", "authenticity"],
  },
  {
    id: 8,
    text: "I treat myself with kindness and compassion",
    category: "Self-Love",
    tags: ["self-love", "kindness", "compassion"],
  },
  {
    id: 9,
    text: "I celebrate my unique qualities and gifts",
    category: "Self-Love",
    tags: ["self-love", "uniqueness", "gifts"],
  },
  {
    id: 10,
    text: "I forgive myself for past mistakes",
    category: "Self-Love",
    tags: ["self-love", "forgiveness", "healing"],
  },

  // Growth & Learning
  {
    id: 11,
    text: "I embrace challenges as opportunities to grow",
    category: "Growth",
    tags: ["growth", "challenges", "learning"],
  },
  {
    id: 12,
    text: "I am constantly evolving and becoming my best self",
    category: "Growth",
    tags: ["growth", "evolution", "potential"],
  },
  {
    id: 13,
    text: "I learn something valuable from every experience",
    category: "Growth",
    tags: ["growth", "learning", "wisdom"],
  },
  {
    id: 14,
    text: "I step outside my comfort zone with courage",
    category: "Growth",
    tags: ["growth", "courage", "expansion"],
  },
  {
    id: 15,
    text: "I am open to new perspectives and ideas",
    category: "Growth",
    tags: ["growth", "openness", "curiosity"],
  },

  // Peace & Calm
  { id: 16, text: "I choose peace over chaos", category: "Peace", tags: ["peace", "calm", "serenity"] },
  {
    id: 17,
    text: "I breathe in calm and breathe out tension",
    category: "Peace",
    tags: ["peace", "breathing", "relaxation"],
  },
  { id: 18, text: "I find stillness within the storm", category: "Peace", tags: ["peace", "stillness", "resilience"] },
  {
    id: 19,
    text: "I create peaceful moments throughout my day",
    category: "Peace",
    tags: ["peace", "mindfulness", "presence"],
  },
  {
    id: 20,
    text: "I am at peace with what I cannot control",
    category: "Peace",
    tags: ["peace", "acceptance", "letting go"],
  },

  // Gratitude & Appreciation
  {
    id: 21,
    text: "I am grateful for this moment and all it offers",
    category: "Gratitude",
    tags: ["gratitude", "presence", "appreciation"],
  },
  {
    id: 22,
    text: "I appreciate the abundance in my life",
    category: "Gratitude",
    tags: ["gratitude", "abundance", "appreciation"],
  },
  { id: 23, text: "I find joy in simple pleasures", category: "Gratitude", tags: ["gratitude", "joy", "simplicity"] },
  {
    id: 24,
    text: "I am thankful for my body and all it does for me",
    category: "Gratitude",
    tags: ["gratitude", "body", "health"],
  },
  {
    id: 25,
    text: "I express gratitude for the people in my life",
    category: "Gratitude",
    tags: ["gratitude", "relationships", "love"],
  },

  // Strength & Resilience
  {
    id: 26,
    text: "I am stronger than any challenge I face",
    category: "Strength",
    tags: ["strength", "resilience", "courage"],
  },
  {
    id: 27,
    text: "I have overcome difficulties before and I can do it again",
    category: "Strength",
    tags: ["strength", "resilience", "confidence"],
  },
  {
    id: 28,
    text: "I draw strength from within",
    category: "Strength",
    tags: ["strength", "inner power", "resilience"],
  },
  {
    id: 29,
    text: "I am resilient and adaptable",
    category: "Strength",
    tags: ["strength", "resilience", "adaptability"],
  },
  {
    id: 30,
    text: "I face uncertainty with courage and grace",
    category: "Strength",
    tags: ["strength", "courage", "grace"],
  },

  // Connection & Love
  {
    id: 31,
    text: "I am connected to all living beings",
    category: "Connection",
    tags: ["connection", "unity", "love"],
  },
  {
    id: 32,
    text: "I give and receive love freely",
    category: "Connection",
    tags: ["connection", "love", "relationships"],
  },
  {
    id: 33,
    text: "I nurture meaningful relationships",
    category: "Connection",
    tags: ["connection", "relationships", "care"],
  },
  {
    id: 34,
    text: "I am part of something greater than myself",
    category: "Connection",
    tags: ["connection", "purpose", "unity"],
  },
  {
    id: 35,
    text: "I spread kindness wherever I go",
    category: "Connection",
    tags: ["connection", "kindness", "compassion"],
  },

  // Purpose & Meaning
  {
    id: 36,
    text: "I am living my life with purpose and intention",
    category: "Purpose",
    tags: ["purpose", "intention", "meaning"],
  },
  {
    id: 37,
    text: "I make a positive difference in the world",
    category: "Purpose",
    tags: ["purpose", "impact", "contribution"],
  },
  { id: 38, text: "I align my actions with my values", category: "Purpose", tags: ["purpose", "values", "integrity"] },
  { id: 39, text: "I trust my inner wisdom to guide me", category: "Purpose", tags: ["purpose", "wisdom", "guidance"] },
  {
    id: 40,
    text: "I create meaning in everything I do",
    category: "Purpose",
    tags: ["purpose", "meaning", "intention"],
  },
]

const categories = ["All", "Hope", "Self-Love", "Growth", "Peace", "Gratitude", "Strength", "Connection", "Purpose"]

const categoryIcons = {
  Hope: Sparkles,
  "Self-Love": Heart,
  Growth: Target,
  Peace: Star,
  Gratitude: Heart,
  Strength: Target,
  Connection: Heart,
  Purpose: Star,
}

export default function IntentionSelector() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedIntentions, setSelectedIntentions] = useState<number[]>([])

  // Filter intentions based on search and category
  const filteredIntentions = intentionLibrary.filter((intention) => {
    const matchesSearch =
      intention.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intention.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || intention.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const toggleIntention = (intentionId: number) => {
    setSelectedIntentions((prev) =>
      prev.includes(intentionId) ? prev.filter((id) => id !== intentionId) : [...prev, intentionId],
    )
  }

  const saveSelectedIntentions = () => {
    const selected = intentionLibrary.filter((intention) => selectedIntentions.includes(intention.id))
    localStorage.setItem("selectedIntentions", JSON.stringify(selected))
    // You could also trigger a success message here
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taupe-400 h-4 w-4" />
          <Input
            placeholder="Search intentions by keyword (e.g., hope, love, strength)..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons]
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-sage-400 to-rose-400 text-white"
                    : "border-sage-200 text-taupe-700 hover:bg-sage-50"
                }
              >
                {IconComponent && <IconComponent className="w-3 h-3 mr-1" />}
                {category}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Selected Intentions Summary */}
      {selectedIntentions.length > 0 && (
        <Card className="mindful-card bg-gradient-to-r from-sage-50 to-rose-50">
          <CardHeader>
            <CardTitle className="text-taupe-800 font-display flex items-center justify-between">
              <span>Selected Intentions ({selectedIntentions.length})</span>
              <Button onClick={saveSelectedIntentions} size="sm">
                Save Selection
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedIntentions.map((id) => {
                const intention = intentionLibrary.find((i) => i.id === id)
                return intention ? (
                  <Badge key={id} variant="secondary" className="bg-sage-100 text-sage-800">
                    {intention.text.length > 30 ? intention.text.substring(0, 30) + "..." : intention.text}
                  </Badge>
                ) : null
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Intentions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIntentions.map((intention) => {
          const isSelected = selectedIntentions.includes(intention.id)
          const IconComponent = categoryIcons[intention.category as keyof typeof categoryIcons] || Heart

          return (
            <Card
              key={intention.id}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "bg-gradient-to-r from-sage-100 to-rose-100 border-sage-300 shadow-md"
                  : "hover:shadow-md hover:bg-sage-50"
              }`}
              onClick={() => toggleIntention(intention.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-taupe-800 font-medium leading-relaxed mb-2">{intention.text}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-white/50 text-taupe-600 border-taupe-300">
                        <IconComponent className="w-3 h-3 mr-1" />
                        {intention.category}
                      </Badge>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="ml-2">
                      <div className="w-6 h-6 bg-sage-400 rounded-full flex items-center justify-center">
                        <Heart className="w-3 h-3 text-white fill-current" />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredIntentions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-taupe-600">No intentions found matching your search.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
