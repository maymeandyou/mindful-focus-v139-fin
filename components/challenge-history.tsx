"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, CheckCircle } from "lucide-react"
import { format } from "date-fns"

interface CompletedChallenge {
  date: string
  challenge: {
    title: string
    description: string
  }
  reflection: string
  completed: boolean
}

export default function ChallengeHistory() {
  const [completedChallenges, setCompletedChallenges] = useState<CompletedChallenge[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("completedChallenges") || "[]")
    setCompletedChallenges(saved.slice(0, 5)) // Show last 5 challenges
  }, [])

  return (
    <Card className="mindful-card animate-slide-up">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center text-taupe-800">
          <Trophy className="w-5 h-5 mr-2 text-amber-500" />
          Recent Challenges
        </CardTitle>
      </CardHeader>
      <CardContent>
        {completedChallenges.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-taupe-500" />
            </div>
            <p className="text-taupe-600 mb-2">No completed challenges yet</p>
            <p className="text-xs text-taupe-500">Complete your first challenge to see it here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {completedChallenges.map((challenge, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-amber-50 to-stone-50 rounded-xl border border-amber-200/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-taupe-700">{challenge.challenge.title}</span>
                  </div>
                  <span className="text-xs text-taupe-500">{format(new Date(challenge.date), "MMM d")}</span>
                </div>
                <p className="text-xs text-taupe-600 mb-2">{challenge.challenge.description}</p>
                {challenge.reflection && (
                  <p className="text-xs text-taupe-700 italic bg-white/50 p-2 rounded-lg">"{challenge.reflection}"</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
