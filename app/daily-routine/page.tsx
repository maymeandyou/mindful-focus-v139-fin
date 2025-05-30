"use client"

import { useState, useEffect } from "react"
import PageHeader from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Sun, Moon, Check, Plus, Play, X, Search, Edit3, Compass, Heart, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Complete practices by category including missing categories
const practicesByCategory = {
  meditation: [
    {
      id: "breath-awareness",
      name: "Breath Awareness",
      duration: "10 min",
      description: "Focus on natural breath rhythm",
      path: "/timer?practice=breath-awareness&duration=10&title=Breath%20Awareness&description=Focus%20on%20natural%20breath%20rhythm",
    },
    {
      id: "body-scan",
      name: "Body Scan Meditation",
      duration: "15 min",
      description: "Systematic body relaxation",
      path: "/timer?practice=body-scan&duration=15&title=Body%20Scan%20Meditation&description=Systematic%20body%20relaxation",
    },
    {
      id: "loving-kindness",
      name: "Loving-Kindness",
      duration: "12 min",
      description: "Cultivate compassion",
      path: "/timer?practice=loving-kindness&duration=12&title=Loving-Kindness&description=Cultivate%20compassion",
    },
  ],
  breathwork: [
    {
      id: "box-breathing",
      name: "Box Breathing",
      duration: "5 min",
      description: "4-4-4-4 breathing pattern",
      path: "/breathwork",
    },
    {
      id: "4-7-8-breathing",
      name: "4-7-8 Breathing",
      duration: "8 min",
      description: "Calming breath technique",
      path: "/breathwork",
    },
    {
      id: "alternate-nostril",
      name: "Alternate Nostril",
      duration: "10 min",
      description: "Balance nervous system",
      path: "/breathwork",
    },
  ],
  gratitude: [
    {
      id: "three-good-things",
      name: "Three Good Things",
      duration: "5 min",
      description: "Reflect on positive experiences",
      path: "/journal",
    },
    {
      id: "gratitude-letter",
      name: "Gratitude Letter",
      duration: "15 min",
      description: "Write heartfelt appreciation",
      path: "/journal",
    },
    {
      id: "appreciation-walk",
      name: "Appreciation Walk",
      duration: "20 min",
      description: "Mindful gratitude walking",
      path: "/timer?practice=appreciation-walk&duration=20&title=Appreciation%20Walk&description=Mindful%20gratitude%20walking",
    },
  ],
  mindfulness: [
    {
      id: "five-senses",
      name: "5-4-3-2-1 Grounding",
      duration: "5 min",
      description: "Anchor in present moment",
      path: "/timer?practice=five-senses&duration=5&title=5-4-3-2-1%20Grounding&description=Anchor%20in%20present%20moment",
    },
    {
      id: "mindful-eating",
      name: "Mindful Eating",
      duration: "15 min",
      description: "Conscious consumption",
      path: "/timer?practice=mindful-eating&duration=15&title=Mindful%20Eating&description=Conscious%20consumption",
    },
    {
      id: "present-moment",
      name: "Present Moment Check-in",
      duration: "3 min",
      description: "Awareness of here and now",
      path: "/timer?practice=present-moment&duration=3&title=Present%20Moment%20Check-in&description=Awareness%20of%20here%20and%20now",
    },
  ],
  mood: [
    {
      id: "emotion-labeling",
      name: "Emotion Labeling",
      duration: "5 min",
      description: "Name and acknowledge feelings",
      path: "/timer?practice=emotion-labeling&duration=5&title=Emotion%20Labeling&description=Name%20and%20acknowledge%20feelings",
    },
    {
      id: "mood-tracking",
      name: "Daily Mood Check-in",
      duration: "3 min",
      description: "Monitor emotional patterns",
      path: "/journal",
    },
    {
      id: "joy-cultivation",
      name: "Joy Cultivation",
      duration: "12 min",
      description: "Generate positive emotions",
      path: "/timer?practice=joy-cultivation&duration=12&title=Joy%20Cultivation&description=Generate%20positive%20emotions",
    },
  ],
  movement: [
    {
      id: "mindful-stretching",
      name: "Mindful Stretching",
      duration: "15 min",
      description: "Conscious movement",
      path: "/exercises?practice=mindful-stretching&duration=15&title=Mindful%20Stretching&description=Conscious%20movement",
    },
    {
      id: "walking-meditation",
      name: "Walking Meditation",
      duration: "20 min",
      description: "Mindful steps",
      path: "/timer?practice=walking-meditation&duration=20&title=Walking%20Meditation&description=Mindful%20steps",
    },
    {
      id: "gentle-yoga",
      name: "Gentle Yoga Flow",
      duration: "25 min",
      description: "Breath with movement",
      path: "/exercises?practice=gentle-yoga&duration=25&title=Gentle%20Yoga%20Flow&description=Breath%20with%20movement",
    },
  ],
  nature: [
    {
      id: "forest-bathing",
      name: "Forest Bathing",
      duration: "30 min",
      description: "Immerse yourself in nature",
      path: "/timer?practice=forest-bathing&duration=30&title=Forest%20Bathing&description=Immerse%20yourself%20in%20nature",
    },
    {
      id: "nature-sounds",
      name: "Nature Sounds Meditation",
      duration: "15 min",
      description: "Connect with natural soundscapes",
      path: "/timer?practice=nature-sounds&duration=15&title=Nature%20Sounds%20Meditation&description=Connect%20with%20natural%20soundscapes",
    },
  ],
  "self-awareness": [
    {
      id: "self-reflection",
      name: "Self-Reflection Journal",
      duration: "10 min",
      description: "Explore your inner thoughts",
      path: "/journal",
    },
    {
      id: "values-check",
      name: "Values Check-in",
      duration: "8 min",
      description: "Align with your core values",
      path: "/timer?practice=values-check&duration=8&title=Values%20Check-in&description=Align%20with%20your%20core%20values",
    },
  ],
  challenge: [
    {
      id: "comfort-zone",
      name: "Comfort Zone Challenge",
      duration: "Variable",
      description: "Step outside your comfort zone",
      path: "/challenges",
    },
    {
      id: "kindness-challenge",
      name: "Random Acts of Kindness",
      duration: "Variable",
      description: "Spread kindness throughout your day",
      path: "/challenges",
    },
  ],
}

