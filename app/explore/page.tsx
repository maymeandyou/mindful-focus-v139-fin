"use client"

import { useState } from "react"
import PageHeader from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Star, Users, Zap, Heart, Leaf, Target, Dumbbell, Trophy } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "meditation",
    name: "Meditation",
    description: "Find inner peace and clarity through mindful awareness practices",
    icon: Heart,
    color: "#f8f9fa",
    practiceCount: 25,
    difficulty: "All Levels",
  },
  {
    id: "breathwork",
    name: "Breathwork",
    description: "Harness the power of conscious breathing for wellness and focus",
    icon: Zap,
    color: "#f8f9fa",
    practiceCount: 18,
    difficulty: "Beginner",
  },
  {
    id: "gratitude",
    name: "Gratitude",
    description: "Cultivate appreciation and positive mindset through daily practices",
    icon: Star,
    color: "#f8f9fa",
    practiceCount: 15,
    difficulty: "Beginner",
  },
  {
    id: "mindfulness",
    name: "Mindfulness",
    description: "Develop present-moment awareness in daily activities and interactions",
    icon: Leaf,
    color: "#f8f9fa",
    practiceCount: 30,
    difficulty: "All Levels",
  },
  {
    id: "mood",
    name: "Mood Enhancement",
    description: "Tools and techniques to improve emotional well-being and balance",
    icon: Heart,
    color: "#f8f9fa",
    practiceCount: 20,
    difficulty: "Intermediate",
  },
  {
    id: "nature",
    name: "Nature Connection",
    description: "Reconnect with the natural world for grounding and peace",
    icon: Leaf,
    color: "#f8f9fa",
    practiceCount: 22,
    difficulty: "Beginner",
  },
  {
    id: "self-awareness",
    name: "Self-Awareness",
    description: "Deepen understanding of yourself through reflection and inquiry",
    icon: Target,
    color: "#f8f9fa",
    practiceCount: 16,
    difficulty: "Advanced",
  },
  {
    id: "exercise",
    name: "Mindful Movement",
    description: "Combine physical activity with mindful awareness for holistic wellness",
    icon: Dumbbell,
    color: "#f8f9fa",
    practiceCount: 12,
    difficulty: "All Levels",
  },
  {
    id: "challenge",
    name: "Daily Challenges",
    description: "Growth-oriented activities to expand your comfort zone mindfully",
    icon: Trophy,
    color: "#f8f9fa",
    practiceCount: 10,
    difficulty: "Intermediate",
  },
]

const featuredPractices = [
  {
    title: "Morning Breath Awareness",
    description: "Start your day with focused breathing to center your mind",
    duration: "10 min",
    category: "Breathwork",
    difficulty: "Beginner",
    participants: "2.1k",
    path: "/timer?practice=morning-breath&duration=10&title=Morning%20Breath%20Awareness&description=Start%20your%20day%20with%20focused%20breathing%20to%20center%20your%20mind",
  },
  {
    title: "Gratitude Reflection",
    description: "Cultivate appreciation for the positive aspects of your life",
    duration: "5 min",
    category: "Gratitude",
    difficulty: "Beginner",
    participants: "3.2k",
    path: "/journal",
  },
  {
    title: "Body Scan Meditation",
    description: "Progressive relaxation technique for deep stress relief",
    duration: "15 min",
    category: "Meditation",
    difficulty: "Intermediate",
    participants: "1.8k",
    path: "/timer?practice=body-scan&duration=15&title=Body%20Scan%20Meditation&description=Progressive%20relaxation%20technique%20for%20deep%20stress%20relief",
  },
]

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-sage-50 text-sage-700 border-sage-200"
      case "Intermediate":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "Advanced":
        return "bg-rose-50 text-rose-700 border-rose-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="page-transition">
      <PageHeader
        title="Explore Mindful Practices"
        subtitle="Discover a variety of practices to enhance your well-being and mindfulness journey"
      />

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
        {/* Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/explore/focus">
            <Card className="mindful-card hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <h3 className="tertiary-title mb-2">Focus Area</h3>
                <p className="card-description text-[#4a4a4a]">Targeted practices for specific goals and outcomes</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/explore/ready">
            <Card className="mindful-card hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <h3 className="tertiary-title mb-2">Ready to Go</h3>
                <p className="card-description text-[#4a4a4a]">Quick-start themed journeys for immediate practice</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/all-practices">
            <Card className="mindful-card hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <h3 className="tertiary-title mb-2">All Practices</h3>
                <p className="card-description text-[#4a4a4a]">
                  Complete library of mindfulness exercises and techniques
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Featured Practices */}
        <section>
          <h2 className="secondary-title mb-6">Featured Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPractices.map((practice, index) => (
              <Card key={index} className="mindful-card hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <Badge
                      variant="outline"
                      className={`text-xs font-normal ${getDifficultyColor(practice.difficulty)}`}
                    >
                      {practice.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-[#4a4a4a]">
                      <Users className="h-4 w-4 mr-1" />
                      {practice.participants}
                    </div>
                  </div>
                  <h3 className="tertiary-title mb-2">{practice.title}</h3>
                  <p
                    className="text-[#4a4a4a] mb-4 flex-1"
                    style={{ fontSize: "14px", textAlign: "left", margin: 0, padding: 0 }}
                  >
                    {practice.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center text-[#4a4a4a]">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{practice.duration}</span>
                    </div>
                    <Link href={practice.path}>
                      <Button size="sm" className="mindful-button">
                        Start Practice
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Practice Categories */}
        <section>
          <h2 className="secondary-title mb-6">Practice Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/explore/category/${category.id}`}>
                <Card className="mindful-card hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="h-12 w-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: category.color }}
                      >
                        <category.icon className="h-6 w-6 text-[#4a4a4a]" />
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs font-normal ${getDifficultyColor(category.difficulty)}`}
                      >
                        {category.difficulty}
                      </Badge>
                    </div>
                    <h3 className="tertiary-title mb-2">{category.name}</h3>
                    <p
                      className="text-[#4a4a4a] mb-4 flex-1"
                      style={{ fontSize: "14px", textAlign: "left", margin: 0, padding: 0 }}
                    >
                      {category.description}
                    </p>
                    <div className="flex items-center justify-end mt-auto">
                      <ArrowRight className="h-4 w-4 text-[#4a4a4a]" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
