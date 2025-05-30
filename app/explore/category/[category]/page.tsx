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

  // Normalize the category to handle any case issues
  const normalizedCategory = category?.toLowerCase()
  const info = categoryInfo[normalizedCategory as keyof typeof categoryInfo]

  if (!info || !category) {
    return (
      <div className="page-transition">
        <PageHeader title="Category Not Found" subtitle="The requested category could not be found" backTo="/explore" />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p>Available categories: {Object.keys(categoryInfo).join(", ")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-transition">
      <PageHeader title={info.title} subtitle={info.subtitle} backTo="/explore" />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <CategoryPractices category={category} />
      </div>
    </div>
  )
}
