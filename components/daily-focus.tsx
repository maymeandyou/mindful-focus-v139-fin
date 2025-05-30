"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Sample data - in a real app, this would come from a database
const initialFocusItems = [
  {
    id: 1,
    title: "Morning Breath Work",
    description: "5 minutes of deep breathing to start the day",
    completed: false,
    category: "breath",
  },
  {
    id: 2,
    title: "Gratitude Journal",
    description: "Write down 3 things you're grateful for",
    completed: false,
    category: "gratitude",
  },
  {
    id: 3,
    title: "Mindful Walking",
    description: "10 minute walk without devices, focusing on your surroundings",
    completed: false,
    category: "mindfulness",
  },
]

export default function DailyFocus() {
  const [focusItems, setFocusItems] = useState(initialFocusItems)

  const toggleComplete = (id: number) => {
    setFocusItems(focusItems.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-950/50 dark:to-green-950/50">
        <CardTitle>Today's Focus</CardTitle>
        <CardDescription>Your mindful activities for today</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {focusItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                item.completed
                  ? "bg-teal-50 border-teal-200 dark:bg-teal-950/20 dark:border-teal-900"
                  : "bg-white dark:bg-background"
              }`}
            >
              <div className="flex-1">
                <h3 className={`font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <div className="mt-1">
                  <span className="inline-flex items-center rounded-full bg-teal-100 dark:bg-teal-900/50 px-2.5 py-0.5 text-xs font-medium text-teal-800 dark:text-teal-300">
                    {item.category}
                  </span>
                </div>
              </div>
              <Button
                variant={item.completed ? "outline" : "default"}
                size="sm"
                className={item.completed ? "border-teal-200" : "bg-teal-600 hover:bg-teal-700"}
                onClick={() => toggleComplete(item.id)}
              >
                {item.completed ? (
                  <>
                    <X className="mr-1 h-4 w-4" /> Undo
                  </>
                ) : (
                  <>
                    <Check className="mr-1 h-4 w-4" /> Complete
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
