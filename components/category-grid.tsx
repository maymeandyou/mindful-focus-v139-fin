"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const categories = [
  {
    id: "meditation",
    name: "Meditation",
    description: "Cultivate inner peace and awareness through guided meditation practices",
    color: "from-sage-100 to-sage-200",
    practices: 50,
  },
  {
    id: "breathwork",
    name: "Breathwork",
    description: "Transform your state through conscious breathing techniques",
    color: "from-rose-100 to-rose-200",
    practices: 50,
  },
  {
    id: "gratitude",
    name: "Gratitude",
    description: "Shift your perspective and attract abundance through appreciation",
    color: "from-amber-100 to-amber-200",
    practices: 50,
  },
  {
    id: "mindfulness",
    name: "Mindfulness",
    description: "Develop present-moment awareness in daily life",
    color: "from-stone-100 to-stone-200",
    practices: 50,
  },
  {
    id: "mood",
    name: "Mood",
    description: "Understand and positively influence your emotional states",
    color: "from-taupe-100 to-taupe-200",
    practices: 50,
  },
  {
    id: "nature",
    name: "Nature",
    description: "Connect with the healing power of the natural world",
    color: "from-sage-100 to-rose-100",
    practices: 50,
  },
  {
    id: "self-awareness",
    name: "Self-Awareness",
    description: "Deepen your understanding of your thoughts, patterns, and potential",
    color: "from-rose-100 to-amber-100",
    practices: 50,
  },
  {
    id: "exercise",
    name: "Exercise",
    description: "Integrate mindful movement and physical wellness",
    color: "from-amber-100 to-stone-100",
    practices: 50,
  },
  {
    id: "challenge",
    name: "Challenge",
    description: "Step outside your comfort zone with growth-oriented practices",
    color: "from-stone-100 to-taupe-100",
    practices: 50,
  },
]

export default function CategoryGrid() {
  const router = useRouter()

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/explore/category/${categoryId}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Card
          key={category.id}
          className="mindful-card cursor-pointer hover:shadow-lg transition-all duration-300 group"
          onClick={() => handleCategoryClick(category.id)}
        >
          <CardContent className="p-6">
            <div
              className={`w-full h-32 bg-gradient-to-br ${category.color} rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
            >
              <div className="text-center">
                <h3 className="text-2xl font-display font-bold text-taupe-800 mb-1">{category.name}</h3>
              </div>
            </div>

            <p className="text-taupe-600 text-sm leading-relaxed">{category.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
