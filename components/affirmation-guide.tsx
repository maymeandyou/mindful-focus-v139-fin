"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Heart, Brain, Star } from "lucide-react"

const tips = [
  {
    icon: Heart,
    title: "Speak with Feeling",
    description: "Connect emotionally with your affirmations. Feel the truth of the words as you say them.",
  },
  {
    icon: Brain,
    title: "Present Tense",
    description: "Use 'I am' rather than 'I will be'. Affirm what you want as if it's already true.",
  },
  {
    icon: Star,
    title: "Personal & Positive",
    description: "Make affirmations about yourself and focus on what you want, not what you don't want.",
  },
  {
    icon: Lightbulb,
    title: "Daily Practice",
    description: "Consistency matters more than duration. Even 2-3 minutes daily creates lasting change.",
  },
]

export default function AffirmationGuide() {
  return (
    <Card className="mindful-card">
      <CardHeader className="text-center">
        <CardTitle className="text-taupe-800 font-display">How to Use Affirmations</CardTitle>
        <p className="text-sm text-taupe-600 mt-2">
          Affirmations are positive statements that help rewire your thinking patterns and beliefs.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tips */}
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="p-2 bg-gradient-to-br from-sage-100 to-rose-100 rounded-lg flex-shrink-0">
                <tip.icon className="w-4 h-4 text-taupe-700" />
              </div>
              <div>
                <h4 className="font-medium text-taupe-800 text-sm">{tip.title}</h4>
                <p className="text-xs text-taupe-600 mt-1 leading-relaxed">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Best Times */}
        <div className="p-4 bg-gradient-to-r from-amber-50 to-stone-50 rounded-xl border border-amber-200/50">
          <h4 className="font-medium text-taupe-800 text-sm mb-2">Best Times to Practice</h4>
          <div className="space-y-1">
            <p className="text-xs text-taupe-600">• Morning: Set positive intentions</p>
            <p className="text-xs text-taupe-600">• Before challenges: Build confidence</p>
            <p className="text-xs text-taupe-600">• Evening: Reinforce growth</p>
            <p className="text-xs text-taupe-600">• During stress: Restore calm</p>
          </div>
        </div>

        {/* Quick Start */}
        <div className="space-y-3">
          <h4 className="font-medium text-taupe-800 text-sm">Quick Start</h4>
          <div className="space-y-2">
            <div className="p-3 bg-white/60 rounded-lg border border-sage-200/50">
              <p className="text-xs font-medium text-taupe-700 mb-1">1. Choose an affirmation</p>
              <p className="text-xs text-taupe-600">Pick one that resonates with your current needs</p>
            </div>
            <div className="p-3 bg-white/60 rounded-lg border border-sage-200/50">
              <p className="text-xs font-medium text-taupe-700 mb-1">2. Repeat with intention</p>
              <p className="text-xs text-taupe-600">Say it 3-5 times, feeling the meaning</p>
            </div>
            <div className="p-3 bg-white/60 rounded-lg border border-sage-200/50">
              <p className="text-xs font-medium text-taupe-700 mb-1">3. Visualize the truth</p>
              <p className="text-xs text-taupe-600">Imagine yourself embodying the affirmation</p>
            </div>
          </div>
        </div>

        <Button className="w-full mindful-button">Start Daily Practice</Button>
      </CardContent>
    </Card>
  )
}
