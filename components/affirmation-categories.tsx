"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, Shield, TreePine, Gift, Users } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "self-love",
    name: "Self-Love & Acceptance",
    description: "Embrace your worth and practice self-compassion",
    icon: Heart,
    color: "#f8f9fa",
    count: 10,
  },
  {
    id: "confidence",
    name: "Confidence & Strength",
    description: "Build inner strength and trust in your abilities",
    icon: Sparkles,
    color: "#f5f7fa",
    count: 10,
  },
  {
    id: "peace",
    name: "Peace & Calm",
    description: "Find tranquility and release stress",
    icon: TreePine,
    color: "#f0f4f8",
    count: 10,
  },
  {
    id: "growth",
    name: "Growth & Learning",
    description: "Embrace change and celebrate progress",
    icon: Gift,
    color: "#faf8f5",
    count: 10,
  },
  {
    id: "gratitude",
    name: "Gratitude & Abundance",
    description: "Appreciate life's blessings and attract positivity",
    icon: Users,
    color: "#f9f7f4",
    count: 10,
  },
  {
    id: "protection",
    name: "Protection & Boundaries",
    description: "Honor your needs and create healthy limits",
    icon: Shield,
    color: "#f6f8fa",
    count: 10,
  },
]

export default function AffirmationCategories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const IconComponent = category.icon
        return (
          <Card key={category.id} className="mindful-card hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: category.color }}
              >
                <IconComponent className="w-8 h-8" style={{ color: "#4a4a4a" }} />
              </div>
              <CardTitle className="tertiary-title">{category.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="card-description" style={{ color: "#4a4a4a", paddingLeft: "0" }}>
                {category.description}
              </p>
              <div className="text-sm text-gray-500">{category.count} affirmations</div>
              <Link href={`/affirmations/${category.id}`}>
                <Button className="w-full mindful-button">Explore Affirmations</Button>
              </Link>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
