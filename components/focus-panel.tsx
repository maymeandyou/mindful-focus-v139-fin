"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useCategoryContext } from "@/contexts/category-context"
import Link from "next/link"

const categories = [
  { id: "meditation", name: "Meditation" },
  { id: "breathwork", name: "Breathwork" },
  { id: "gratitude", name: "Gratitude" },
  { id: "mindfulness", name: "Mindfulness" },
  { id: "mood", name: "Mood" },
  { id: "nature", name: "Nature" },
  { id: "self-awareness", name: "Self-Awareness" },
  { id: "movement", name: "Movement" },
  { id: "journaling", name: "Journaling" },
]

const themes = [
  { id: "happy", name: "Be Happy" },
  { id: "calm", name: "Calm Down" },
  { id: "stress", name: "Stress Release" },
  { id: "energy", name: "Energizing" },
  { id: "growth", name: "Personal Growth" },
  { id: "connection", name: "Feel Connected" },
]

export default function FocusPanel() {
  const router = useRouter()
  const { selectedCategory, setSelectedCategory, selectedTheme, setSelectedTheme } = useCategoryContext()

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(categoryId)
      setSelectedTheme(null)
      router.push("/explore")
    }
  }

  const handleThemeClick = (themeId: string) => {
    if (selectedTheme === themeId) {
      setSelectedTheme(null)
    } else {
      setSelectedTheme(themeId)
      setSelectedCategory(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Focus Area Section */}
      <Card className="mindful-card">
        <CardHeader className="pb-4 px-6" style={{ backgroundColor: "#dde5d4", borderRadius: "16px 16px 0 0" }}>
          <CardTitle className="tertiary-title">Focus Area</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 5).map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`form-text px-3 py-1 h-auto ${
                  selectedCategory === category.id ? "mindful-button" : "border-sage-200 text-black hover:bg-sage-50"
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          <div className="focus-area-description">Browse practices by category to find what resonates with you</div>
          <div className="flex justify-center pt-2">
            <Link href="/explore/focus">
              <Button variant="link" className="form-text p-0 h-auto text-gray-500">
                View all categories
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Ready to Go Section */}
      <Card className="mindful-card">
        <CardHeader className="pb-4 px-6" style={{ backgroundColor: "#f2d6d3", borderRadius: "16px 16px 0 0" }}>
          <CardTitle className="tertiary-title">Ready to Go</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex flex-col gap-2">
            {themes.map((theme) => (
              <Button
                key={theme.id}
                variant={selectedTheme === theme.id ? "default" : "outline"}
                className={`form-text justify-start px-3 py-2 h-auto ${
                  selectedTheme === theme.id ? "mindful-button" : "border-sage-200 text-black hover:bg-sage-50"
                }`}
                onClick={() => handleThemeClick(theme.id)}
              >
                {theme.name}
              </Button>
            ))}
          </div>
          <div className="focus-area-description">Quick access to themed practices for immediate mindful moments</div>
          <div className="flex justify-center pt-2">
            <Link href="/explore/ready">
              <Button variant="link" className="form-text p-0 h-auto text-gray-500">
                View all themes
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* All Practices Section */}
      <Card className="mindful-card">
        <CardHeader className="pb-4 px-6" style={{ backgroundColor: "#f5e8c8", borderRadius: "16px 16px 0 0" }}>
          <CardTitle className="tertiary-title">All Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="focus-area-description">Browse all available mindfulness practices organized by category</div>
          <div className="flex justify-center pt-2">
            <Link href="/all-practices">
              <Button
                className="mindful-button"
                onClick={() => {
                  setSelectedCategory(null)
                  setSelectedTheme(null)
                }}
              >
                Browse All Practices
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
