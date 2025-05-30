"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Clock, Star, ArrowLeft } from "lucide-react"
import { useCategoryContext } from "@/contexts/category-context"
import Link from "next/link"

// Practice categories with single-word themes
const categories = [
  {
    id: "meditation",
    name: "Meditation",
    description: "Practices to calm and focus the mind",
    practices: [
      { id: "breath-awareness", name: "Breath Awareness", duration: "10 min", level: "Beginner", featured: false },
      { id: "body-scan", name: "Body Scan", duration: "15 min", level: "Beginner", featured: true },
      { id: "loving-kindness", name: "Loving-Kindness", duration: "10 min", level: "Intermediate", featured: false },
      { id: "open-awareness", name: "Open Awareness", duration: "15 min", level: "Intermediate", featured: true },
      { id: "visualization", name: "Visualization", duration: "10 min", level: "Advanced", featured: false },
    ],
  },
  {
    id: "breathwork",
    name: "Breathwork",
    description: "Breathing techniques for relaxation and energy",
    practices: [
      { id: "4-7-8-breathing", name: "4-7-8 Breathing", duration: "5 min", level: "Beginner", featured: true },
      { id: "box-breathing", name: "Box Breathing", duration: "5 min", level: "Beginner", featured: false },
      { id: "alternate-nostril", name: "Alternate Nostril", duration: "7 min", level: "Intermediate", featured: true },
      { id: "energizing-breath", name: "Energizing Breath", duration: "5 min", level: "Intermediate", featured: false },
      { id: "calming-breath", name: "Calming Breath", duration: "5 min", level: "Beginner", featured: false },
    ],
  },
  {
    id: "gratitude",
    name: "Gratitude",
    description: "Practices to cultivate appreciation and joy",
    practices: [
      { id: "gratitude-journal", name: "Gratitude Journal", duration: "5 min", level: "Beginner", featured: true },
      { id: "appreciation-walk", name: "Appreciation Walk", duration: "15 min", level: "Beginner", featured: false },
      { id: "gratitude-letter", name: "Gratitude Letter", duration: "15 min", level: "Intermediate", featured: true },
      {
        id: "thankfulness-meditation",
        name: "Thankfulness Meditation",
        duration: "10 min",
        level: "Beginner",
        featured: false,
      },
      {
        id: "gratitude-visualization",
        name: "Gratitude Visualization",
        duration: "7 min",
        level: "Intermediate",
        featured: false,
      },
    ],
  },
  {
    id: "mindfulness",
    name: "Mindfulness",
    description: "Practices for present moment awareness",
    practices: [
      { id: "mindful-eating", name: "Mindful Eating", duration: "10 min", level: "Beginner", featured: false },
      { id: "mindful-walking", name: "Mindful Walking", duration: "15 min", level: "Beginner", featured: true },
      { id: "mindful-listening", name: "Mindful Listening", duration: "10 min", level: "Beginner", featured: false },
      { id: "mindful-observation", name: "Mindful Observation", duration: "5 min", level: "Beginner", featured: true },
      {
        id: "mindful-communication",
        name: "Mindful Communication",
        duration: "Practice",
        level: "Intermediate",
        featured: false,
      },
    ],
  },
  {
    id: "mood",
    name: "Mood",
    description: "Practices to understand and improve emotional states",
    practices: [
      { id: "emotion-check", name: "Emotion Check-in", duration: "5 min", level: "Beginner", featured: true },
      { id: "mood-tracking", name: "Mood Tracking", duration: "10 min", level: "Beginner", featured: false },
      { id: "emotional-release", name: "Emotional Release", duration: "15 min", level: "Intermediate", featured: true },
      { id: "joy-practice", name: "Joy Practice", duration: "10 min", level: "Beginner", featured: false },
      { id: "calm-anxiety", name: "Calm Anxiety", duration: "12 min", level: "Intermediate", featured: false },
    ],
  },
  {
    id: "nature",
    name: "Nature",
    description: "Practices connecting with the natural world",
    practices: [
      { id: "nature-walk", name: "Nature Walk", duration: "20 min", level: "Beginner", featured: true },
      { id: "tree-meditation", name: "Tree Meditation", duration: "15 min", level: "Beginner", featured: false },
      { id: "earth-connection", name: "Earth Connection", duration: "10 min", level: "Beginner", featured: true },
      {
        id: "seasonal-awareness",
        name: "Seasonal Awareness",
        duration: "12 min",
        level: "Intermediate",
        featured: false,
      },
      { id: "nature-sounds", name: "Nature Sounds", duration: "15 min", level: "Beginner", featured: false },
    ],
  },
  {
    id: "self-awareness",
    name: "Self-Awareness",
    description: "Practices for deeper self-understanding",
    practices: [
      { id: "values-reflection", name: "Values Reflection", duration: "15 min", level: "Intermediate", featured: true },
      {
        id: "strengths-discovery",
        name: "Strengths Discovery",
        duration: "20 min",
        level: "Intermediate",
        featured: false,
      },
      { id: "inner-dialogue", name: "Inner Dialogue", duration: "12 min", level: "Advanced", featured: true },
      { id: "life-purpose", name: "Life Purpose", duration: "25 min", level: "Advanced", featured: false },
      { id: "shadow-work", name: "Shadow Work", duration: "20 min", level: "Advanced", featured: false },
    ],
  },
  {
    id: "movement",
    name: "Movement",
    description: "Gentle physical practices for mind-body connection",
    practices: [
      { id: "mindful-stretching", name: "Mindful Stretching", duration: "10 min", level: "Beginner", featured: true },
      { id: "walking-meditation", name: "Walking Meditation", duration: "15 min", level: "Beginner", featured: false },
      { id: "gentle-flow", name: "Gentle Flow", duration: "20 min", level: "Intermediate", featured: true },
      { id: "balance-practice", name: "Balance Practice", duration: "10 min", level: "Beginner", featured: false },
      { id: "tension-release", name: "Tension Release", duration: "7 min", level: "Beginner", featured: false },
    ],
  },
  {
    id: "journaling",
    name: "Journaling",
    description: "Reflective writing practices for self-discovery",
    practices: [
      {
        id: "stream-of-consciousness",
        name: "Stream of Consciousness",
        duration: "10 min",
        level: "Beginner",
        featured: false,
      },
      { id: "reflection-journal", name: "Reflection Journal", duration: "15 min", level: "Beginner", featured: true },
      { id: "emotion-tracking", name: "Emotion Tracking", duration: "5 min", level: "Beginner", featured: false },
      {
        id: "future-self-letter",
        name: "Future Self Letter",
        duration: "15 min",
        level: "Intermediate",
        featured: false,
      },
      {
        id: "challenge-reframing",
        name: "Challenge Reframing",
        duration: "10 min",
        level: "Intermediate",
        featured: true,
      },
    ],
  },
]

