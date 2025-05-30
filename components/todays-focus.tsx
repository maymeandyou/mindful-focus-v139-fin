"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Target, Bell } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function TodaysFocus() {
  const [intention, setIntention] = useState("")
  const [reminderEnabled, setReminderEnabled] = useState(false)
  const [reminderTime, setReminderTime] = useState("09:00")

  const dailyAffirmation = "I am capable of creating positive change in my life, one mindful moment at a time."

  return (
    <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200 shadow-lg rounded-2xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center text-pink-800">
          <Heart className="h-5 w-5 mr-2" />
          Today's Focus
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Daily Affirmation */}
        <div className="text-center p-4 bg-white/60 rounded-xl">
          <p className="text-pink-700 font-medium italic">"{dailyAffirmation}"</p>
        </div>

        {/* Intention Setting */}
        <div className="space-y-3">
          <div className="flex items-center">
            <Target className="h-4 w-4 text-purple-600 mr-2" />
            <label className="text-sm font-medium text-purple-800">Today's Intention</label>
          </div>
          <Textarea
            placeholder="What would you like to focus on today?"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            className="bg-white/80 border-purple-200 focus:border-purple-400 rounded-xl"
            rows={3}
          />
        </div>

        {/* Reminder Setting */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-4 w-4 text-green-600 mr-2" />
              <label className="text-sm font-medium text-green-800">Mindful Reminder</label>
            </div>
            <Switch checked={reminderEnabled} onCheckedChange={setReminderEnabled} />
          </div>
          {reminderEnabled && (
            <Input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="bg-white/80 border-green-200 focus:border-green-400 rounded-xl"
            />
          )}
        </div>

        <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl py-3 shadow-md">
          Set Today's Focus
        </Button>
      </CardContent>
    </Card>
  )
}
