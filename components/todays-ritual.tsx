"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Edit3 } from "lucide-react"

export default function TodaysRitual() {
  const [intention, setIntention] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [savedIntention, setSavedIntention] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("dailyIntention")
    const savedDate = localStorage.getItem("intentionDate")
    const today = new Date().toDateString()

    if (saved && savedDate === today) {
      setSavedIntention(saved)
      setIntention(saved)
    } else {
      // New day, clear previous intention
      localStorage.removeItem("dailyIntention")
      localStorage.removeItem("intentionDate")
      setSavedIntention("")
      setIntention("")
    }
  }, [])

  const handleSave = () => {
    if (intention.trim()) {
      localStorage.setItem("dailyIntention", intention)
      localStorage.setItem("intentionDate", new Date().toDateString())
      setSavedIntention(intention)
      setIsEditing(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  return (
    <Card className="mindful-card animate-scale-in">
      <CardHeader className="text-center pb-4">
        <CardTitle className="tertiary-title flex items-center justify-center">
          <Heart className="w-5 h-5 mr-2" style={{ color: "#F2D6D3" }} />
          Today's Intention
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!savedIntention || isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="form-text font-medium mb-2 block">What would you like to focus on today?</label>
              <Input
                placeholder="I intend to be present and kind to myself..."
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                className="mindful-input"
                onKeyPress={(e) => e.key === "Enter" && handleSave()}
              />
            </div>
            <Button
              onClick={handleSave}
              disabled={!intention.trim()}
              className="w-full py-1"
              style={{
                backgroundColor: "#F2D6D3",
                height: "36px",
                color: "#000000",
                border: "none",
              }}
            >
              Set Intention
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: "#F2D6D3", border: "1px solid #ecc9c5" }}>
              <p className="body-text text-center">"{savedIntention}"</p>
            </div>
            <Button
              onClick={handleEdit}
              variant="outline"
              className="w-full form-text"
              style={{ borderColor: "#DDE5D4", color: "#4a4a4a" }}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Intention
            </Button>
          </div>
        )}

        <div className="text-center pt-2">
          <p className="form-text">Your intention guides your mindful journey today</p>
        </div>
      </CardContent>
    </Card>
  )
}
