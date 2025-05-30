"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Flame, Target, Edit3, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Habit {
  id: number
  name: string
  color: string
  streak: number
  completedToday: boolean
  completedDates: string[]
  createdAt: string
}

const colorClasses = {
  sage: { bg: "#DDE5D4", border: "#d1d9c6", text: "#4a4a4a" },
  rose: { bg: "#F2D6D3", border: "#ecc9c5", text: "#4a4a4a" },
  amber: { bg: "#F9E6C3", border: "#f4d085", text: "#4a4a4a" },
  taupe: { bg: "#E9E3DF", border: "#d8cdc5", text: "#4a4a4a" },
  blue: { bg: "#DCE7EC", border: "#bdd4dd", text: "#4a4a4a" },
}

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [editingHabit, setEditingHabit] = useState<number | null>(null)

  useEffect(() => {
    loadHabits()
  }, [])

  const loadHabits = () => {
    const savedHabits = JSON.parse(localStorage.getItem("habits") || "[]")
    const today = new Date().toDateString()

    // Reset daily completion for new day
    const updatedHabits = savedHabits.map((habit: Habit) => {
      const lastCompletedDate = habit.completedDates[habit.completedDates.length - 1]
      const isCompletedToday = lastCompletedDate === today

      return {
        ...habit,
        completedToday: isCompletedToday,
      }
    })

    setHabits(updatedHabits)
  }

  const toggleHabit = (id: number) => {
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()

    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          const newCompletedToday = !habit.completedToday
          let newCompletedDates = [...habit.completedDates]
          let newStreak = habit.streak

          if (newCompletedToday) {
            // Mark as completed
            if (!newCompletedDates.includes(today)) {
              newCompletedDates.push(today)
            }

            // Calculate streak
            const lastDate = newCompletedDates[newCompletedDates.length - 2]
            if (lastDate === yesterday || newCompletedDates.length === 1) {
              newStreak = habit.streak + 1
            } else {
              newStreak = 1
            }
          } else {
            // Mark as not completed
            newCompletedDates = newCompletedDates.filter((date) => date !== today)

            // Recalculate streak
            if (newCompletedDates.length === 0) {
              newStreak = 0
            } else {
              // Count consecutive days from the end
              let streak = 0
              for (let i = newCompletedDates.length - 1; i >= 0; i--) {
                const date = new Date(newCompletedDates[i])
                const expectedDate = new Date(Date.now() - streak * 86400000)
                expectedDate.setHours(0, 0, 0, 0)
                date.setHours(0, 0, 0, 0)

                if (date.getTime() === expectedDate.getTime()) {
                  streak++
                } else {
                  break
                }
              }
              newStreak = streak
            }
          }

          const updatedHabit = {
            ...habit,
            completedToday: newCompletedToday,
            completedDates: newCompletedDates,
            streak: newStreak,
          }

          // Save to localStorage
          const allHabits = prev.map((h) => (h.id === id ? updatedHabit : h))
          localStorage.setItem("habits", JSON.stringify(allHabits))

          return updatedHabit
        }
        return habit
      }),
    )
  }

  const deleteHabit = (id: number) => {
    const updatedHabits = habits.filter((habit) => habit.id !== id)
    setHabits(updatedHabits)
    localStorage.setItem("habits", JSON.stringify(updatedHabits))
  }

  return (
    <Card className="mindful-card animate-slide-up">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center tertiary-title">
          <Target className="w-5 h-5 mr-2" style={{ color: "#DDE5D4" }} />
          Today's Habits
        </CardTitle>
      </CardHeader>
      <CardContent>
        {habits.length === 0 ? (
          <div className="text-center py-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "linear-gradient(to bottom right, #DDE5D4, #F2D6D3)" }}
            >
              <Target className="w-8 h-8" style={{ color: "#4a4a4a" }} />
            </div>
            <p className="body-text mb-2">No habits yet</p>
            <p className="form-text">Create your first mindful habit to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {habits.map((habit) => {
              const colorStyle = colorClasses[habit.color as keyof typeof colorClasses] || colorClasses.sage
              return (
                <div
                  key={habit.id}
                  className="p-4 rounded-xl border-2 transition-all duration-200"
                  style={{
                    backgroundColor: colorStyle.bg,
                    borderColor: colorStyle.border,
                    color: colorStyle.text,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className={`body-text ${habit.completedToday ? "line-through opacity-60" : ""}`}>
                        {habit.name}
                      </h3>
                      <div className="flex items-center mt-1 space-x-3">
                        <div className="flex items-center">
                          <Flame className="h-3 w-3 mr-1 text-orange-500" />
                          <span className="form-text">{habit.streak} day streak</span>
                        </div>
                        <span className="form-text">{habit.completedDates.length} total</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => setEditingHabit(editingHabit === habit.id ? null : habit.id)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>

                      <Button
                        onClick={() => toggleHabit(habit.id)}
                        variant={habit.completedToday ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "rounded-full w-10 h-10 p-0 transition-all duration-200",
                          habit.completedToday
                            ? "bg-green-500 hover:bg-green-600 text-white shadow-md animate-scale-in"
                            : "border-gray-300 hover:border-green-400 hover:bg-green-50",
                        )}
                      >
                        {habit.completedToday && <Check className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {editingHabit === habit.id && (
                    <div className="mt-3 pt-3 border-t border-current/20">
                      <Button
                        onClick={() => deleteHabit(habit.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50 rounded-lg form-text"
                      >
                        <Trash2 className="h-3 w-3 mr-2" />
                        Delete Habit
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
