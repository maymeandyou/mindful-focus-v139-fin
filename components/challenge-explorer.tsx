"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trophy, Heart, Brain, Leaf, Eye, Smile, User, Dumbbell, Search, Play, CheckCircle } from "lucide-react"

const challengeCategories = [
  {
    id: "mindfulness",
    name: "Mindfulness",
    icon: Eye,
    color: "from-sage-100 to-stone-100",
    challenges: [
      {
        title: "Mindful Morning Routine",
        description: "Complete your morning routine with full attention to each action",
        difficulty: "Easy",
        duration: "15 min",
      },
      {
        title: "Technology Pause",
        description: "Take 3 conscious breaths before checking your phone or computer",
        difficulty: "Easy",
        duration: "All day",
      },
      {
        title: "Mindful Eating Challenge",
        description: "Eat one meal today without any distractions, focusing on taste and texture",
        difficulty: "Medium",
        duration: "30 min",
      },
      {
        title: "Present Moment Bell",
        description: "Set random alarms to pause and notice what's happening right now",
        difficulty: "Easy",
        duration: "All day",
      },
      {
        title: "Mindful Walking",
        description: "Take a 10-minute walk focusing only on the sensations of walking",
        difficulty: "Easy",
        duration: "10 min",
      },
    ],
  },
  {
    id: "gratitude",
    name: "Gratitude",
    icon: Heart,
    color: "from-rose-100 to-amber-100",
    challenges: [
      {
        title: "Gratitude Photo Journey",
        description: "Take photos of 5 things you're grateful for throughout the day",
        difficulty: "Easy",
        duration: "All day",
      },
      {
        title: "Thank You Notes",
        description: "Write a heartfelt thank you note to someone who has impacted your life",
        difficulty: "Medium",
        duration: "20 min",
      },
      {
        title: "Gratitude for Challenges",
        description: "Find something to be grateful for in a current difficulty",
        difficulty: "Hard",
        duration: "15 min",
      },
      {
        title: "Appreciation Meditation",
        description: "Spend 10 minutes in meditation focusing only on things you appreciate",
        difficulty: "Medium",
        duration: "10 min",
      },
      {
        title: "Gratitude Sharing",
        description: "Share three things you're grateful for with someone close to you",
        difficulty: "Easy",
        duration: "10 min",
      },
    ],
  },
  {
    id: "self-compassion",
    name: "Self-Compassion",
    icon: User,
    color: "from-amber-100 to-stone-100",
    challenges: [
      {
        title: "Inner Critic Observer",
        description: "Notice self-critical thoughts and respond with kindness",
        difficulty: "Medium",
        duration: "All day",
      },
      {
        title: "Self-Forgiveness Practice",
        description: "Write a letter of forgiveness to yourself for a past mistake",
        difficulty: "Hard",
        duration: "25 min",
      },
      {
        title: "Comfort a Friend Exercise",
        description: "Treat yourself as you would comfort a good friend in distress",
        difficulty: "Medium",
        duration: "15 min",
      },
      {
        title: "Body Appreciation",
        description: "Thank your body for all the ways it supports you today",
        difficulty: "Easy",
        duration: "10 min",
      },
      {
        title: "Gentle Self-Talk",
        description: "Replace harsh self-talk with gentle, encouraging words",
        difficulty: "Medium",
        duration: "All day",
      },
    ],
  },
  {
    id: "connection",
    name: "Connection",
    icon: Brain,
    color: "from-stone-100 to-taupe-100",
    challenges: [
      {
        title: "Deep Listening",
        description: "Have a conversation where you focus entirely on understanding the other person",
        difficulty: "Medium",
        duration: "20 min",
      },
      {
        title: "Random Act of Kindness",
        description: "Perform an unexpected act of kindness for someone",
        difficulty: "Easy",
        duration: "15 min",
      },
      {
        title: "Digital Connection",
        description: "Reach out to someone you haven't spoken to in a while",
        difficulty: "Easy",
        duration: "10 min",
      },
      {
        title: "Empathy Practice",
        description: "Try to understand someone's perspective who thinks differently than you",
        difficulty: "Hard",
        duration: "30 min",
      },
      {
        title: "Community Service",
        description: "Volunteer or help in your community for at least an hour",
        difficulty: "Medium",
        duration: "60 min",
      },
    ],
  },
  {
    id: "nature",
    name: "Nature",
    icon: Leaf,
    color: "from-taupe-100 to-sage-100",
    challenges: [
      {
        title: "Earthing Practice",
        description: "Spend 15 minutes barefoot on natural ground",
        difficulty: "Easy",
        duration: "15 min",
      },
      {
        title: "Nature Sit Spot",
        description: "Find a place in nature and sit quietly for 20 minutes",
        difficulty: "Medium",
        duration: "20 min",
      },
      {
        title: "Weather Appreciation",
        description: "Spend time outside appreciating whatever weather is present",
        difficulty: "Easy",
        duration: "10 min",
      },
      {
        title: "Plant Connection",
        description: "Spend time caring for or observing plants with full attention",
        difficulty: "Easy",
        duration: "15 min",
      },
      {
        title: "Sunrise or Sunset",
        description: "Watch either sunrise or sunset with complete presence",
        difficulty: "Medium",
        duration: "30 min",
      },
    ],
  },
  {
    id: "creativity",
    name: "Creativity",
    icon: Smile,
    color: "from-sage-100 to-rose-100",
    challenges: [
      {
        title: "Mindful Art Creation",
        description: "Create something artistic with complete focus on the process",
        difficulty: "Medium",
        duration: "30 min",
      },
      {
        title: "Stream of Consciousness",
        description: "Write continuously for 10 minutes without stopping or editing",
        difficulty: "Easy",
        duration: "10 min",
      },
      {
        title: "Photography Meditation",
        description: "Take photos with complete presence, focusing on seeing rather than capturing",
        difficulty: "Medium",
        duration: "20 min",
      },
      {
        title: "Creative Problem Solving",
        description: "Approach a current challenge from a completely creative angle",
        difficulty: "Hard",
        duration: "25 min",
      },
      {
        title: "Playful Expression",
        description: "Engage in any form of play or creative expression for pure joy",
        difficulty: "Easy",
        duration: "20 min",
      },
    ],
  },
  {
    id: "movement",
    name: "Mindful Movement",
    icon: Dumbbell,
    color: "from-rose-100 to-amber-100",
    challenges: [
      {
        title: "Body Scan Movement",
        description: "Move your body while maintaining awareness of physical sensations",
        difficulty: "Medium",
        duration: "15 min",
      },
      {
        title: "Dance Meditation",
        description: "Move freely to music, expressing emotions through movement",
        difficulty: "Medium",
        duration: "20 min",
      },
      {
        title: "Slow Motion Day",
        description: "Perform all movements 50% slower than usual for one hour",
        difficulty: "Hard",
        duration: "60 min",
      },
      {
        title: "Stretching Meditation",
        description: "Stretch your body with complete attention to sensation",
        difficulty: "Easy",
        duration: "15 min",
      },
      {
        title: "Balance Challenge",
        description: "Practice balance poses while maintaining breath awareness",
        difficulty: "Medium",
        duration: "10 min",
      },
    ],
  },
]

