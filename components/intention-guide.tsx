"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Heart, Star, Target, Sparkles, Plus } from "lucide-react"

// Comprehensive intention categories
const intentionCategories = [
  {
    id: "self-love",
    name: "Self-Love & Acceptance",
    icon: Heart,
    color: "from-rose-100 to-pink-100",
    intentions: [
      "I am worthy of love and respect",
      "I accept myself completely as I am",
      "I treat myself with kindness and compassion",
      "I celebrate my unique qualities and gifts",
      "I forgive myself for past mistakes",
      "I honor my feelings and emotions",
      "I speak to myself with love and encouragement",
      "I am enough exactly as I am",
      "I choose to see my beauty inside and out",
      "I deserve happiness and fulfillment",
    ],
  },
  {
    id: "hope",
    name: "Hope & Optimism",
    icon: Sparkles,
    color: "from-amber-100 to-yellow-100",
    intentions: [
      "I choose hope over fear",
      "I trust that everything is working out for my highest good",
      "I see possibilities where others see obstacles",
      "I am hopeful about my future",
      "I maintain hope even in challenging times",
      "I believe in my ability to create positive change",
      "I focus on what's possible rather than what's wrong",
      "I trust in the perfect timing of my life",
      "I am optimistic about new opportunities",
      "I choose to see the light in every situation",
    ],
  },
  {
    id: "growth",
    name: "Growth & Learning",
    icon: Target,
    color: "from-green-100 to-emerald-100",
    intentions: [
      "I embrace challenges as opportunities to grow",
      "I am constantly evolving and becoming my best self",
      "I learn something valuable from every experience",
      "I step outside my comfort zone with courage",
      "I am open to new perspectives and ideas",
      "I welcome feedback as a gift for growth",
      "I celebrate my progress, no matter how small",
      "I am curious about life and eager to learn",
      "I trust my journey of becoming",
      "I grow stronger through every challenge",
    ],
  },
  {
    id: "peace",
    name: "Peace & Calm",
    icon: Star,
    color: "from-blue-100 to-indigo-100",
    intentions: [
      "I choose peace over chaos",
      "I breathe in calm and breathe out tension",
      "I find stillness within the storm",
      "I create peaceful moments throughout my day",
      "I am at peace with what I cannot control",
      "I respond rather than react to challenges",
      "I cultivate inner tranquility",
      "I release worry and embrace serenity",
      "I am grounded and centered",
      "I choose harmony in all my relationships",
    ],
  },
  {
    id: "gratitude",
    name: "Gratitude & Appreciation",
    icon: Heart,
    color: "from-orange-100 to-red-100",
    intentions: [
      "I am grateful for this moment and all it offers",
      "I appreciate the abundance in my life",
      "I find joy in simple pleasures",
      "I am thankful for my body and all it does for me",
      "I express gratitude for the people in my life",
      "I notice and appreciate beauty around me",
      "I am grateful for both challenges and blessings",
      "I appreciate my unique journey",
      "I give thanks for new opportunities",
      "I celebrate the gift of being alive",
    ],
  },
  {
    id: "strength",
    name: "Strength & Resilience",
    icon: Target,
    color: "from-purple-100 to-violet-100",
    intentions: [
      "I am stronger than any challenge I face",
      "I have overcome difficulties before and I can do it again",
      "I draw strength from within",
      "I am resilient and adaptable",
      "I face uncertainty with courage and grace",
      "I trust in my ability to handle whatever comes",
      "I am brave enough to be vulnerable",
      "I stand firm in my values and beliefs",
      "I have the power to create positive change",
      "I am unshakeable in my core strength",
    ],
  },
]

export default function IntentionGuide() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedIntentions, setSelectedIntentions] = useState<string[]>([])

  // Filter categories and intentions based on search
  const filteredCategories = intentionCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.intentions.some((intention) => intention.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredIntentions = searchQuery
    ? intentionCategories.flatMap((category) =>
        category.intentions.filter((intention) => intention.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : []

  const toggleIntention = (intention: string) => {
    setSelectedIntentions((prev) =>
      prev.includes(intention) ? prev.filter((i) => i !== intention) : [...prev, intention],
    )
  }

  const setTodaysIntention = (intention: string) => {
    const today = new Date().toDateString()
    localStorage.setItem("todaysIntention", intention)
    localStorage.setItem("intentionDate", today)
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taupe-400 h-4 w-4" />
        <Input
          placeholder="Search intentions by keyword (e.g., hope, love, strength)..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Selected Intentions Summary */}
      {selectedIntentions.length > 0 && (
        <Card className="mindful-card bg-gradient-to-r from-sage-50 to-rose-50">
          <CardHeader>
            <CardTitle className="text-taupe-800 font-display flex items-center justify-between">
              <span>Selected Intentions ({selectedIntentions.length})</span>
              <Button
                onClick={() => {
                  localStorage.setItem("myIntentions", JSON.stringify(selectedIntentions))
                  setSelectedIntentions([])
                }}
                size="sm"
              >
                Save to My Intentions
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedIntentions.map((intention, index) => (
                <Badge key={index} variant="secondary" className="bg-sage-100 text-sage-800">
                  {intention.length > 30 ? intention.substring(0, 30) + "..." : intention}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {searchQuery && (
        <div className="space-y-4">
          <h3 className="font-semibold text-taupe-800 mb-3">Search Results</h3>
          {filteredIntentions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredIntentions.map((intention, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedIntentions.includes(intention)
                      ? "bg-gradient-to-r from-sage-100 to-rose-100 border-sage-300"
                      : "hover:shadow-md hover:bg-sage-50"
                  }`}
                  onClick={() => toggleIntention(intention)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <p className="text-taupe-800 italic flex-1 pr-2">"{intention}"</p>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            setTodaysIntention(intention)
                          }}
                          className="h-6 w-6 p-0 hover:bg-white/60"
                        >
                          <Plus className="w-3 h-3 text-taupe-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-taupe-600">No intentions found matching your search.</p>
          )}
        </div>
      )}

      {/* Categories */}
      {!searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.id}
                className={`mindful-card hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${category.color} border-sage-200/50`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-taupe-800 font-display">
                    <div className="p-2 bg-white/60 rounded-lg mr-3">
                      <IconComponent className="w-5 h-5 text-taupe-700" />
                    </div>
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                    {category.intentions.slice(0, 3).map((intention, index) => (
                      <div key={index} className="p-3 bg-white/40 rounded-lg">
                        <p className="text-xs text-taupe-700 italic">"{intention}"</p>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-white/70 hover:bg-white/90 text-taupe-800 border border-taupe-200 rounded-lg font-medium"
                    variant="outline"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    Explore All {category.name}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