// Tab-specific featured practices
const featuredPracticesByTab = {
  morning: [
    {
      id: "featured-morning-breath",
      name: "Morning Breath Awareness",
      duration: "5 min",
      description: "Start your day with mindful breathing",
      path: "/timer?practice=morning-breath&duration=5&title=Morning%20Breath%20Awareness&description=Start%20your%20day%20with%20mindful%20breathing",
      isFeatured: true,
    },
    {
      id: "featured-intention-setting",
      name: "Daily Intention Setting",
      duration: "3 min",
      description: "Set your focus for the day ahead",
      path: "/intentions",
      isFeatured: true,
    },
  ],
  day: [
    {
      id: "featured-midday-reset",
      name: "Midday Reset",
      duration: "3 min",
      description: "Quick mindful break to refocus",
      path: "/timer?practice=midday-reset&duration=3&title=Midday%20Reset&description=Quick%20mindful%20break%20to%20refocus",
      isFeatured: true,
    },
    {
      id: "featured-walking-break",
      name: "Walking Break",
      duration: "10 min",
      description: "Mindful movement during your day",
      path: "/timer?practice=walking-break&duration=10&title=Walking%20Break&description=Mindful%20movement%20during%20your%20day",
      isFeatured: true,
    },
  ],
  evening: [
    {
      id: "featured-evening-reflection",
      name: "Evening Reflection",
      duration: "5 min",
      description: "Reflect on your day with kindness",
      path: "/journal",
      isFeatured: true,
    },
    {
      id: "featured-bedtime-breathing",
      name: "Bedtime Breathing",
      duration: "8 min",
      description: "Calm your mind for restful sleep",
      path: "/breathwork",
      isFeatured: true,
    },
  ],
}

