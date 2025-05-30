"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Play } from "lucide-react"
import Link from "next/link"
import WelcomeHeader from "@/components/welcome-header"
import TodaysRitual from "@/components/todays-ritual"
import QuickActions from "@/components/quick-actions"
import DailyQuotes from "@/components/daily-quotes"
import ProgressOverview from "@/components/progress-overview"

export default function HomePage() {
  const [upcomingPractices, setUpcomingPractices] = useState<any[]>([])

  useEffect(() => {
    loadUpcomingPractices()
  }, [])

  const loadUpcomingPractices = () => {
    const myPractices = JSON.parse(localStorage.getItem("myPractices") || '{"morning":[],"day":[],"evening":[]}')
    const today = new Date().toDateString()
    const completedPractices = JSON.parse(localStorage.getItem("completedPractices") || "{}")
    const todayCompleted = completedPractices[today] || []

    // Get all practices and filter out completed ones
    const allPractices = [
      ...myPractices.morning.map((p: any) => ({ ...p, timeOfDay: "morning" })),
      ...myPractices.day.map((p: any) => ({ ...p, timeOfDay: "day" })),
      ...myPractices.evening.map((p: any) => ({ ...p, timeOfDay: "evening" })),
    ]

    const upcoming = allPractices.filter((practice: any) => !todayCompleted.includes(practice.id))
    setUpcomingPractices(upcoming)
  }

  const startPractice = (practice: any) => {
    window.scrollTo(0, 0)
    window.location.href = practice.path
  }

  const getTimeOfDayLabel = (timeOfDay: string) => {
    switch (timeOfDay) {
      case "morning":
        return "Morning"
      case "day":
        return "Daytime"
      case "evening":
        return "Evening"
      default:
        return ""
    }
  }

  return (
    <div className="page-transition">
      <WelcomeHeader />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <TodaysRitual />

            {/* Upcoming Practices */}
            {upcomingPractices.length > 0 && (
              <Card className="mindful-card">
                <CardHeader>
                  <CardTitle className="tertiary-title flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-sage-600" />
                    Upcoming Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingPractices.slice(0, 3).map((practice) => (
                      <div key={practice.id} className="p-3 bg-sage-50 rounded-lg border border-sage-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs px-2 py-1 bg-sage-200 text-sage-800 rounded">
                                {getTimeOfDayLabel(practice.timeOfDay)}
                              </span>
                              <h4 className="font-medium text-[#4a4a4a] text-sm">{practice.name}</h4>
                            </div>
                            <p className="text-xs text-[#4a4a4a]">
                              {practice.duration} - {practice.description}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => startPractice(practice)}
                            className="mindful-button h-7 text-xs px-2 ml-3"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Start
                          </Button>
                        </div>
                      </div>
                    ))}

                    {upcomingPractices.length > 3 && (
                      <Link href="/my-routine">
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          View All Practices ({upcomingPractices.length})
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <QuickActions />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <DailyQuotes />
            <ProgressOverview />
          </div>
        </div>
      </div>
    </div>
  )
}
