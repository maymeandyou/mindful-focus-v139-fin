"use client"

import { useParams } from "next/navigation"
import PageHeader from "@/components/page-header"
import CategoryPractices from "@/components/category-practices"

const categoryInfo = {
  meditation: {
    title: "Meditation",
    subtitle: "Cultivate inner peace and awareness through guided meditation practices",
  },
  breathwork: {
    title: "Breathwork",
    subtitle: "Transform your state through conscious breathing techniques",
  },
  gratitude: {
    title: "Gratitude",
    subtitle: "Shift your perspective and attract abundance through appreciation",
  },
  mindfulness: {
    title: "Mindfulness",
    subtitle: "Develop present-moment awareness in daily life",
  },
  mood: {
    title: "Mood",
    subtitle: "Understand and positively influence your emotional states",
  },
  nature: {
    title: "Nature",
    subtitle: "Connect with the healing power of the natural world",
  },
  "self-awareness": {
    title: "Self-Awareness",
    subtitle: "Deepen your understanding of your thoughts, patterns, and potential",
  },
  exercise: {
    title: "Exercise",
    subtitle: "Integrate mindful movement and physical wellness",
  },
  challenge: {
    title: "Challenge",
    subtitle: "Step outside your comfort zone with growth-oriented practices",
  },
}

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const info = categoryInfo[category as keyof typeof categoryInfo]

  if (!info) {
    return <div>Category not found</div>
  }

  return (
    <div className="page-transition">
      <PageHeader title={info.title} subtitle={info.subtitle} backTo="/explore" />

      {/* Daily Inspiration Quote */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="bg-sage-50 rounded-lg p-6 border border-sage-200">
          <p className="text-center" style={{ fontSize: "20px", lineHeight: "1.6", color: "#4a4a4a", margin: 0 }}>
            "Peace comes from within. Do not seek it without."
          </p>
          <p className="text-center mt-2" style={{ fontSize: "20px", color: "#4a4a4a", margin: 0 }}>
            (Buddha)
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <CategoryPractices category={category} />
      </div>
    </div>
  )
}
