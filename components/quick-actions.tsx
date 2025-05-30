"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, Wind, Zap, Target, Users, Sparkles } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Meditation",
    description: "Cultivate inner peace and mindfulness",
    icon: Heart,
    color: "#e8ede6",
    href: "/timer",
  },
  {
    title: "Breathwork",
    description: "Focus on breathing techniques",
    icon: Wind,
    color: "#e0e8f0", // Changed to a light blue
    href: "/breathwork",
  },
  {
    title: "Affirmations",
    description: "Positive self-talk and encouragement",
    icon: Sparkles,
    color: "#f2ece0",
    href: "/affirmations",
  },
  {
    title: "Journal",
    description: "Reflect and record your thoughts",
    icon: Target,
    color: "#ede8e4",
    href: "/journal",
  },
  {
    title: "Habits",
    description: "Build positive daily routines",
    icon: Zap,
    color: "#e6eaed",
    href: "/habits",
  },
  {
    title: "Challenges",
    description: "Engage in mindful activities",
    icon: Users,
    color: "#e8e6ed", // Changed to a light lavender
    href: "/challenges",
  },
]

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action) => {
        const IconComponent = action.icon
        return (
          <Link key={action.title} href={action.href}>
            <Card className="mindful-card hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-0">
                <div
                  className="p-4 rounded-t-2xl flex items-center justify-center"
                  style={{ backgroundColor: action.color }}
                >
                  <IconComponent className="w-8 h-8" style={{ color: "#4a4a4a" }} />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="tertiary-title text-left">{action.title}</h3>
                  <p className="home-card-description text-left">{action.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
