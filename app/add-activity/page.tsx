"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddActivity() {
  const router = useRouter()
  const [enableReminder, setEnableReminder] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would save the data to a database here
    router.push("/")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to dashboard
      </Link>

      <Card>
        <CardHeader className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-950/50 dark:to-green-950/50">
          <CardTitle>Add New Activity</CardTitle>
          <CardDescription>Create a new mindful practice or habit</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Activity Title</Label>
              <Input id="title" placeholder="e.g., Morning Meditation" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your activity and its benefits..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breath">Breath Work</SelectItem>
                  <SelectItem value="meditation">Meditation</SelectItem>
                  <SelectItem value="gratitude">Gratitude</SelectItem>
                  <SelectItem value="mindfulness">Mindfulness</SelectItem>
                  <SelectItem value="mood">Mood</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Activity Type</Label>
              <RadioGroup defaultValue="daily">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">Daily Practice</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="occasional" id="occasional" />
                    <Label htmlFor="occasional">Occasional Activity</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="habit" id="habit" />
                    <Label htmlFor="habit">Habit Building</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="reminder" className="text-base font-medium">
                    Set Reminder
                  </Label>
                </div>
                <Switch id="reminder" checked={enableReminder} onCheckedChange={setEnableReminder} />
              </div>

              {enableReminder && (
                <div className="space-y-4 pl-6 border-l-2 border-teal-200 dark:border-teal-800">
                  <div className="space-y-2">
                    <Label htmlFor="time">Reminder Time</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input type="time" id="time" className="max-w-[180px]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" type="button" onClick={() => router.push("/")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                Save Activity
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