export default function ChallengeExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])

  const filteredCategories = challengeCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.challenges.some(
        (challenge) =>
          challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          challenge.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  )

  const markAsCompleted = (challengeTitle: string) => {
    const newCompleted = [...completedChallenges, challengeTitle]
    setCompletedChallenges(newCompleted)

    // Save to localStorage
    const today = new Date().toDateString()
    const completedToday = JSON.parse(localStorage.getItem(`challenges_${today}`) || "[]")
    completedToday.push(challengeTitle)
    localStorage.setItem(`challenges_${today}`, JSON.stringify(completedToday))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-300"
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-300"
      case "Hard":
        return "bg-rose-100 text-rose-800 border-rose-300"
      default:
        return "bg-stone-100 text-stone-800 border-stone-300"
    }
  }

  return (
    <Card className="mindful-card">
      <CardHeader>
        <CardTitle className="text-taupe-800 font-display">Challenge Library</CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-taupe-400" />
          <Input
            placeholder="Search challenges..."
            className="pl-10 mindful-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className={`p-4 rounded-xl bg-gradient-to-br ${category.color} border border-sage-200/50 hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-white/60 rounded-lg">
                  <category.icon className="w-5 h-5 text-taupe-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-taupe-800 font-display">{category.name}</h3>
                  <Badge variant="outline" className="mt-1 bg-white/50 text-taupe-600 border-taupe-300">
                    {category.challenges.length} challenges
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {category.challenges.map((challenge, index) => (
                  <div key={index} className="p-3 bg-white/40 rounded-lg group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-taupe-800 text-sm flex-1">{challenge.title}</h4>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsCompleted(challenge.title)}
                          className="h-6 w-6 p-0 hover:bg-white/60"
                          disabled={completedChallenges.includes(challenge.title)}
                        >
                          {completedChallenges.includes(challenge.title) ? (
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          ) : (
                            <Play className="w-3 h-3 text-taupe-500" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-taupe-600 mb-2 leading-relaxed">{challenge.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </Badge>
                      <span className="text-xs text-taupe-500">{challenge.duration}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="w-full bg-white/70 hover:bg-white/90 text-taupe-800 border border-taupe-200 rounded-lg font-medium"
                variant="outline"
                onClick={() => setSelectedCategory(category.id)}
              >
                <Trophy className="w-3 h-3 mr-2" />
                Explore {category.name}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
