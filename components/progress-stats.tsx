"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, Flame, Star, Calendar, Award } from "lucide-react"

interface ProgressData {
  totalDays: number
  currentStreak: number
  longestStreak: number
  totalHabits: number
  totalJournalEntries: number
  totalBreathworkSessions: number
  totalChallenges: number
  weeklyAverage: number
}

export default function ProgressStats() {
  const [stats, setStats] = useState<ProgressData>({
    totalDays: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalHabits: 0,
    totalJournalEntries: 0,
    totalBreathworkSessions: 0,
    totalChallenges: 0,
    weeklyAverage: 0,
  })

  useEffect(() => {
    calculateStats()
  }, [])

  const calculateStats = () => {
    const habits = JSON.parse(localStorage.getItem("habits") || "[]")
    const journalEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]")
    const breathworkSessions = JSON.parse(localStorage.getItem("breathworkSessions") || "[]")
    const completedChallenges = JSON.parse(localStorage.getItem("completedChallenges") || "[]")

    // Get all unique activity dates
    const allDates = new Set([
      ...habits.flatMap((habit: any) => habit.completedDates),
      ...journalEntries.map((entry: any) => new Date(entry.date).toDateString()),
      ...breathworkSessions.map((session: any) => session.date),
      ...completedChallenges.map((challenge: any) => challenge.date),
    ])

    const sortedDates = Array.from(allDates).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    // Calculate current streak
    let currentStreak = 0
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

    // Calculate longest streak
    let longestStreak = 0
    let tempStreak = 0
    const allDatesArray = Array.from(allDates).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

    for (let i = 0; i < allDatesArray.length; i++) {
      if (i === 0) {
        tempStreak = 1
      } else {
        const prevDate = new Date(allDatesArray[i - 1])
        const currentDate = new Date(allDatesArray[i])
        const dayDiff = (currentDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24)

        if (dayDiff === 1) {
          tempStreak++
        } else {
          longestStreak = Math.max(longestStreak, tempStreak)
          tempStreak = 1
        }
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak)

    // Calculate weekly average
    const weeksActive = Math.max(1, Math.ceil(allDates.size / 7))
    const weeklyAverage = Math.round(allDates.size / weeksActive)

    setStats({
      totalDays: allDates.size,
      currentStreak,
      longestStreak,
      totalHabits: habits.length,
      totalJournalEntries: journalEntries.length,
      totalBreathworkSessions: breathworkSessions.length,
      totalChallenges: completedChallenges.length,
      weeklyAverage,
    })
  }

  const statCards = [
    {
      title: "Active Days",
      value: stats.totalDays,
      icon: Calendar,
      color: "from-sage-100 to-stone-100",
      iconColor: "text-sage-600",
    },
    {
      title: "Current Streak",
      value: stats.currentStreak,
      icon: Flame,
      color: "from-orange-100 to-amber-100",
      iconColor: "text-orange-500",
    },
    {
      title: "Longest Streak",
      value: stats.longestStreak,
      icon: Award,
      color: "from-amber-100 to-rose-100",
      iconColor: "text-amber-500",
    },
    {
      title: "Weekly Average",
      value: stats.weeklyAverage,
      icon: TrendingUp,
      color: "from-rose-100 to-sage-100",
      iconColor: "text-rose-500",
    },
  ]

  const activityCards = [
    {
      title: "Habits Created",
      value: stats.totalHabits,
      icon: Target,
      color: "from-sage-50 to-stone-50",
    },
    {
      title: "Journal Entries",
      value: stats.totalJournalEntries,
      icon: Star,
      color: "from-stone-50 to-rose-50",
    },
    {
      title: "Breathwork Sessions",
      value: stats.totalBreathworkSessions,
      icon: Star,
      color: "from-rose-50 to-amber-50",
    },
    {
      title: "Challenges Completed",
      value: stats.totalChallenges,
      icon: Star,
      color: "from-amber-50 to-sage-50",
    },
  ]

  return (
    <Card className="mindful-card animate-scale-in">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center text-taupe-800 font-display text-lg font-semibold">
          <TrendingUp className="w-5 h-5 mr-2 text-sage-500" />
          Progress Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-4">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} border border-sage-200/50 text-center`}
            >
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.iconColor}`} />
              <p className="text-2xl font-bold text-taupe-800">{stat.value}</p>
              <p className="text-xs text-taupe-600">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Activity Breakdown */}
        <div className="space-y-3">
          <h3 className="font-semibold text-taupe-800 text-center">Activity Breakdown</h3>
          <div className="grid grid-cols-2 gap-3">
            {activityCards.map((activity, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg bg-gradient-to-br ${activity.color} border border-sage-200/30 text-center`}
              >
                <p className="text-lg font-bold text-taupe-800">{activity.value}</p>
                <p className="text-xs text-taupe-600">{activity.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Encouragement */}
        <div className="text-center p-4 bg-gradient-to-r from-sage-50 to-rose-50 rounded-xl border border-sage-200/50">
          <p className="text-sm text-taupe-700 font-medium">
            {stats.totalDays === 0
              ? "Begin your mindfulness journey today!"
              : stats.currentStreak > 0
                ? `Amazing! You're on a ${stats.currentStreak}-day streak!`
                : "Every moment is a new opportunity to practice mindfulness."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