export default function AllPracticesLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [featuredPractices, setFeaturedPractices] = useState<Record<string, boolean>>({})
  const { setGuidedFlow } = useCategoryContext()

  // Load featured practices from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("featuredPractices")
    if (saved) {
      setFeaturedPractices(JSON.parse(saved))
    } else {
      // Initialize with default featured practices
      const defaultFeatured: Record<string, boolean> = {}
      categories.forEach((category) => {
        category.practices.forEach((practice) => {
          if (practice.featured) {
            defaultFeatured[`${category.id}-${practice.id}`] = true
          }
        })
      })
      setFeaturedPractices(defaultFeatured)
    }
  }, [])

  // Save featured practices to localStorage
  const saveFeaturedPractices = (newFeatured: Record<string, boolean>) => {
    setFeaturedPractices(newFeatured)
    localStorage.setItem("featuredPractices", JSON.stringify(newFeatured))
  }

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  // Toggle featured status
  const toggleFeatured = (categoryId: string, practiceId: string) => {
    const key = `${categoryId}-${practiceId}`
    const newFeatured = {
      ...featuredPractices,
      [key]: !featuredPractices[key],
    }
    saveFeaturedPractices(newFeatured)
  }

  // Start practice with timer
  const startPractice = (categoryId: string, practice: any) => {
    // Navigate to timer page with practice details
    window.location.href = `/timer?practice=${practice.id}&duration=${practice.duration}&title=${encodeURIComponent(practice.name)}&description=${encodeURIComponent(practice.description || `Practice ${practice.name.toLowerCase()}`)}`
  }

  // Filter categories and practices based on search query
  const filteredCategories = categories.filter((category) => {
    const categoryMatches =
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())

    const practicesMatch = category.practices.some((practice) =>
      practice.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return categoryMatches || practicesMatch
  })

  // Count featured practices for each category
  const getFeaturedCount = (categoryId: string) => {
    return (
      categories
        .find((cat) => cat.id === categoryId)
        ?.practices.filter((practice) => featuredPractices[`${categoryId}-${practice.id}`]).length || 0
    )
  }

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center gap-2">
        <Link href="/explore">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Explore
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search all practices..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories and Practices */}
      <div className="space-y-6">
        {filteredCategories.map((category) => {
          const isExpanded = expandedCategories[category.id] || false
          const featuredCount = getFeaturedCount(category.id)

          // Filter practices within this category based on search
          const filteredPractices = searchQuery
            ? category.practices.filter((practice) => practice.name.toLowerCase().includes(searchQuery.toLowerCase()))
            : category.practices

          return (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-sage-50 transition-colors"
                onClick={() => toggleCategory(category.id)}
              >
                <CardTitle className="tertiary-title flex justify-between items-center">
                  <span>{category.name}</span>
                  <Badge variant="outline" className="difficulty-badge">
                    {featuredCount} featured
                  </Badge>
                </CardTitle>
                <div className="card-description">{category.description}</div>
              </CardHeader>

              {(isExpanded || searchQuery) && (
                <CardContent>
                  <div className="space-y-3">
                    {filteredPractices.map((practice, index) => {
                      const practiceKey = `${category.id}-${practice.id}`
                      const isFeatured = featuredPractices[practiceKey]

                      return (
                        <div
                          key={`${category.id}-${index}`}
                          className="flex justify-between items-center p-4 bg-white rounded-lg border border-sage-200 hover:bg-sage-50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="tertiary-title">{practice.name}</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleFeatured(category.id, practice.id)}
                                className={`h-6 w-6 p-0 ${isFeatured ? "text-amber-500" : "text-gray-400"}`}
                              >
                                <Star className={`h-3 w-3 ${isFeatured ? "fill-current" : ""}`} />
                              </Button>
                            </div>
                            <div className="flex items-center form-text">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{practice.duration}</span>
                              <span className="mx-2">•</span>
                              <Badge variant="outline" className="difficulty-badge">
                                {practice.level}
                              </Badge>
                            </div>
                          </div>
                          <Button onClick={() => startPractice(category.id, practice)} className="mindful-button">
                            Start Practice
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="form-text">No practices found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
