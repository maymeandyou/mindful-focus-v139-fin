"use client"

import { useState, useEffect } from "react"
import PageHeader from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Sun, Moon, Edit, Heart, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

// Inspirational quotes based on routine types
const routineQuotes = {
  meditation: [
    "Peace comes from within. Do not seek it without.",
    "The present moment is the only time over which we have dominion.",
    "Meditation is not about stopping thoughts, but recognizing that we are more than our thoughts.",
    "In the midst of movement and chaos, keep stillness inside of you.",
    "The quieter you become, the more you are able to hear.",
  ],
  breathwork: [
    "Breath is the bridge which connects life to consciousness.",
    "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
    "The breath is the intersection of the body and mind.",
    "Breathe in peace, breathe out stress.",
    "Your breath is your greatest teacher.",
  ],
  gratitude: [
    "Gratitude turns what we have into enough.",
    "The heart that gives thanks is a happy one.",
    "Gratitude is not only the greatest of virtues but the parent of all others.",
    "In ordinary life, we hardly realize that we receive a great deal more than we give.",
    "Appreciation is a wonderful thing: It makes what is excellent in others belong to us as well.",
  ],
  mindfulness: [
    "Wherever you are, be there totally.",
    "The best way to take care of the future is to take care of the present moment.",
    "Mindfulness is about being fully awake in our lives.",
    "Life is available only in the present moment.",
    "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
  ],
  general: [
    "Today is a new beginning. Embrace it with intention.",
    "Every moment is a fresh beginning.",
    "The journey of a thousand miles begins with one step.",
    "Be yourself; everyone else is already taken.",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
  ],
}

