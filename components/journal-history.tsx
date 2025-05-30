"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar, Smile, Meh, Frown, Heart, Star } from "lucide-react"
import { format } from "date-fns"

interface JournalEntry {
  id: number
  date: string
  content: string
  mood: string
  prompt?: string
}

const moodIcons = {
  Great: { icon: Star, color: "text-amber-500" },
  Good: { icon: Smile, color: "text-green-500" },
  Okay: { icon: Meh, color: "text-blue-500" },
  Low: { icon: Frown, color: "text-orange-500" },
  Grateful: { icon: Heart, color: "text-rose-500" },
}

export default function JournalHistory() {
  const [entries, setEntries] = useState<JournalEntry[]>([])

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]")
    setEntries(savedEntries.slice(0, 5)) // Show last 5 entries
  }, [])

  return (
    <Card className="mindful-card animate-slide-up">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center text-taupe-800">
          <BookOpen className="w-5 h-5 mr-2 text-sage-500" />
          Recent Reflections
        </CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-sage-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-taupe-500" />
            </div>
            <p className="text-taupe-600 mb-2">No journal entries yet</p>
            <p className="text-xs text-taupe-500">Start writing to see your reflections here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => {
              const MoodIcon = moodIcons[entry.mood as keyof typeof moodIcons]?.icon || Calendar
              const moodColor = moodIcons[entry.mood as keyof typeof moodIcons]?.color || "text-taupe-500"

              return (
                <div
                  key={entry.id}
                  className="p-4 bg-gradient-to-r from-stone-50 to-sage-50 rounded-xl border border-stone-200/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <MoodIcon className={`w-4 h-4 ${moodColor}`} />
                      <span className="text-sm font-medium text-taupe-700">{entry.mood}</span>
                    </div>
                    <span className="text-xs text-taupe-500">{format(new Date(entry.date), "MMM d, yyyy")}</span>
                  </div>
                  <p className="text-sm text-taupe-700 line-clamp-3">{entry.content}</p>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
