"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Wind, Heart, Eye, Smile, Leaf, User, Dumbbell, Shuffle, ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const categories = [
  {
    id: "meditation",
    name: "Meditation",
    icon: Brain,
    color: "from-sage-100 to-sage-200",
    description: "Cultivate inner peace and awareness through guided and silent meditation practices",
    count: 50,
    featured: ["Body Scan Meditation", "Loving-Kindness Practice", "Mindfulness of Breath"],
  },
  {
    id: "breathwork",
    name: "Breathwork",
    icon: Wind,
    color: "from-rose-100 to-rose-200",
    description: "Transform your state through conscious breathing techniques and patterns",
    count: 50,
    featured: ["4-7-8 Breathing", "Box Breathing", "Alternate Nostril Breathing"],
  },
  {
    id: "gratitude",
    name: "Gratitude",
    icon: Heart,
    color: "from-amber-100 to-amber-200",
    description: "Develop appreciation and thankfulness for life's gifts, big and small",
    count: 50,
    featured: ["Gratitude Journal", "Three Good Things", "Appreciation Walk"],
  },
  {
    id: "mindfulness",
    name: "Mindfulness",
    icon: Eye,
    color: "from-stone-100 to-stone-200",
    description: "Practice present-moment awareness in daily activities and experiences",
    count: 50,
    featured: ["Mindful Eating", "Body Awareness", "Present Moment Check-in"],
  },
  {
    id: "mood",
    name: "Mood",
    icon: Smile,
    color: "from-taupe-100 to-taupe-200",
    description: "Understand and gently shift your emotional states with compassionate practices",
    count: 50,
    featured: ["Mood Tracking", "Emotional Regulation", "Joy Cultivation"],
  },
  {
    id: "nature",
    name: "Nature",
    icon: Leaf,
    color: "from-sage-100 to-rose-100",
    description: "Connect with the natural world to restore balance and find grounding",
    count: 50,
    featured: ["Forest Bathing", "Earthing Practice", "Nature Meditation"],
  },
  {
    id: "self-awareness",
    name: "Self-Awareness",
    icon: User,
    color: "from-rose-100 to-amber-100",
    description: "Deepen understanding of your thoughts, patterns, and inner landscape",
    count: 50,
    featured: ["Values Reflection", "Trigger Awareness", "Personal Boundaries"],
  },
  {
    id: "exercise",
    name: "Exercise",
    icon: Dumbbell,
    color: "from-amber-100 to-stone-100",
    description: "Integrate mindful movement and physical wellness into your practice",
    count: 50,
    featured: ["Mindful Walking", "Gentle Yoga", "Body Awareness Movement"],
  },
  {
    id: "different",
    name: "Doing Things Differently",
    icon: Shuffle,
    color: "from-stone-100 to-taupe-100",
    description: "Break patterns and expand awareness through novel experiences",
    count: 50,
    featured: ["Non-Dominant Hand Practice", "New Perspectives", "Routine Changes"],
  },
]

export default function ActivityCategories() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="mindful-card">
      <CardHeader>
        <CardTitle className="text-taupe-800 font-display">Activity Categories</CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-taupe-400" />
          <Input
            placeholder="Search categories..."
            className="pl-10 mindful-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className={`p-4 rounded-xl bg-gradient-to-br ${category.color} border border-sage-200/50 hover:shadow-md transition-all duration-300 cursor-pointer group`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/60 rounded-lg">
                    <category.icon className="w-5 h-5 text-taupe-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-taupe-800 font-display">{category.name}</h3>
                    <Badge variant="outline" className="mt-1 bg-white/50 text-taupe-600 border-taupe-300">
                      {category.count} activities
                    </Badge>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-taupe-600 group-hover:translate-x-1 transition-transform" />
              </div>

              <p className="text-sm text-taupe-700 mb-3 leading-relaxed">{category.description}</p>

              <div className="space-y-1">
                <p className="text-xs font-medium text-taupe-600 mb-1">Featured:</p>
                {category.featured.map((item, index) => (
                  <p key={index} className="text-xs text-taupe-600">
                    • {item}
                  </p>
                ))}
              </div>

              <Link href={`/explore/${category.id}`}>
                <Button
                  className="w-full mt-3 bg-white/70 hover:bg-white/90 text-taupe-800 border border-taupe-200 rounded-lg font-medium"
                  variant="outline"
                >
                  Explore {category.name}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
