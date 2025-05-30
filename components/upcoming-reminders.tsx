"use client"

import { useState } from "react"
import { Bell, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Sample data - in a real app, this would come from a database
const initialReminders = [
  {
    id: 1,
    title: "Afternoon Meditation",
    time: "2:00 PM",
    enabled: true,
  },
  {
    id: 2,
    title: "Evening Reflection",
    time: "8:30 PM",
    enabled: true,
  },
  {
    id: 3,
    title: "Hydration Check",
    time: "Every 2 hours",
    enabled: false,
  },
]

export default function UpcomingReminders() {
  const [reminders, setReminders] = useState(initialReminders)

  const toggleReminder = (id: number) => {
    setReminders(
      reminders.map((reminder) => (reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder)),
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upcoming Reminders</CardTitle>
            <CardDescription>Notifications for your wellness activities</CardDescription>
          </div>
          <Bell className="h-5 w-5 text-teal-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-teal-100 dark:bg-teal-900/30 p-2">
                  <Clock className="h-4 w-4 text-teal-700 dark:text-teal-400" />
                </div>
                <div>
                  <p className="font-medium">{reminder.title}</p>
                  <p className="text-sm text-muted-foreground">{reminder.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id={`reminder-${reminder.id}`}
                  checked={reminder.enabled}
                  onCheckedChange={() => toggleReminder(reminder.id)}
                />
                <Label htmlFor={`reminder-${reminder.id}`} className="sr-only">
                  {reminder.enabled ? "Disable" : "Enable"} {reminder.title}
                </Label>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
