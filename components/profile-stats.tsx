"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Award, Calendar, TrendingUp } from "lucide-react"

export default function ProfileStats() {
  // Mock data - in real app, this would come from your backend
  const profile = {
    name: "Mindful User",
    joinDate: "2024-01-01",
    totalDays: 30,
    activeDays: 23,
    achievements: [
      { name: "First Week", description: "Completed 7 days in a row", earned: true },
      { name: "Journal Master", description: "Wrote 10 journal entries", earned: true },
      { name: "Breath Expert", description: "Completed 20 breathing sessions", earned: false },
      { name: "Habit Builder", description: "Maintained a habit for 30 days", earned: false },
    ],
  }

  const memberSince = new Date(profile.joinDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg rounded-2xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center text-purple-800 font-display text-lg font-semibold">
          <User className="h-5 w-5 mr-2" />
          {profile.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Member Info */}
        <div className="text-center p-4 bg-white/60 rounded-xl">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="h-4 w-4 text-purple-600 mr-2" />
            <span className="text-purple-700 font-medium">Member since {memberSince}</span>
          </div>
          <div className="flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-green-700 font-medium">{profile.activeDays} active days</span>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h3 className="font-semibold text-purple-800 flex items-center">
            <Award className="h-4 w-4 mr-2" />
            Achievements
          </h3>
          <div className="space-y-2">
            {profile.achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl border-2 ${
                  achievement.earned
                    ? "bg-yellow-50 border-yellow-300 text-yellow-800"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{achievement.name}</h4>
                    <p className="text-xs">{achievement.description}</p>
                  </div>
                  {achievement.earned && <Award className="h-5 w-5 text-yellow-600" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
