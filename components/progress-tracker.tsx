"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Sample data - in a real app, this would come from a database
const habitProgress = [
  { name: "Morning Meditation", current: 5, target: 7, percentage: 71 },
  { name: "Daily Gratitude", current: 12, target: 14, percentage: 86 },
  { name: "Breath Work", current: 3, target: 5, percentage: 60 },
]

export default function ProgressTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Habit Progress</CardTitle>
        <CardDescription>Track your consistency</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {habitProgress.map((habit) => (
            <div key={habit.name} className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{habit.name}</span>
                <span className="text-sm text-muted-foreground">
                  {habit.current}/{habit.target} days
                </span>
              </div>
              <Progress value={habit.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
