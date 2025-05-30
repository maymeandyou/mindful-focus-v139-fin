"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Settings, Bell, Download, Trash2 } from "lucide-react"

export default function ProfileSettings() {
  return (
    <Card className="bg-white/80 border-gray-200 shadow-lg rounded-2xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center text-gray-800">
          <Settings className="h-5 w-5 mr-2" />
          Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notifications */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Daily Reminders</p>
                <p className="text-xs text-gray-500">Get reminded to practice mindfulness</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Habit Notifications</p>
                <p className="text-xs text-gray-500">Reminders for your daily habits</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Weekly Progress</p>
                <p className="text-xs text-gray-500">Weekly summary of your journey</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Data Management</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start rounded-xl border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export My Data
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start rounded-xl border-red-200 text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Data
            </Button>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">Mindful Focus v1.0.0</p>
          <p className="text-xs text-gray-500 mt-1">Made with ❤️ for your wellbeing</p>
        </div>
      </CardContent>
    </Card>
  )
}
