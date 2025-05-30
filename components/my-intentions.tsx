"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Target, Star, Plus, Trash2 } from "lucide-react"

export default function MyIntentions() {
  const [todaysIntention, setTodaysIntention] = useState("")
  const [pinnedIntentions, setPinnedIntentions] = useState<string[]>([])
  const [customIntention, setCustomIntention] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  useEffect(() => {
    // Load today's intention
    const today = new Date().toDateString()
    const savedIntentionDate = localStorage.getItem("intentionDate")
    const savedIntention = localStorage.getItem("todaysIntention")

    if (savedIntentionDate === today && savedIntention) {
      setTodaysIntention(savedIntention)
    }

    // Load pinned intentions
    const pinned = JSON.parse(localStorage.getItem("pinnedIntentions") || "[]")
    setPinnedIntentions(pinned)
  }, [])

  const setNewIntention = () => {
    if (customIntention.trim()) {
      const today = new Date().toDateString()
      setTodaysIntention(customIntention.trim())
      localStorage.setItem("todaysIntention", customIntention.trim())
      localStorage.setItem("intentionDate", today)
      setCustomIntention("")
      setShowAddForm(false)
    }
  }

  const removePinned = (index: number) => {
    const newPinned = pinnedIntentions.filter((_, i) => i !== index)
    setPinnedIntentions(newPinned)
    localStorage.setItem("pinnedIntentions", JSON.stringify(newPinned))
  }

  const setAsTodaysIntention = (intention: string) => {
    const today = new Date().toDateString()
    setTodaysIntention(intention)
    localStorage.setItem("todaysIntention", intention)
    localStorage.setItem("intentionDate", today)
  }

  return (
    <Card className="mindful-card">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center text-taupe-800 font-display">
          <Target className="w-5 h-5 mr-2 text-sage-500" />
          My Intentions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Today's Intention */}
        <div className="p-4 bg-gradient-to-r from-sage-100 to-rose-100 rounded-xl border border-sage-200/50">
          <h3 className="font-semibold text-taupe-800 mb-2 flex items-center">
            <Star className="w-4 h-4 mr-2 text-amber-500" />
            Today's Intention
          </h3>
          {todaysIntention ? (
            <div className="space-y-2">
              <p className="text-sm text-taupe-700 italic">"{todaysIntention}"</p>
              <Button
                onClick={() => setTodaysIntention("")}
                variant="outline"
                size="sm"
                className="bg-white/50 hover:bg-white/70 border-taupe-200 text-taupe-600"
              >
                Clear
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-taupe-600">No intention set for today</p>
              <Button
                onClick={() => setShowAddForm(true)}
                variant="outline"
                size="sm"
                className="bg-white/50 hover:bg-white/70 border-taupe-200 text-taupe-600"
              >
                <Plus className="w-3 h-3 mr-1" />
                Set Intention
              </Button>
            </div>
          )}
        </div>

        {/* Add Custom Intention */}
        {showAddForm && (
          <div className="p-4 bg-gradient-to-r from-stone-50 to-sage-50 rounded-xl border border-stone-200/50">
            <label className="text-sm font-medium text-taupe-700 mb-2 block">Create Your Intention</label>
            <Input
              placeholder="I intend to..."
              value={customIntention}
              onChange={(e) => setCustomIntention(e.target.value)}
              className="mindful-input mb-3"
              onKeyPress={(e) => e.key === "Enter" && setNewIntention()}
            />
            <div className="flex gap-2">
              <Button onClick={setNewIntention} disabled={!customIntention.trim()} className="mindful-button flex-1">
                Set Intention
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="border-taupe-300 text-taupe-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Pinned Intentions */}
        {pinnedIntentions.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-taupe-800 text-sm">Pinned Intentions</h4>
            <div className="space-y-2">
              {pinnedIntentions.map((intention, index) => (
                <div key={index} className="p-3 bg-white/60 rounded-lg border border-sage-200/50 group">
                  <div className="flex items-start justify-between">
                    <p className="text-xs text-taupe-700 italic flex-1 pr-2">"{intention}"</p>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setAsTodaysIntention(intention)}
                        className="h-6 w-6 p-0 hover:bg-sage-100"
                        title="Set as today's intention"
                      >
                        <Target className="w-3 h-3 text-sage-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removePinned(index)}
                        className="h-6 w-6 p-0 hover:bg-red-100"
                        title="Remove from pinned"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="font-medium text-taupe-800 text-sm">Quick Actions</h4>
          <div className="grid grid-cols-1 gap-2">
            <Button
              onClick={() => setShowAddForm(true)}
              variant="outline"
              className="justify-start border-sage-300 text-taupe-700 hover:bg-sage-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Intention
            </Button>
            <Button variant="outline" className="justify-start border-rose-300 text-taupe-700 hover:bg-rose-50">
              <Star className="w-4 h-4 mr-2" />
              Browse Library
            </Button>
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-taupe-500">Intentions guide your mindful practice</p>
        </div>
      </CardContent>
    </Card>
  )
}
