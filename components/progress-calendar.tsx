"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarDay {
  date: Date
  hasActivity: boolean
  activities: string[]
}

export default function ProgressCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])

  useEffect(() => {
    generateCalendar()
  }, [currentDate])

  const generateCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    // Get activity data
    const habits = JSON.parse(localStorage.getItem("habits") || "[]")
    const journalEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]")
    const breathworkSessions = JSON.parse(localStorage.getItem("breathworkSessions") || "[]")
    const completedChallenges = JSON.parse(localStorage.getItem("completedChallenges") || "[]")

    const days: CalendarDay[] = []

    // Add empty days for previous month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const date = new Date(year, month, -startingDayOfWeek + i + 1)
      days.push({
        date,
        hasActivity: false,
        activities: [],
      })
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dateString = date.toDateString()

      const activities: string[] = []

      // Check for habits
      const hasHabit = habits.some((habit: any) => habit.completedDates.includes(dateString))
      if (hasHabit) activities.push("Habit")

      // Check for journal entries
      const hasJournal = journalEntries.some((entry: any) => new Date(entry.date).toDateString() === dateString)
      if (hasJournal) activities.push("Journal")

      // Check for breathwork
      const hasBreathwork = breathworkSessions.some((session: any) => session.date === dateString)
      if (hasBreathwork) activities.push("Breathwork")

      // Check for challenges
      const hasChallenge = completedChallenges.some((challenge: any) => challenge.date === dateString)
      if (hasChallenge) activities.push("Challenge")

      days.push({
        date,
        hasActivity: activities.length > 0,
        activities,
      })
    }

    setCalendarDays(days)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const getActivityColor = (activities: string[]) => {
    if (activities.length === 0) return ""
    if (activities.length === 1) return "bg-sage-200"
    if (activities.length === 2) return "bg-amber-300"
    if (activities.length === 3) return "bg-rose-400"
    return "bg-gradient-to-br from-sage-400 to-rose-400"
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Card className="mindful-card animate-scale-in">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center text-taupe-800">
          <Calendar className="w-5 h-5 mr-2 text-sage-500" />
          Activity Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <Button
            onClick={() => navigateMonth("prev")}
            variant="outline"
            size="sm"
            className="border-sage-300 text-taupe-700 hover:bg-sage-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h3 className="text-lg font-semibold text-taupe-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <Button
            onClick={() => navigateMonth("next")}
            variant="outline"
            size="sm"
            className="border-sage-300 text-taupe-700 hover:bg-sage-50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-taupe-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`
                  relative h-10 flex items-center justify-center text-sm rounded-lg transition-all duration-200
                  ${isCurrentMonth(day.date) ? "text-taupe-800" : "text-taupe-400"}
                  ${isToday(day.date) ? "ring-2 ring-sage-400" : ""}
                  ${day.hasActivity ? getActivityColor(day.activities) : "hover:bg-sage-50"}
                `}
                title={day.activities.length > 0 ? `Activities: ${day.activities.join(", ")}` : ""}
              >
                {day.date.getDate()}
                {day.hasActivity && (
                  <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-white rounded-full shadow-sm"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2 pt-4 border-t border-sage-200/50">
          <h4 className="text-sm font-medium text-taupe-800">Activity Legend</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-sage-200 rounded"></div>
              <span className="text-taupe-600">1 activity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-amber-300 rounded"></div>
              <span className="text-taupe-600">2 activities</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-rose-400 rounded"></div>
              <span className="text-taupe-600">3 activities</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-br from-sage-400 to-rose-400 rounded"></div>
              <span className="text-taupe-600">4+ activities</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
