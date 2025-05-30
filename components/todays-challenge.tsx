"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Trophy, CheckCircle, RefreshCw, Lightbulb, Play } from "lucide-react"

const dailyChallenges = [
  {
    title: "Mindful Morning Ritual",
    description: "Start your day with 5 minutes of intentional breathing and gratitude",
    reflection: "How did beginning your day mindfully affect your mood and energy?",
    difficulty: "Easy",
    duration: "5 min",
  },
  {
    title: "Technology Pause",
    description: "Before checking your phone or computer, take three conscious breaths",
    reflection: "What did you notice about your relationship with technology today?",
    difficulty: "Easy",
    duration: "All day",
  },
  {
    title: "Gratitude Walk",
    description: "Take a 10-minute walk and notice 5 things you're grateful for",
    reflection: "What unexpected things did you find to appreciate during your walk?",
    difficulty: "Easy",
    duration: "10 min",
  },
  {
    title: "Loving-Kindness Practice",
    description: "Send kind thoughts to yourself, a loved one, a neutral person, and someone difficult",
    reflection: "How did extending loving-kindness affect your heart and mind?",
    difficulty: "Medium",
    duration: "15 min",
  },
  {
    title: "Mindful Eating",
    description: "Eat one meal today without distractions, focusing on taste, texture, and gratitude",
    reflection: "What did you discover about your food and eating habits?",
    difficulty: "Medium",
    duration: "30 min",
  },
  {
    title: "Digital Sunset",
    description: "Put away all devices 1 hour before bedtime and engage in calming activities",
    reflection: "How did disconnecting before bed affect your evening and sleep?",
    difficulty: "Hard",
    duration: "60 min",
  },
  {
    title: "Random Act of Kindness",
    description: "Perform an unexpected act of kindness for someone without expecting anything in return",
    reflection: "How did giving kindness make you feel? What did you observe in others?",
    difficulty: "Easy",
    duration: "15 min",
  },
]

export default function TodaysChallenge() {
  const [todaysChallenge, setTodaysChallenge] = useState(dailyChallenges[0])
  const [isCompleted, setIsCompleted] = useState(false)
  const [reflection, setReflection] = useState("")
  const [showReflection, setShowReflection] = useState(false)

  useEffect(() => {
    // Get today's challenge
    const today = new Date().toDateString()
    const savedChallengeDate = localStorage.getItem("challengeDate")
    const savedChallenge = localStorage.getItem("todaysChallenge")
    const savedCompletion = localStorage.getItem("challengeCompleted") === "true"
    const savedReflection = localStorage.getItem("challengeReflection") || ""

    if (savedChallengeDate === today && savedChallenge) {
      setTodaysChallenge(JSON.parse(savedChallenge))
      setIsCompleted(savedCompletion)
      setReflection(savedReflection)
      setShowReflection(savedCompletion)
    } else {
      // New day, get new challenge
      const challengeIndex = Math.floor(Math.random() * dailyChallenges.length)
      const newChallenge = dailyChallenges[challengeIndex]
      setTodaysChallenge(newChallenge)
      setIsCompleted(false)
      setReflection("")
      setShowReflection(false)

      localStorage.setItem("challengeDate", today)
      localStorage.setItem("todaysChallenge", JSON.stringify(newChallenge))
      localStorage.removeItem("challengeCompleted")
      localStorage.removeItem("challengeReflection")
    }
  }, [])

  const completeChallenge = () => {
    setIsCompleted(true)
    setShowReflection(true)
    localStorage.setItem("challengeCompleted", "true")
  }

  const saveReflection = () => {
    if (reflection.trim()) {
      localStorage.setItem("challengeReflection", reflection)

      // Save to challenge history
      const today = new Date().toDateString()
      const completedChallenges = JSON.parse(localStorage.getItem("completedChallenges") || "[]")
      completedChallenges.push({
        date: today,
        challenge: todaysChallenge,
        reflection: reflection,
        completed: true,
      })
      localStorage.setItem("completedChallenges", JSON.stringify(completedChallenges))
    }
  }

  const getNewChallenge = () => {
    const challengeIndex = Math.floor(Math.random() * dailyChallenges.length)
    const newChallenge = dailyChallenges[challengeIndex]
    setTodaysChallenge(newChallenge)
    setIsCompleted(false)
    setReflection("")
    setShowReflection(false)

    localStorage.setItem("todaysChallenge", JSON.stringify(newChallenge))
    localStorage.removeItem("challengeCompleted")
    localStorage.removeItem("challengeReflection")
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-300"
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-300"
      case "Hard":
        return "bg-rose-100 text-rose-800 border-rose-300"
      default:
        return "bg-stone-100 text-stone-800 border-stone-300"
    }
  }

  return (
    <Card className="mindful-card">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center text-taupe-800 font-display">
          <Trophy className="w-5 h-5 mr-2 text-amber-500" />
          Today's Challenge
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Challenge Card */}
        <div
          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            isCompleted
              ? "bg-gradient-to-r from-green-50 to-sage-50 border-green-300"
              : "bg-gradient-to-r from-amber-50 to-rose-50 border-amber-200"
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-taupe-800 mb-2">{todaysChallenge.title}</h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={`text-xs ${getDifficultyColor(todaysChallenge.difficulty)}`}>
                  {todaysChallenge.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs bg-stone-100 text-stone-800 border-stone-300">
                  {todaysChallenge.duration}
                </Badge>
              </div>
            </div>
            {isCompleted && <CheckCircle className="w-6 h-6 text-green-500 animate-scale-in flex-shrink-0" />}
          </div>

          <p className="text-taupe-700 leading-relaxed mb-4">{todaysChallenge.description}</p>

          {!isCompleted ? (
            <Button onClick={completeChallenge} className="mindful-button w-full">
              <Play className="w-4 h-4 mr-2" />
              Start Challenge
            </Button>
          ) : (
            <div className="flex items-center text-green-700 font-medium">
              <CheckCircle className="w-4 h-4 mr-2" />
              Challenge Completed!
            </div>
          )}
        </div>

        {/* Reflection Section */}
        {showReflection && (
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <h4 className="font-medium text-taupe-800">Reflection</h4>
            </div>
            <p className="text-sm text-taupe-600 italic">{todaysChallenge.reflection}</p>
            <Textarea
              placeholder="Share your thoughts and insights..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="mindful-input min-h-[100px] resize-none"
              onBlur={saveReflection}
            />
            <p className="text-xs text-taupe-500">Your reflection is automatically saved</p>
          </div>
        )}

        {/* New Challenge Button */}
        <div className="pt-4 border-t border-sage-200/50">
          <Button
            onClick={getNewChallenge}
            variant="outline"
            className="w-full border-sage-300 text-taupe-700 hover:bg-sage-50 rounded-xl"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Get New Challenge
          </Button>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-taupe-500">Small mindful actions create meaningful change</p>
        </div>
      </CardContent>
    </Card>
  )
}
