"use client"

import { useState, useEffect } from "react"
import { Save, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { format, subDays, addDays } from "date-fns"

// Sample data - in a real app, this would come from a database
const sampleEntries = {
  "2025-04-09":
    "Today I practiced deep breathing when I felt stressed during my meeting. It really helped me stay centered.",
  "2025-04-08":
    "I spent 10 minutes in nature during lunch break. The fresh air and sounds of birds made me feel refreshed.",
  "2025-04-07":
    "Tried a new meditation technique focusing on body scanning. I noticed tension in my shoulders I wasn't aware of.",
}

export default function MindfulJournal() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [entry, setEntry] = useState("")
  const [entries, setEntries] = useState(sampleEntries)
  const dateKey = format(currentDate, "yyyy-MM-dd")

  useEffect(() => {
    // Load entry for the current date if it exists
    setEntry(entries[dateKey] || "")
  }, [currentDate, entries, dateKey])

  const saveEntry = () => {
    if (entry.trim()) {
      setEntries({
        ...entries,
        [dateKey]: entry,
      })
    }
  }

  const navigateDay = (direction: number) => {
    if (direction < 0) {
      setCurrentDate(subDays(currentDate, 1))
    } else {
      setCurrentDate(addDays(currentDate, 1))
    }
  }

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/50 dark:to-teal-950/50">
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-lg font-semibold">Mindful Journal</CardTitle>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" onClick={() => navigateDay(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center bg-white dark:bg-background rounded-md px-2 py-1">
              <Calendar className="h-4 w-4 mr-2 text-teal-600" />
              <span className="text-sm font-medium">{format(currentDate, "MMM d, yyyy")}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateDay(1)}
              disabled={dateKey === format(new Date(), "yyyy-MM-dd")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>Reflect on your mindfulness journey</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Textarea
            placeholder="Write your thoughts, reflections, or experiences with today's mindful practices..."
            className="min-h-[150px] resize-none"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {entries[dateKey] ? "Last edited today" : "No entry for this date yet"}
            </p>
            <Button onClick={saveEntry} className="bg-teal-600 hover:bg-teal-700">
              <Save className="mr-2 h-4 w-4" />
              Save Entry
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
