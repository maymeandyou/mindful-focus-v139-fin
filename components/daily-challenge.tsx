"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Trophy, CheckCircle, RefreshCw, Lightbulb } from "lucide-react"

const challenges = [
  {
    title: "Mindful Morning",
    description: "Spend 5 minutes in silence before checking your phone",
    reflection: "How did starting your day mindfully affect your mood?",
  },
  {
    title: "Gratitude Walk",
    description: "Take a 10-minute walk and notice 3 things you're grateful for",
    reflection: "What did you discover during your grateful walk?",
  },
  {
    title: "Digital Sunset",
    description: "Put away all devices 1 hour before bedtime",
    reflection: "How did disconnecting affect your evening routine?",
  },
  {
    title: "Mindful Eating",
    description: "Eat one meal today without distractions, focusing on taste and texture",
    reflection: "What did you notice about your food and eating habits?",
  },
  {
    title: "Loving Kindness",
    description: "Send a kind message or do something nice for someone today",
    reflection: "How did expressing kindness make you feel?",
  },
  {
    title: "Nature Connection",
    description: "Spend 15 minutes outside, observing the natural world around you",
    reflection: "What did you notice in nature that you hadn't seen before?",
  },
  {
    title: "Breath Awareness",
    description: "Set 3 random alarms to pause and take 5 conscious breaths",
    reflection: "How did these breathing breaks affect your day?",
  },
  {
    title: "Mindful Listening",
    description: "Have a conversation where you focus entirely on listening",
    reflection: "What did you learn from truly listening to someone?",
  },
  {
    title: "Present Moment",
    description: "Choose one routine activity and do it with complete presence",
    reflection: "How was this familiar activity different when done mindfully?",
  },
  {
    title: "Compassion Practice",
    description: "When you notice self-criticism today, respond with self-compassion",
    reflection: "How did treating yourself with kindness change your inner dialogue?",
  },
]

export default function DailyChallenge() {
  const [todaysChallenge, setTodaysChallenge] = useState(challenges[0])
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
      const challengeIndex = Math.floor(Math.random() * challenges.length)
      const newChallenge = challenges[challengeIndex]
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
    const challengeIndex = Math.floor(Math.random() * challenges.length)
    const newChallenge = challenges[challengeIndex]
    setTodaysChallenge(newChallenge)
    setIsCompleted(false)
    setReflection("")
    setShowReflection(false)

    localStorage.setItem("todaysChallenge", JSON.stringify(newChallenge))
    localStorage.removeItem("challengeCompleted")
    localStorage.removeItem("challengeReflection")
  }

  return (
    <Card className="mindful-card animate-scale-in">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center tertiary-title">
          <Trophy className="w-5 h-5 mr-2" style={{ color: "#F9E6C3" }} />
          Today's Challenge
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Challenge Card */}
        <div
          className={`p-6 rounded-xl border-2 transition-all duration-300`}
          style={{
            backgroundColor: isCompleted ? "#DDE5D4" : "#F9E6C3",
            borderColor: isCompleted ? "#d1d9c6" : "#f4d085",
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="body-text font-medium">{todaysChallenge.title}</h3>
            {isCompleted && <CheckCircle className="w-6 h-6 text-green-500 animate-scale-in" />}
          </div>
          <p className="body-text mb-4">{todaysChallenge.description}</p>

          {!isCompleted ? (
            <Button onClick={completeChallenge} className="mindful-button w-full">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Complete
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
              <Lightbulb className="w-4 h-4" style={{ color: "#F9E6C3" }} />
              <h4 className="tertiary-title">Reflection</h4>
            </div>
            <p className="body-text italic">{todaysChallenge.reflection}</p>
            <Textarea
              placeholder="Share your thoughts and insights..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="mindful-input min-h-[100px] resize-none"
              onBlur={saveReflection}
            />
            <p className="form-text">Your reflection is automatically saved</p>
          </div>
        )}

        {/* New Challenge Button */}
        <div className="pt-4" style={{ borderTop: "1px solid #DDE5D4" }}>
          <Button
            onClick={getNewChallenge}
            variant="outline"
            className="w-full rounded-xl form-text"
            style={{ borderColor: "#DDE5D4", color: "#4a4a4a" }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Get New Challenge
          </Button>
        </div>

        <div className="text-center pt-2">
          <p className="form-text">Small mindful actions create meaningful change</p>
        </div>
      </CardContent>
    </Card>
  )
}
