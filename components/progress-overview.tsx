"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calendar, Flame, Star } from "lucide-react"

interface ProgressData {
  weeklyGoal: number
  completedThisWeek: number
  currentStreak: number
  totalSessions: number
}

export default function ProgressOverview() {
  const [progress, setProgress] = useState<ProgressData>({
    weeklyGoal: 7,
    completedThisWeek: 0,
    currentStreak: 0,
    totalSessions: 0,
  })

  useEffect(() => {
    calculateProgress()
  }, [])

  const calculateProgress = () => {
    // Get data from localStorage
    const habits = JSON.parse(localStorage.getItem("habits") || "[]")
    const journalEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]")
    const breathworkSessions = JSON.parse(localStorage.getItem("breathworkSessions") || "[]")
    const completedChallenges = JSON.parse(localStorage.getItem("completedChallenges") || "[]")

    // Calculate this week's activities
    const today = new Date()
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      return date.toDateString()
    })

    let completedThisWeek = 0
    weekDates.forEach((date) => {
      const hasHabit = habits.some((habit: any) => habit.completedDates.includes(date))
      const hasJournal = journalEntries.some((entry: any) => new Date(entry.date).toDateString() === date)
      const hasBreathwork = breathworkSessions.some((session: any) => session.date === date)
      const hasChallenge = completedChallenges.some((challenge: any) => challenge.date === date)

      if (hasHabit || hasJournal || hasBreathwork || hasChallenge) {
        completedThisWeek++
      }
    })

    // Calculate current streak
    let currentStreak = 0
    const allDates = new Set([
      ...habits.flatMap((habit: any) => habit.completedDates),
      ...journalEntries.map((entry: any) => new Date(entry.date).toDateString()),
      ...breathworkSessions.map((session: any) => session.date),
      ...completedChallenges.map((challenge: any) => challenge.date),
    ])

    const sortedDates = Array.from(allDates).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    for (let i = 0; i < sortedDates.length; i++) {
      const date = new Date(sortedDates[i])
      const expectedDate = new Date()
      expectedDate.setDate(expectedDate.getDate() - i)

      if (date.toDateString() === expectedDate.toDateString()) {
        currentStreak++
      } else {
        break
      }
    }

    const totalSessions = journalEntries.length + breathworkSessions.length + completedChallenges.length

    setProgress({
      weeklyGoal: 7,
      completedThisWeek,
      currentStreak,
      totalSessions,
    })
  }

  const progressPercentage = Math.min((progress.completedThisWeek / progress.weeklyGoal) * 100, 100)

  return (
    <Card className="mindful-card animate-scale-in">
      <CardHeader className="text-center pb-4">
        <CardTitle className="tertiary-title flex items-center justify-center">
          <TrendingUp className="w-5 h-5 mr-2" style={{ color: "#DDE5D4" }} />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weekly Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="form-text font-medium">This Week</span>
            <span className="form-text">
              {progress.completedThisWeek}/{progress.weeklyGoal} days
            </span>
          </div>
          <div className="w-full rounded-full h-3" style={{ backgroundColor: "#DDE5D4" }}>
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
                backgroundColor: "#c9d1c0",
              }}
            ></div>
          </div>
          <p className="form-text text-center">
            {progressPercentage >= 100
              ? "Amazing! You've reached your weekly goal!"
              : "Keep going, you're doing great!"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className="text-center p-4 rounded-xl border"
            style={{ backgroundColor: "#f8f9fa", borderColor: "#e9ecef" }}
          >
            <div className="flex items-center justify-center mb-2">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-2xl font-bold" style={{ color: "#4a4a4a" }}>
              {progress.currentStreak}
            </p>
            <p className="form-text">Day Streak</p>
          </div>

          <div
            className="text-center p-4 rounded-xl border"
            style={{ backgroundColor: "#f8f9fa", borderColor: "#e9ecef" }}
          >
            <div className="flex items-center justify-center mb-2">
              <Star className="w-5 h-5" style={{ color: "#6c757d" }} />
            </div>
            <p className="text-2xl font-bold" style={{ color: "#4a4a4a" }}>
              {progress.totalSessions}
            </p>
            <p className="form-text">Total Sessions</p>
          </div>
        </div>

        {/* Encouragement */}
        <div
          className="text-center p-4 rounded-xl border"
          style={{ backgroundColor: "#DDE5D4", borderColor: "#d1d9c6" }}
        >
          <Calendar className="w-6 h-6 mx-auto mb-2" style={{ color: "#4a4a4a" }} />
          <p className="form-text font-medium">
            {progress.currentStreak > 0
              ? `You're on a ${progress.currentStreak}-day mindfulness streak!`
              : "Start your mindfulness journey today"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