// Category-based featured practices
const featuredPracticesByCategory = {
  meditation: [
    {
      id: "featured-morning-meditation",
      name: "Morning Meditation",
      duration: "10 min",
      description: "Start your day with peaceful awareness",
      path: "/timer?practice=morning-meditation&duration=10&title=Morning%20Meditation&description=Start%20your%20day%20with%20peaceful%20awareness",
      isFeatured: true,
    },
  ],
  breathwork: [
    {
      id: "featured-morning-breath",
      name: "Morning Breath Awareness",
      duration: "5 min",
      description: "Start your day with mindful breathing",
      path: "/timer?practice=morning-breath&duration=5&title=Morning%20Breath%20Awareness&description=Start%20your%20day%20with%20mindful%20breathing",
      isFeatured: true,
    },
  ],
  gratitude: [
    {
      id: "featured-gratitude-practice",
      name: "Daily Gratitude Practice",
      duration: "5 min",
      description: "Cultivate appreciation for your day",
      path: "/journal",
      isFeatured: true,
    },
  ],
  mindfulness: [
    {
      id: "featured-mindful-moment",
      name: "Mindful Moment",
      duration: "3 min",
      description: "Quick present-moment awareness",
      path: "/timer?practice=mindful-moment&duration=3&title=Mindful%20Moment&description=Quick%20present-moment%20awareness",
      isFeatured: true,
    },
  ],
  mood: [
    {
      id: "featured-mood-boost",
      name: "Mood Boost Practice",
      duration: "7 min",
      description: "Lift your spirits naturally",
      path: "/timer?practice=mood-boost&duration=7&title=Mood%20Boost%20Practice&description=Lift%20your%20spirits%20naturally",
      isFeatured: true,
    },
  ],
  movement: [
    {
      id: "featured-gentle-movement",
      name: "Gentle Movement",
      duration: "10 min",
      description: "Mindful body activation",
      path: "/exercises?practice=gentle-movement&duration=10&title=Gentle%20Movement&description=Mindful%20body%20activation",
      isFeatured: true,
    },
  ],
  nature: [
    {
      id: "featured-nature-connection",
      name: "Nature Connection",
      duration: "15 min",
      description: "Connect with the natural world",
      path: "/timer?practice=nature-connection&duration=15&title=Nature%20Connection&description=Connect%20with%20the%20natural%20world",
      isFeatured: true,
    },
  ],
  "self-awareness": [
    {
      id: "featured-self-check",
      name: "Self Check-in",
      duration: "5 min",
      description: "Tune into your inner state",
      path: "/timer?practice=self-check&duration=5&title=Self%20Check-in&description=Tune%20into%20your%20inner%20state",
      isFeatured: true,
    },
  ],
  challenge: [
    {
      id: "featured-daily-challenge",
      name: "Daily Growth Challenge",
      duration: "Variable",
      description: "Small step outside comfort zone",
      path: "/challenges",
      isFeatured: true,
    },
  ],
}

// Intention suggestions grouped by category
const intentionCategories = {
  mindfulness: {
    name: "Mindfulness",
    intentions: [
      "I am present in each moment",
      "I notice my thoughts without judgment",
      "I focus on the here and now",
      "I observe my feelings with curiosity",
      "I am fully engaged in this moment",
    ],
  },
  growth: {
    name: "Growth & Learning",
    intentions: [
      "I embrace growth through challenges",
      "I welcome new possibilities",
      "I approach today with curiosity and openness",
      "I learn from every experience",
      "I am open to change and transformation",
    ],
  },
  peace: {
    name: "Peace & Calm",
    intentions: [
      "I choose peace over perfection",
      "I respond with kindness to myself and others",
      "I move through my day with ease",
      "I breathe through difficult moments",
      "I create calm within myself",
    ],
  },
  empowerment: {
    name: "Empowerment",
    intentions: [
      "I trust in my ability to handle whatever comes",
      "I focus on what I can control",
      "I honor my needs and boundaries",
      "I am enough, exactly as I am",
      "I listen to my inner wisdom",
    ],
  },
  joy: {
    name: "Joy & Gratitude",
    intentions: [
      "I cultivate gratitude throughout my day",
      "I create space for joy and wonder",
      "I choose love over fear",
      "I appreciate the small moments",
      "I find beauty in ordinary experiences",
    ],
  },
}

// Default intention
const defaultIntention = "I approach today with curiosity and openness"