export default function MyRoutinePage() {
  const [myPractices, setMyPractices] = useState({
    morning: [],
    day: [],
    evening: [],
  })
  const [dailyIntention, setDailyIntention] = useState("")
  const [dailyQuote, setDailyQuote] = useState("")
  const [customQuote, setCustomQuote] = useState("")
  const [isAddingQuote, setIsAddingQuote] = useState(false)
  const [customIntention, setCustomIntention] = useState("")
  const [isEditingIntention, setIsEditingIntention] = useState(false)

  // Load from localStorage to match daily-routine state
  useEffect(() => {
    const savedPractices = localStorage.getItem("myPractices")
    if (savedPractices) {
      setMyPractices(JSON.parse(savedPractices))
    } else {
      // For demo purposes, using some sample data if no saved data
      setMyPractices({
        morning: [
          {
            id: "breath-awareness",
            name: "Breath Awareness",
            duration: "10 min",
            description: "Focus on natural breath rhythm",
            path: "/timer?practice=breath-awareness&duration=10&title=Breath%20Awareness&description=Focus%20on%20natural%20breath%20rhythm",
          },
          {
            id: "gratitude-letter",
            name: "Gratitude Letter",
            duration: "15 min",
            description: "Write heartfelt appreciation",
            path: "/journal",
          },
        ],
        day: [
          {
            id: "mindful-eating",
            name: "Mindful Eating",
            duration: "15 min",
            description: "Conscious consumption",
            path: "/timer?practice=mindful-eating&duration=15&title=Mindful%20Eating&description=Conscious%20consumption",
          },
        ],
        evening: [
          {
            id: "body-scan",
            name: "Body Scan Meditation",
            duration: "15 min",
            description: "Systematic body relaxation",
            path: "/timer?practice=body-scan&duration=15&title=Body%20Scan%20Meditation&description=Systematic%20body%20relaxation",
          },
          {
            id: "mood-tracking",
            name: "Daily Mood Check-in",
            duration: "3 min",
            description: "Monitor emotional patterns",
            path: "/journal",
          },
        ],
      })
    }

    // Load today's intention
    const today = new Date().toDateString()
    const savedIntentionDate = localStorage.getItem("intentionDate")
    const savedIntention = localStorage.getItem("todaysIntention")

    if (savedIntentionDate === today && savedIntention) {
      setDailyIntention(savedIntention)
    }

    // Load or generate daily quote
    const savedQuoteDate = localStorage.getItem("quoteDate")
    const savedQuote = localStorage.getItem("dailyQuote")
    const isCustomQuote = localStorage.getItem("isCustomQuote") === "true"

    if (savedQuoteDate === today && savedQuote) {
      setDailyQuote(savedQuote)
    } else if (!isCustomQuote) {
      // Generate quote only if we don't have one for today and it's not a custom quote
      generateDailyQuoteInitial()
    }
  }, []) // Removed myPractices dependency to prevent infinite loop

  const generateDailyQuoteInitial = () => {
    // Use current practices from localStorage for initial quote generation
    const savedPractices = localStorage.getItem("myPractices")
    let practices = { morning: [], day: [], evening: [] }

    if (savedPractices) {
      practices = JSON.parse(savedPractices)
    }

    const allPractices = [...(practices.morning || []), ...(practices.day || []), ...(practices.evening || [])]
    let quoteCategory = "general"

    // Count practice types
    const practiceTypes = {
      meditation: 0,
      breathwork: 0,
      gratitude: 0,
      mindfulness: 0,
    }

    allPractices.forEach((practice: any) => {
      const name = practice.name.toLowerCase()
      if (name.includes("meditation") || name.includes("body scan") || name.includes("loving")) {
        practiceTypes.meditation++
      } else if (name.includes("breath")) {
        practiceTypes.breathwork++
      } else if (name.includes("gratitude")) {
        practiceTypes.gratitude++
      } else if (name.includes("mindful")) {
        practiceTypes.mindfulness++
      }
    })

    // Find the most common practice type
    const maxType = Object.keys(practiceTypes).reduce((a, b) =>
      practiceTypes[a as keyof typeof practiceTypes] > practiceTypes[b as keyof typeof practiceTypes] ? a : b,
    )

    if (practiceTypes[maxType as keyof typeof practiceTypes] > 0) {
      quoteCategory = maxType
    }

    const quotes = routineQuotes[quoteCategory as keyof typeof routineQuotes]
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

    setDailyQuote(randomQuote)
    const today = new Date().toDateString()
    localStorage.setItem("dailyQuote", randomQuote)
    localStorage.setItem("quoteDate", today)
    localStorage.setItem("isCustomQuote", "false")
  }

  const generateDailyQuote = () => {
    // Determine quote category based on user's practices
    const allPractices = [...(myPractices.morning || []), ...(myPractices.day || []), ...(myPractices.evening || [])]
    let quoteCategory = "general"

    // Count practice types
    const practiceTypes = {
      meditation: 0,
      breathwork: 0,
      gratitude: 0,
      mindfulness: 0,
    }

    allPractices.forEach((practice: any) => {
      const name = practice.name.toLowerCase()
      if (name.includes("meditation") || name.includes("body scan") || name.includes("loving")) {
        practiceTypes.meditation++
      } else if (name.includes("breath")) {
        practiceTypes.breathwork++
      } else if (name.includes("gratitude")) {
        practiceTypes.gratitude++
      } else if (name.includes("mindful")) {
        practiceTypes.mindfulness++
      }
    })

    // Find the most common practice type
    const maxType = Object.keys(practiceTypes).reduce((a, b) =>
      practiceTypes[a as keyof typeof practiceTypes] > practiceTypes[b as keyof typeof practiceTypes] ? a : b,
    )

    if (practiceTypes[maxType as keyof typeof practiceTypes] > 0) {
      quoteCategory = maxType
    }

    const quotes = routineQuotes[quoteCategory as keyof typeof routineQuotes]
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

    setDailyQuote(randomQuote)
    const today = new Date().toDateString()
    localStorage.setItem("dailyQuote", randomQuote)
    localStorage.setItem("quoteDate", today)
    localStorage.setItem("isCustomQuote", "false")
  }

  const setCustomQuoteHandler = () => {
    if (customQuote.trim()) {
      setDailyQuote(customQuote.trim())
      const today = new Date().toDateString()
      localStorage.setItem("dailyQuote", customQuote.trim())
      localStorage.setItem("quoteDate", today)
      localStorage.setItem("isCustomQuote", "true")
      setCustomQuote("")
      setIsAddingQuote(false)
    }
  }

  const setCustomIntentionHandler = () => {
    if (customIntention.trim()) {
      const today = new Date().toDateString()
      setDailyIntention(customIntention.trim())
      localStorage.setItem("todaysIntention", customIntention.trim())
      localStorage.setItem("intentionDate", today)
      setCustomIntention("")
      setIsEditingIntention(false)
    }
  }

  const getRandomIntention = () => {
    const intentions = [
      "I am present in each moment",
      "I choose peace over perfection",
      "I trust in my ability to handle whatever comes",
      "I cultivate gratitude throughout my day",
      "I embrace growth through challenges",
      "I respond with kindness to myself and others",
      "I focus on what I can control",
      "I create space for joy and wonder",
      "I approach today with curiosity and openness",
      "I breathe through difficult moments",
    ]
    const randomIndex = Math.floor(Math.random() * intentions.length)
    const randomIntention = intentions[randomIndex]

    const today = new Date().toDateString()
    setDailyIntention(randomIntention)
    localStorage.setItem("todaysIntention", randomIntention)
    localStorage.setItem("intentionDate", today)
  }

  const getTotalDuration = () => {
    const allPractices = [...(myPractices.morning || []), ...(myPractices.day || []), ...(myPractices.evening || [])]
    return allPractices.reduce((total, practice: any) => {
      const duration = Number.parseInt(practice.duration)
      return total + (isNaN(duration) ? 0 : duration)
    }, 0)
  }

  const getTimeIcon = (timeOfDay: string) => {
    switch (timeOfDay) {
      case "morning":
        return Sun
      case "day":
        return Clock
      case "evening":
        return Moon
      default:
        return Clock
    }
  }

  const getTimeColor = (timeOfDay: string) => {
    switch (timeOfDay) {
      case "morning":
        return "bg-amber-25 border-amber-100"
      case "day":
        return "bg-sage-25 border-sage-100"
      case "evening":
        return "bg-rose-25 border-rose-100"
      default:
        return "bg-sage-25 border-sage-100"
    }
  }

  const startFirstPractice = () => {
    // Find the first practice from morning, day, or evening
    const allPractices = [...(myPractices.morning || []), ...(myPractices.day || []), ...(myPractices.evening || [])]

    if (allPractices.length > 0) {
      const firstPractice = allPractices[0] as any
      window.scrollTo(0, 0)
      window.location.href = firstPractice.path
    }
  }

  return (
    <div className="page-transition">
      <PageHeader title="My Daily Mindful Routine" subtitle="Your personalized collection of mindfulness practices" />

      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Daily Intention - Simplified Display */}
        {dailyIntention && (
          <Card className="mindful-card mb-6 bg-rose-50 border border-rose-100">
            <CardContent className="p-4 text-center relative">
              <div className="flex items-center justify-center mb-3">
                <Heart className="w-5 h-5 mr-2 text-rose-500" />
                <p className="quote-text text-[#4a4a4a]">"{dailyIntention}"</p>
              </div>
              <div className="absolute top-2 right-2 flex space-x-1">
                <Dialog open={isEditingIntention} onOpenChange={setIsEditingIntention}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-rose-400 hover:text-rose-600 hover:bg-transparent"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="pt-6">
                      <DialogTitle className="text-base">Edit Your Daily Intention</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium">Your Intention</label>
                        <Input
                          value={customIntention}
                          onChange={(e) => setCustomIntention(e.target.value)}
                          placeholder="I intend to..."
                          className="text-sm"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={setCustomIntentionHandler} className="mindful-button text-xs px-3 h-7">
                          Save Intention
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditingIntention(false)}
                          className="text-xs px-3 h-7"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  onClick={getRandomIntention}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-rose-400 hover:text-rose-600 hover:bg-transparent"
                >
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Daily Inspiration Quote - Simplified */}
        {dailyQuote && (
          <Card className="mindful-card mb-6">
            <CardContent className="p-4 relative">
              <div className="text-center">
                <p className="quote-text text-[#4a4a4a]">"{dailyQuote}"</p>
              </div>
              <div className="absolute top-2 right-2 flex space-x-1">
                <Dialog open={isAddingQuote} onOpenChange={setIsAddingQuote}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-sage-400 hover:text-sage-600 hover:bg-transparent"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="pt-6">
                      <DialogTitle className="text-base">Add Your Own Inspiration</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium">Your Quote or Affirmation</label>
                        <Textarea
                          value={customQuote}
                          onChange={(e) => setCustomQuote(e.target.value)}
                          placeholder="Enter your personal quote or affirmation..."
                          className="text-sm"
                          rows={4}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={setCustomQuoteHandler} className="mindful-button text-xs px-3 h-7">
                          Save Quote
                        </Button>
                        <Button variant="outline" onClick={() => setIsAddingQuote(false)} className="text-xs px-3 h-7">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  onClick={generateDailyQuote}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-sage-400 hover:text-sage-600 hover:bg-transparent"
                >
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Compact Overview Card */}
        <Card className="mindful-card mb-6 bg-white border border-sage-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="pl-3">
                <h2 className="tertiary-title mb-1 text-sm">Your Mindful Day</h2>
                <p className="text-[#4a4a4a] text-xs">
                  {(myPractices.morning?.length || 0) +
                    (myPractices.day?.length || 0) +
                    (myPractices.evening?.length || 0)}{" "}
                  practices • {getTotalDuration()} minutes total
                </p>
              </div>
              <div className="flex gap-2">
                <Link href="/daily-routine">
                  <Button variant="outline" size="sm" className="border-sage-300 text-[#4a4a4a] h-7 text-xs px-3">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  size="sm"
                  className="mindful-button h-7 text-xs px-3"
                  onClick={startFirstPractice}
                  disabled={
                    (myPractices.morning?.length || 0) +
                      (myPractices.day?.length || 0) +
                      (myPractices.evening?.length || 0) ===
                    0
                  }
                >
                  Start
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compact Practice Sections */}
        <div className="space-y-4">
          {[
            { key: "morning", title: "Morning Ritual", subtitle: "Start your day with intention" },
            { key: "day", title: "Daytime Practices", subtitle: "Mindful moments throughout your day" },
            { key: "evening", title: "Evening Ritual", subtitle: "Wind down and reflect" },
          ].map(({ key, title, subtitle }) => {
            const practices = myPractices[key as keyof typeof myPractices] || []
            const TimeIcon = getTimeIcon(key)

            if (practices.length === 0) return null

            return (
              <Card key={key} className={`mindful-card ${getTimeColor(key)}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="pl-3">
                      <CardTitle className="tertiary-title text-sm text-left">{title}</CardTitle>
                      <p className="text-[#4a4a4a] text-xs text-left">{subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-white/70 flex items-center justify-center">
                        <TimeIcon className="h-4 w-4 text-[#4a4a4a]" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {practices.map((practice: any) => (
                      <div key={practice.id} className="p-3 bg-sage-50 rounded-lg border border-sage-200 group">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 pl-3">
                            <h4 className="font-medium text-[#4a4a4a] text-sm text-left">{practice.name}</h4>
                            <p className="text-xs text-[#4a4a4a] text-left">
                              {practice.duration} - {practice.description}
                            </p>
                          </div>
                          <Link href={practice.path} onClick={() => window.scrollTo(0, 0)}>
                            <Button size="sm" className="mindful-button h-7 text-xs px-2 ml-3">
                              Start
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {(myPractices.morning?.length || 0) === 0 &&
          (myPractices.day?.length || 0) === 0 &&
          (myPractices.evening?.length || 0) === 0 && (
            <Card className="mindful-card">
              <CardContent className="text-center py-12">
                <h3 className="tertiary-title mb-4">No practices selected yet</h3>
                <p className="text-[#4a4a4a] mb-6">Start building your personalized daily routine</p>
                <Link href="/daily-routine">
                  <Button className="mindful-button">Build My Routine</Button>
                </Link>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  )
}
