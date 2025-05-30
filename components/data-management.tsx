"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Download, Upload, Trash2, AlertTriangle } from "lucide-react"

export default function DataManagement() {
  const [isExporting, setIsExporting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const exportData = async () => {
    setIsExporting(true)

    // Collect all data from localStorage
    const data = {
      habits: JSON.parse(localStorage.getItem("habits") || "[]"),
      journalEntries: JSON.parse(localStorage.getItem("journalEntries") || "[]"),
      breathworkSessions: JSON.parse(localStorage.getItem("breathworkSessions") || "[]"),
      completedChallenges: JSON.parse(localStorage.getItem("completedChallenges") || "[]"),
      userSettings: JSON.parse(localStorage.getItem("userSettings") || "{}"),
      customAffirmations: JSON.parse(localStorage.getItem("customAffirmations") || "[]"),
      dailyIntention: localStorage.getItem("dailyIntention") || "",
      exportDate: new Date().toISOString(),
    }

    // Create and download file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `mindful-focus-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setIsExporting(false)
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)

        // Restore data to localStorage
        if (data.habits) localStorage.setItem("habits", JSON.stringify(data.habits))
        if (data.journalEntries) localStorage.setItem("journalEntries", JSON.stringify(data.journalEntries))
        if (data.breathworkSessions) localStorage.setItem("breathworkSessions", JSON.stringify(data.breathworkSessions))
        if (data.completedChallenges)
          localStorage.setItem("completedChallenges", JSON.stringify(data.completedChallenges))
        if (data.userSettings) localStorage.setItem("userSettings", JSON.stringify(data.userSettings))
        if (data.customAffirmations) localStorage.setItem("customAffirmations", JSON.stringify(data.customAffirmations))
        if (data.dailyIntention) localStorage.setItem("dailyIntention", data.dailyIntention)

        alert("Data imported successfully! Please refresh the page to see your restored data.")
      } catch (error) {
        alert("Error importing data. Please check the file format.")
      }
    }
    reader.readAsText(file)
  }

  const clearAllData = () => {
    if (showDeleteConfirm) {
      // Clear all app data
      const keysToRemove = [
        "habits",
        "journalEntries",
        "breathworkSessions",
        "completedChallenges",
        "userSettings",
        "customAffirmations",
        "dailyIntention",
        "intentionDate",
        "dailyAffirmation",
        "affirmationDate",
        "challengeDate",
        "todaysChallenge",
        "challengeCompleted",
        "challengeReflection",
        "lastJournalDate",
      ]

      keysToRemove.forEach((key) => localStorage.removeItem(key))

      setShowDeleteConfirm(false)
      alert("All data has been cleared. Please refresh the page.")
    } else {
      setShowDeleteConfirm(true)
    }
  }

  const getDataStats = () => {
    const habits = JSON.parse(localStorage.getItem("habits") || "[]")
    const journalEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]")
    const breathworkSessions = JSON.parse(localStorage.getItem("breathworkSessions") || "[]")
    const completedChallenges = JSON.parse(localStorage.getItem("completedChallenges") || "[]")

    return {
      habits: habits.length,
      journalEntries: journalEntries.length,
      breathworkSessions: breathworkSessions.length,
      completedChallenges: completedChallenges.length,
    }
  }

  const stats = getDataStats()

  return (
    <Card className="mindful-card animate-slide-up">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center text-taupe-800">
          <Database className="w-5 h-5 mr-2 text-sage-500" />
          Data Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Data Overview */}
        <div className="space-y-3">
          <h3 className="font-semibold text-taupe-800">Your Data</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-sage-50 rounded-lg border border-sage-200/50">
              <p className="text-lg font-bold text-taupe-800">{stats.habits}</p>
              <p className="text-xs text-taupe-600">Habits</p>
            </div>
            <div className="text-center p-3 bg-rose-50 rounded-lg border border-rose-200/50">
              <p className="text-lg font-bold text-taupe-800">{stats.journalEntries}</p>
              <p className="text-xs text-taupe-600">Journal Entries</p>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200/50">
              <p className="text-lg font-bold text-taupe-800">{stats.breathworkSessions}</p>
              <p className="text-xs text-taupe-600">Breathwork Sessions</p>
            </div>
            <div className="text-center p-3 bg-stone-50 rounded-lg border border-stone-200/50">
              <p className="text-lg font-bold text-taupe-800">{stats.completedChallenges}</p>
              <p className="text-xs text-taupe-600">Challenges</p>
            </div>
          </div>
        </div>

        {/* Export Data */}
        <div className="space-y-3">
          <h3 className="font-semibold text-taupe-800">Backup & Restore</h3>
          <Button onClick={exportData} disabled={isExporting} className="mindful-button w-full">
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? "Exporting..." : "Export Data"}
          </Button>

          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline" className="w-full border-sage-300 text-taupe-700 hover:bg-sage-50">
              <Upload className="w-4 h-4 mr-2" />
              Import Data
            </Button>
          </div>
        </div>

        {/* Clear Data */}
        <div className="space-y-3 pt-4 border-t border-sage-200/50">
          <h3 className="font-semibold text-taupe-800 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
            Danger Zone
          </h3>
          <p className="text-xs text-taupe-600">This action cannot be undone. Please export your data first.</p>

          {!showDeleteConfirm ? (
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-red-600 font-medium">Are you sure? This will delete everything!</p>
              <div className="flex gap-2">
                <Button
                  onClick={clearAllData}
                  variant="outline"
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                >
                  Yes, Delete All
                </Button>
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  className="flex-1 border-taupe-300 text-taupe-600"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
