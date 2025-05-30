"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import PageHeader from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Search, ArrowLeft } from "lucide-react"

const affirmationCategories = [
  {
    id: "self-love",
    name: "Self-Love & Acceptance",
    color: "from-rose-100 to-amber-100",
    affirmations: [
      "I am worthy of love and kindness, especially from myself",
      "I accept myself completely as I am right now",
      "I treat myself with the same compassion I show others",
      "My worth is not determined by my achievements",
      "I am enough, exactly as I am",
      "I forgive myself for past mistakes and embrace growth",
      "I choose to speak to myself with love and respect",
      "I honor my feelings and give myself permission to feel",
      "I am deserving of happiness and peace",
      "I celebrate my unique qualities and gifts",
    ],
  },
  {
    id: "confidence",
    name: "Confidence & Strength",
    color: "from-amber-100 to-stone-100",
    affirmations: [
      "I trust in my ability to handle whatever comes my way",
      "I am capable of achieving my goals",
      "My confidence grows stronger each day",
      "I believe in myself and my decisions",
      "I have the strength to overcome challenges",
      "I am resilient and can adapt to change",
      "I trust my intuition and inner wisdom",
      "I am brave enough to step outside my comfort zone",
      "I possess all the qualities I need to succeed",
      "I am proud of how far I have come",
    ],
  },
  {
    id: "peace",
    name: "Peace & Calm",
    color: "from-sage-100 to-stone-100",
    affirmations: [
      "I am at peace with what I cannot control",
      "My mind is calm and my heart is open",
      "I choose peace over worry",
      "I breathe in calm and breathe out tension",
      "I am grounded and centered in this moment",
      "I release what no longer serves me",
      "I find tranquility in the present moment",
      "I am safe and secure in this moment",
      "I let go of stress and embrace serenity",
      "Peace flows through every cell of my being",
    ],
  },
  {
    id: "growth",
    name: "Growth & Learning",
    color: "from-stone-100 to-taupe-100",
    affirmations: [
      "I am constantly growing and evolving",
      "Every experience teaches me something valuable",
      "I embrace challenges as opportunities to learn",
      "I am open to new perspectives and ideas",
      "My potential is limitless",
      "I learn from my mistakes without judgment",
      "I am becoming the person I want to be",
      "Growth happens at my own perfect pace",
      "I celebrate small steps forward",
      "I am curious and eager to discover more about myself",
    ],
  },
  {
    id: "gratitude",
    name: "Gratitude & Abundance",
    color: "from-taupe-100 to-rose-100",
    affirmations: [
      "I am grateful for all the blessings in my life",
      "Abundance flows to me in expected and unexpected ways",
      "I appreciate the simple joys in each day",
      "I am thankful for my body and all it does for me",
      "I notice and celebrate the good around me",
      "I am grateful for both challenges and victories",
      "My heart is full of appreciation",
      "I attract positive experiences into my life",
      "I am blessed with loving relationships",
      "I find reasons to be grateful in every situation",
    ],
  },
  {
    id: "protection",
    name: "Protection & Boundaries",
    color: "from-sage-100 to-rose-100",
    affirmations: [
      "I set healthy boundaries with love and respect",
      "I protect my energy and peace of mind",
      "I say no to what doesn't serve my highest good",
      "I am surrounded by love and positive energy",
      "I choose relationships that honor and support me",
      "I trust myself to make decisions that protect my wellbeing",
      "I release toxic thoughts and embrace healing ones",
      "I am safe to express my authentic self",
      "I honor my needs and communicate them clearly",
      "I create a life that reflects my values",
    ],
  },
]

export default function AffirmationCategoryPage() {
  const params = useParams()
  const router = useRouter()
  const [category, setCategory] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [favoriteAffirmations, setFavoriteAffirmations] = useState<string[]>([])

  useEffect(() => {
    const categoryId = params.category as string
    const foundCategory = affirmationCategories.find((c) => c.id === categoryId)
    if (foundCategory) {
      setCategory(foundCategory)
    } else {
      router.push("/affirmations")
    }

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("favoriteAffirmations")
    if (savedFavorites) {
      setFavoriteAffirmations(JSON.parse(savedFavorites))
    }
  }, [params.category, router])

  const filteredAffirmations =
    category?.affirmations.filter((affirmation) => affirmation.toLowerCase().includes(searchQuery.toLowerCase())) || []

  const toggleFavorite = (affirmation: string) => {
    const newFavorites = favoriteAffirmations.includes(affirmation)
      ? favoriteAffirmations.filter((fav) => fav !== affirmation)
      : [...favoriteAffirmations, affirmation]

    setFavoriteAffirmations(newFavorites)
    localStorage.setItem("favoriteAffirmations", JSON.stringify(newFavorites))
  }

  if (!category) return null

  return (
    <div className="page-transition">
      <PageHeader title={category.name} subtitle="Transform your inner dialogue with powerful, positive statements" />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Button
          onClick={() => router.push("/affirmations")}
          variant="outline"
          className="mb-6 border-sage-300 text-taupe-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Button>

        <Card className={`mindful-card bg-gradient-to-br ${category.color}`}>
          <CardHeader>
            <CardTitle className="text-taupe-800 font-display">{category.name} Affirmations</CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-taupe-400" />
              <Input
                placeholder="Search affirmations..."
                className="pl-10 mindful-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredAffirmations.map((affirmation, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/60 rounded-xl border border-sage-200/30 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-taupe-800 font-serif italic">{affirmation}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(affirmation)}
                      className="ml-2 p-1 h-8 w-8"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favoriteAffirmations.includes(affirmation) ? "fill-rose-500 text-rose-500" : "text-taupe-400"
                        }`}
                      />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredAffirmations.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-taupe-600">No affirmations found matching your search.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
