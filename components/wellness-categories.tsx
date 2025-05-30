import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TreesIcon as Lungs, Heart, Brain, Smile, Leaf, Sparkles, Music, Palette, MoveHorizontal } from "lucide-react"

// Expanded categories with more options
const categories = [
  { name: "Breath Work", icon: Lungs, count: 5, color: "text-blue-500" },
  { name: "Meditation", icon: Sparkles, count: 5, color: "text-purple-500" },
  { name: "Gratitude", icon: Heart, count: 5, color: "text-pink-500" },
  { name: "Mindfulness", icon: Brain, count: 5, color: "text-teal-500" },
  { name: "Mood", icon: Smile, count: 5, color: "text-amber-500" },
  { name: "Nature", icon: Leaf, count: 5, color: "text-green-500" },
  { name: "Movement", icon: MoveHorizontal, count: 5, color: "text-indigo-500" },
  { name: "Creativity", icon: Palette, count: 5, color: "text-rose-500" },
  { name: "Sound", icon: Music, count: 3, color: "text-cyan-500" },
]

export default function WellnessCategories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>Your wellness activity types</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <div
                key={category.name}
                className="flex flex-col items-center justify-center p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <Icon className={`h-6 w-6 mb-2 ${category.color}`} />
                <span className="text-sm font-medium text-center">{category.name}</span>
                <span className="text-xs text-muted-foreground">{category.count} activities</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
