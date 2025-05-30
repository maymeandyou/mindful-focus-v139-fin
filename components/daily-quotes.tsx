"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote } from "lucide-react"

const dailyQuotes = [
  "Every moment is a fresh beginning.",
  "Breathe in peace, breathe out stress.",
  "You are exactly where you need to be.",
  "Small steps lead to big changes.",
  "Today is full of possibilities.",
  "Your potential is endless.",
  "Choose joy in this moment.",
  "You have the power to create your day.",
  "Embrace the journey, not just the destination.",
  "Kindness is always the right choice.",
  "Trust the process of your life.",
  "You are stronger than you think.",
  "Let go of what no longer serves you.",
  "Focus on progress, not perfection.",
  "Your thoughts create your reality.",
  "Be present in this beautiful moment.",
  "You are worthy of love and happiness.",
  "Every challenge is an opportunity to grow.",
  "Gratitude transforms ordinary days into blessings.",
  "You have everything you need within you.",
  "Choose peace over worry.",
  "Your heart knows the way.",
  "Believe in the magic of new beginnings.",
  "You are the author of your own story.",
  "Compassion starts with yourself.",
  "Today is a gift, that's why it's called the present.",
  "Your energy introduces you before you speak.",
  "Let your light shine brightly.",
  "You are capable of amazing things.",
  "Trust your inner wisdom.",
  "Every breath is a chance to start again.",
  "You are loved more than you know.",
  "Embrace uncertainty as an adventure.",
  "Your dreams are valid and achievable.",
  "Be gentle with yourself today.",
  "You have the courage to face anything.",
  "Let love guide your decisions.",
  "You are a work of art in progress.",
  "Find beauty in the ordinary moments.",
  "Your presence is a gift to the world.",
  "Choose hope over fear.",
  "You are exactly enough as you are.",
  "Let gratitude fill your heart.",
  "You have the power to heal and grow.",
  "Trust that everything happens for a reason.",
  "Your soul knows what it needs.",
  "Be kind to yourself and others.",
  "You are on the right path.",
  "Let peace be your superpower.",
  "You are worthy of all good things.",
]

export default function DailyQuotes() {
  const [currentQuote, setCurrentQuote] = useState("")
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    // Get day of year for consistent daily rotation
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now.getTime() - start.getTime()
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))

    const index = dayOfYear % dailyQuotes.length
    setQuoteIndex(index)
    setCurrentQuote(dailyQuotes[index])
  }, [])

  const chooseAnother = () => {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * dailyQuotes.length)
    } while (newIndex === quoteIndex && dailyQuotes.length > 1)

    setQuoteIndex(newIndex)
    setCurrentQuote(dailyQuotes[newIndex])
  }

  if (!currentQuote) return null

  return (
    <Card className="mindful-card animate-scale-in">
      <CardHeader className="text-center pb-4">
        <CardTitle className="tertiary-title flex items-center justify-center">
          <Quote className="w-5 h-5 mr-3" style={{ color: "#4a4a4a" }} />
          Daily Inspiration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-6 rounded-xl" style={{ backgroundColor: "#f8f9fa" }}>
          <p className="quote-text-large text-center">"{currentQuote}"</p>
        </div>

        <Button
          onClick={chooseAnother}
          variant="outline"
          className="w-full py-1 text-black border-gray-300 bg-white hover:bg-gray-50"
          style={{ height: "36px" }}
        >
          Choose Another
        </Button>
      </CardContent>
    </Card>
  )
}