export default function DailyRoutinePage() {
  const [myPractices, setMyPractices] = useState({
    morning: [],
    day: [],
    evening: [],
  })
  const [activeTab, setActiveTab] = useState("morning")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [customPractice, setCustomPractice] = useState({ name: "", description: "", duration: "" })
  const [isAddingCustom, setIsAddingCustom] = useState(false)
  const [hiddenFeatured, setHiddenFeatured] = useState<string[]>([])
  const [dailyIntention, setDailyIntention] = useState(defaultIntention)
  const [customIntention, setCustomIntention] = useState("")
  const [selectedIntentionCategory, setSelectedIntentionCategory] = useState<string | null>(null)

  // Load state from localStorage on mount
  useEffect(() => {
    const savedPractices = localStorage.getItem("myPractices")
    const savedHiddenFeatured = localStorage.getItem("hiddenFeatured")

    if (savedPractices) {
      setMyPractices(JSON.parse(savedPractices))
    }
    if (savedHiddenFeatured) {
      setHiddenFeatured(JSON.parse(savedHiddenFeatured))
    }

    // Load today's intention
    const today = new Date().toDateString()
    const savedIntentionDate = localStorage.getItem("intentionDate")
    const savedIntention = localStorage.getItem("todaysIntention")

    if (savedIntentionDate === today && savedIntention) {
      setDailyIntention(savedIntention)
    } else {
      // Set default intention if none exists
      setNewIntention(defaultIntention)
    }

    // Check if tab parameter is present in URL
    const urlParams = new URLSearchParams(window.location.search)
    const tabParam = urlParams.get("tab")
    if (tabParam && ["morning", "day", "evening", "intention"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("myPractices", JSON.stringify(myPractices))
  }, [myPractices])

  useEffect(() => {
    localStorage.setItem("hiddenFeatured", JSON.stringify(hiddenFeatured))
  }, [hiddenFeatured])

  const addPractice = (practice: any) => {
    setMyPractices({
      ...myPractices,
      [activeTab]: [...(myPractices[activeTab as keyof typeof myPractices] || []), practice],
    })

    // Hide the featured practice if it was added from featured suggestions
    if (practice.isFeatured) {
      setHiddenFeatured([...hiddenFeatured, practice.id])
    }
  }

  const addCustomPractice = () => {
    if (customPractice.name && customPractice.duration) {
      const practice = {
        id: `custom-${Date.now()}`,
        name: customPractice.name,
        duration: customPractice.duration,
        description: customPractice.description || "Custom practice",
        path: `/timer?practice=custom&duration=${customPractice.duration}&title=${encodeURIComponent(customPractice.name)}&description=${encodeURIComponent(customPractice.description || "Custom practice")}`,
      }
      addPractice(practice)
      setCustomPractice({ name: "", description: "", duration: "" })
      setIsAddingCustom(false)
    }
  }

  const removePractice = (timeOfDay: keyof typeof myPractices, practiceId: string) => {
    setMyPractices({
      ...myPractices,
      [timeOfDay]: (myPractices[timeOfDay] || []).filter((p: any) => p.id !== practiceId),
    })
  }

  const hideFeaturedPractice = (practiceId: string) => {
    setHiddenFeatured([...hiddenFeatured, practiceId])
  }

  const getAllPractices = () => {
    return Object.entries(practicesByCategory).flatMap(([category, practices]) =>
      practices.map((practice) => ({ ...practice, category })),
    )
  }

  const getFilteredPractices = () => {
    let practices = getAllPractices()

    if (selectedCategory) {
      practices = practices.filter((practice) => practice.category === selectedCategory)
    }

    if (searchQuery) {
      practices = practices.filter(
        (practice) =>
          practice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          practice.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Safely get practice IDs with null checks
    const currentTabPractices = myPractices[activeTab as keyof typeof myPractices] || []
    const myPracticeIds = currentTabPractices.map((p: any) => p.id)
    return practices.filter((practice) => !myPracticeIds.includes(practice.id))
  }

  const getTotalPractices = () => {
    return (myPractices.morning?.length || 0) + (myPractices.day?.length || 0) + (myPractices.evening?.length || 0)
  }

  const getVisibleFeaturedPractices = () => {
    // Show tab-specific suggestions first, then category-specific if a category is selected
    let featured = []

    if (selectedCategory && featuredPracticesByCategory[selectedCategory as keyof typeof featuredPracticesByCategory]) {
      featured = featuredPracticesByCategory[selectedCategory as keyof typeof featuredPracticesByCategory]
    } else {
      featured = featuredPracticesByTab[activeTab as keyof typeof featuredPracticesByTab] || []
    }

    // Filter out hidden practices and practices already added to current tab
    const currentTabPractices = myPractices[activeTab as keyof typeof myPractices] || []
    const myPracticeIds = currentTabPractices.map((p: any) => p.id)

    return featured.filter((practice) => !hiddenFeatured.includes(practice.id) && !myPracticeIds.includes(practice.id))
  }

  const setNewIntention = (intention: string) => {
    const today = new Date().toDateString()
    setDailyIntention(intention)
    localStorage.setItem("todaysIntention", intention)
    localStorage.setItem("intentionDate", today)
  }

  const setCustomIntentionHandler = () => {
    if (customIntention.trim()) {
      setNewIntention(customIntention.trim())
      setCustomIntention("")
    }
  }

  const getRandomIntention = () => {
    // Flatten all intentions from all categories
    const allIntentions = Object.values(intentionCategories).flatMap((category) => category.intentions)
    const randomIndex = Math.floor(Math.random() * allIntentions.length)
    return allIntentions[randomIndex]
  }

  return (
    <div className="page-transition">
      <PageHeader
        title="Build My Daily Mindful Routine"
        subtitle="Choose practices for your morning, day, and evening rituals"
      />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="morning" className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <span>Morning</span>
            </TabsTrigger>
            <TabsTrigger value="day" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Day</span>
            </TabsTrigger>
            <TabsTrigger value="evening" className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              <span>Evening</span>
            </TabsTrigger>
            <TabsTrigger value="intention" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Daily Intention</span>
            </TabsTrigger>
          </TabsList>

          {/* Show link to consolidated routine if practices exist for all tabs */}
          {getTotalPractices() > 0 && (
            <div className="mb-8">
              <Card className="mindful-card bg-white border border-sage-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="tertiary-title text-sm mb-2">Your Daily Routine is Ready!</h3>
                      <p className="text-[#4a4a4a] text-xs">
                        You have {getTotalPractices()} practices selected. View your complete routine.
                      </p>
                    </div>
                    <Link href="/my-routine">
                      <Button className="mindful-button text-xs px-3 h-7">View My Routine</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {["morning", "day", "evening"].map((timeOfDay) => (
            <TabsContent key={timeOfDay} value={timeOfDay}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* My Ritual */}
                <Card className="mindful-card h-fit">
                  <CardHeader className="relative">
                    <CardTitle className="tertiary-title">
                      My {timeOfDay === "morning" ? "Morning" : timeOfDay === "day" ? "Daytime" : "Evening"} Ritual
                    </CardTitle>
                    <Dialog open={isAddingCustom} onOpenChange={setIsAddingCustom}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-4 right-4 h-8 w-8 p-0 text-sage-600 hover:text-sage-800"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="pt-6">
                          <DialogTitle className="text-base">Add Custom Practice</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-xs font-medium">Practice Name</label>
                            <Input
                              value={customPractice.name}
                              onChange={(e) => setCustomPractice({ ...customPractice, name: e.target.value })}
                              placeholder="e.g., Personal Reflection"
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium">Duration</label>
                            <Input
                              value={customPractice.duration}
                              onChange={(e) => setCustomPractice({ ...customPractice, duration: e.target.value })}
                              placeholder="e.g., 10 min"
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium">Description (optional)</label>
                            <Textarea
                              value={customPractice.description}
                              onChange={(e) => setCustomPractice({ ...customPractice, description: e.target.value })}
                              placeholder="Brief description of your practice"
                              className="text-sm"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={addCustomPractice} className="mindful-button text-xs px-3 h-7">
                              Add Practice
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setIsAddingCustom(false)}
                              className="text-xs px-3 h-7"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* Tab-specific or Category-based Featured Practices */}
                      {getVisibleFeaturedPractices().map((practice) => (
                        <div key={practice.id} className="p-3 bg-amber-50 rounded-lg border border-amber-200 group">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center flex-1">
                              <div className="flex-1 text-left">
                                <h4 className="font-medium text-[#4a4a4a] text-sm">{practice.name}</h4>
                                <p className="text-xs text-[#4a4a4a]">
                                  {practice.duration} - {practice.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 ml-3">
                              <Button
                                size="sm"
                                onClick={() => addPractice(practice)}
                                className="mindful-button h-7 text-xs px-2"
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-amber-600 hover:text-amber-800"
                                onClick={() => hideFeaturedPractice(practice.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Regular Practices */}
                      {(myPractices[timeOfDay as keyof typeof myPractices] || []).map((practice: any) => (
                        <div key={practice.id} className="p-3 bg-sage-50 rounded-lg border border-sage-200 group">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center flex-1">
                              <Check className="h-4 w-4 text-sage-500 mr-3 flex-shrink-0" />
                              <div className="flex-1 text-left">
                                <h4 className="font-medium text-[#4a4a4a] text-sm">{practice.name}</h4>
                                <p className="text-xs text-[#4a4a4a]">
                                  {practice.duration} - {practice.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 ml-3">
                              <Link href={practice.path} onClick={() => window.scrollTo(0, 0)}>
                                <Button size="sm" className="mindful-button h-7 text-xs px-2">
                                  <Play className="h-3 w-3 mr-1" />
                                  Start
                                </Button>
                              </Link>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-rose-500 hover:text-rose-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removePractice(timeOfDay as keyof typeof myPractices, practice.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Empty state */}
                      {(myPractices[timeOfDay as keyof typeof myPractices]?.length || 0) === 0 &&
                        getVisibleFeaturedPractices().length === 0 && (
                          <div className="p-4 text-[#4a4a4a] bg-sage-25 rounded-lg border border-sage-100 text-left">
                            <p className="mb-2 font-medium text-sm">No practices added yet</p>
                            <p className="text-xs">Add practices from the options on the right →</p>
                          </div>
                        )}
                    </div>
                  </CardContent>
                </Card>

                {/* Available Practices */}
                <Card className="mindful-card h-fit">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="tertiary-title">Add Practices</CardTitle>
                      <Link href="/explore">
                        <Button className="mindful-button h-8 text-xs px-3">
                          <Compass className="h-3 w-3 mr-1" />
                          Explore
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Search and Filter */}
                    <div className="space-y-3 mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search practices..."
                          className="pl-10 h-8 text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>

                      {/* Category Filter - Much smaller font with more padding */}
                      <div className="flex flex-wrap gap-1">
                        <Button
                          variant={selectedCategory === null ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(null)}
                          className={`h-6 px-3 ${selectedCategory === null ? "mindful-button" : ""}`}
                          style={{ fontSize: "14px", fontWeight: "500" }}
                        >
                          All
                        </Button>
                        {Object.keys(practicesByCategory).map((category) => (
                          <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            className={`h-6 px-3 ${selectedCategory === category ? "mindful-button" : ""}`}
                            style={{ fontSize: "14px", fontWeight: "500" }}
                          >
                            {category === "self-awareness"
                              ? "Self-Awareness"
                              : category.charAt(0).toUpperCase() + category.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Practice List - Smaller, cleaner boxes */}
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {getFilteredPractices().map((practice) => (
                        <div
                          key={practice.id}
                          className="p-3 bg-white rounded-lg border border-sage-200 hover:bg-sage-50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-[#4a4a4a] text-sm">{practice.name}</h4>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs h-5 px-1 font-normal">
                                    {practice.category}
                                  </Badge>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => addPractice(practice)}
                                    className="text-sage-600 border-sage-300 hover:bg-sage-50 h-6 text-xs px-2"
                                  >
                                    <Plus className="h-3 w-3 mr-1" />
                                    Add
                                  </Button>
                                </div>
                              </div>
                              <p className="text-xs text-[#4a4a4a]">
                                {practice.duration} - {practice.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                      {getFilteredPractices().length === 0 && (
                        <div className="text-center py-6 text-[#4a4a4a]">
                          <p className="text-sm">
                            {searchQuery || selectedCategory
                              ? "No practices found matching your criteria."
                              : "All available practices have been added to your ritual!"}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}

          {/* Daily Intention Tab */}
          <TabsContent value="intention">
            <div className="max-w-2xl mx-auto">
              {/* Show link to consolidated routine if practices exist */}
              {getTotalPractices() > 0 && (
                <div className="mb-8">
                  <Card className="mindful-card bg-white border border-sage-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="tertiary-title text-sm mb-2">Your Daily Routine is Ready!</h3>
                          <p className="text-[#4a4a4a] text-xs">
                            You have {getTotalPractices()} practices selected. View your complete routine.
                          </p>
                        </div>
                        <Link href="/my-routine">
                          <Button className="mindful-button text-xs px-3 h-7">View My Routine</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <Card className="mindful-card">
                <CardHeader className="text-center">
                  <CardTitle className="tertiary-title flex items-center justify-center">
                    <Heart className="w-5 h-5 mr-2 text-rose-500" />
                    Daily Intention
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Intention */}
                  <div className="p-6 bg-rose-50 rounded-xl border border-rose-100">
                    <div className="flex items-center justify-center gap-3">
                      <p className="text-[#4a4a4a] italic text-center text-lg flex-1">"{dailyIntention}"</p>
                      <Button
                        onClick={() => setNewIntention(getRandomIntention())}
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-rose-400 hover:text-rose-600 hover:bg-rose-100 flex-shrink-0"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Set My Intention */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-[#4a4a4a] text-sm">Set My Intention</h4>
                    <Input
                      placeholder="I intend to... or choose from suggestions below"
                      value={customIntention}
                      onChange={(e) => setCustomIntention(e.target.value)}
                      className="mindful-input"
                      onKeyPress={(e) => e.key === "Enter" && setCustomIntentionHandler()}
                    />
                    <Button
                      onClick={() => {
                        if (customIntention.trim()) {
                          setCustomIntentionHandler()
                        } else {
                          // Save the currently displayed intention
                          const today = new Date().toDateString()
                          localStorage.setItem("todaysIntention", dailyIntention)
                          localStorage.setItem("intentionDate", today)
                        }
                      }}
                      className="mindful-button w-full"
                    >
                      Set My Intention
                    </Button>
                  </div>

                  {/* Intention Category Filter */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-[#4a4a4a] text-sm">Choose Another Intention</h4>
                    <div className="flex flex-wrap gap-1">
                      <Button
                        variant={selectedIntentionCategory === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedIntentionCategory(null)}
                        className={`h-6 px-3 ${selectedIntentionCategory === null ? "mindful-button" : ""}`}
                        style={{ fontSize: "14px", fontWeight: "500" }}
                      >
                        All
                      </Button>
                      {Object.entries(intentionCategories).map(([key, category]) => (
                        <Button
                          key={key}
                          variant={selectedIntentionCategory === key ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedIntentionCategory(key)}
                          className={`h-6 px-3 ${selectedIntentionCategory === key ? "mindful-button" : ""}`}
                          style={{ fontSize: "14px", fontWeight: "500" }}
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Filtered intentions */}
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedIntentionCategory ? (
                      // Show only selected category
                      <div className="space-y-2">
                        <div className="grid gap-2">
                          {intentionCategories[
                            selectedIntentionCategory as keyof typeof intentionCategories
                          ].intentions.map((intention, index) => (
                            <button
                              key={index}
                              onClick={() => setNewIntention(intention)}
                              className="p-3 text-left bg-white rounded-lg border border-sage-200 hover:bg-sage-50 transition-colors text-sm text-[#4a4a4a]"
                            >
                              "{intention}"
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      // Show all categories
                      Object.entries(intentionCategories).map(([key, category]) => (
                        <div key={key} className="space-y-2">
                          <h5 className="font-medium text-[#4a4a4a] text-xs uppercase tracking-wider">
                            {category.name}
                          </h5>
                          <div className="grid gap-2">
                            {category.intentions.map((intention, index) => (
                              <button
                                key={index}
                                onClick={() => setNewIntention(intention)}
                                className="p-3 text-left bg-white rounded-lg border border-sage-200 hover:bg-sage-50 transition-colors text-sm text-[#4a4a4a]"
                              >
                                "{intention}"
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-xs text-[#4a4a4a]">Your intention guides your mindful practice</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
