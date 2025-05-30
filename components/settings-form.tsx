"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Settings, Bell, User, Save } from "lucide-react"

interface SettingsData {
  name: string
  email: string
  notifications: {
    dailyReminders: boolean
    habitReminders: boolean
    weeklyProgress: boolean
    motivationalQuotes: boolean
  }
  preferences: {
    reminderTime: string
    weeklyGoal: number
    theme: string
  }
}

export default function SettingsForm() {
  const [settings, setSettings] = useState<SettingsData>({
    name: "",
    email: "",
    notifications: {
      dailyReminders: true,
      habitReminders: true,
      weeklyProgress: false,
      motivationalQuotes: true,
    },
    preferences: {
      reminderTime: "09:00",
      weeklyGoal: 7,
      theme: "calm",
    },
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("userSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSave = async () => {
    setIsSaving(true)

    // Save to localStorage
    localStorage.setItem("userSettings", JSON.stringify(settings))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSaving(false)
  }

  const updateNotification = (key: keyof typeof settings.notifications, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  const updatePreference = (key: keyof typeof settings.preferences, value: string | number) => {
    setSettings((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }))
  }

  return (
    <Card className="mindful-card animate-slide-up">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center text-taupe-800 font-display text-lg font-semibold">
          <Settings className="w-5 h-5 mr-2 text-sage-500" />
          Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Section */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-taupe-800 flex items-center">
            <User className="h-4 w-4 mr-2" />
            Profile
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-taupe-700 mb-1 block">Name</label>
              <Input
                placeholder="Your name"
                value={settings.name}
                onChange={(e) => setSettings((prev) => ({ ...prev, name: e.target.value }))}
                className="mindful-input"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-taupe-700 mb-1 block">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={settings.email}
                onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
                className="mindful-input"
              />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-taupe-800 flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-taupe-700">Daily Reminders</p>
                <p className="text-xs text-taupe-500">Get reminded to practice mindfulness</p>
              </div>
              <Switch
                checked={settings.notifications.dailyReminders}
                onCheckedChange={(checked) => updateNotification("dailyReminders", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-taupe-700">Habit Notifications</p>
                <p className="text-xs text-taupe-500">Reminders for your daily habits</p>
              </div>
              <Switch
                checked={settings.notifications.habitReminders}
                onCheckedChange={(checked) => updateNotification("habitReminders", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-taupe-700">Weekly Progress</p>
                <p className="text-xs text-taupe-500">Weekly summary of your journey</p>
              </div>
              <Switch
                checked={settings.notifications.weeklyProgress}
                onCheckedChange={(checked) => updateNotification("weeklyProgress", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-taupe-700">Motivational Quotes</p>
                <p className="text-xs text-taupe-500">Daily affirmations and inspiration</p>
              </div>
              <Switch
                checked={settings.notifications.motivationalQuotes}
                onCheckedChange={(checked) => updateNotification("motivationalQuotes", checked)}
              />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-taupe-800">Preferences</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-taupe-700 mb-1 block">Daily Reminder Time</label>
              <Input
                type="time"
                value={settings.preferences.reminderTime}
                onChange={(e) => updatePreference("reminderTime", e.target.value)}
                className="mindful-input"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-taupe-700 mb-1 block">Weekly Goal (sessions)</label>
              <Input
                type="number"
                min="1"
                max="14"
                value={settings.preferences.weeklyGoal}
                onChange={(e) => updatePreference("weeklyGoal", Number.parseInt(e.target.value) || 7)}
                className="mindful-input"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} disabled={isSaving} className="mindful-button w-full">
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </CardContent>
    </Card>
  )
}
