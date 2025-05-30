"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Save, Smile, Meh, Frown, Heart, Star } from "lucide-react"
import { useCategoryContext } from "@/contexts/category-context"

const moods = [
  { name: "Great", icon: Star, color: "text-amber-500", bg: "bg-amber-100" },
  { name: "Good", icon: Smile, color: "text-green-500", bg: "bg-green-100" },
  { name: "Okay", icon: Meh, color: "text-blue-500", bg: "bg-blue-100" },
  { name: "Low", icon: Frown, color: "text-orange-500", bg: "bg-orange-100" },
  { name: "Grateful", icon: Heart, color: "text-rose-500", bg: "bg-rose-100" },
]

const categoryPrompts = {
  meditation: [
    "What thoughts arose during my meditation practice today?",
    "How did meditation affect my state of mind?",
    "What did I notice about my ability to focus?",
    "How can I bring more mindfulness into my daily life?",
  ],
  breathwork: [
    "How did my breathing practice change how I feel?",
    "What sensations did I notice in my body during breathwork?",
    "How can I use breath awareness throughout my day?",
    "What emotions came up during my breathing practice?",
  ],
  gratitude: [
    "What are three things I'm genuinely grateful for today?",
    "How has gratitude practice shifted my perspective?",
    "What small blessing did I almost overlook today?",
    "Who in my life am I most grateful for and why?",
  ],
  mindfulness: [
    "What did I notice when I was fully present today?",
    "How did mindfulness change my experience of a routine activity?",
    "What pulled me away from the present moment?",
    "When did I feel most aware and awake today?",
  ],
  mood: [
    "How am I feeling right now, and what might be influencing this?",
    "What emotions came up for me today?",
    "How did I care for my emotional wellbeing today?",
    "What would I like to feel more of in my life?",
  ],
  nature: [
    "How did connecting with nature affect me today?",
    "What did I observe in the natural world?",
    "How can I bring more nature into my daily life?",
    "What lessons can I learn from the natural world?",
  ],
  "self-awareness": [
    "What did I learn about myself today?",
    "What patterns am I noticing in my thoughts or behaviors?",
    "How am I growing and changing?",
    "What would I like to understand better about myself?",
  ],
  exercise: [
    "How did movement affect my mood and energy?",
    "What did I notice about my body during exercise?",
    "How can I honor my body's needs better?",
    "What form of movement brought me the most joy today?",
  ],
  different: [
    "What new perspective did I gain today?",
    "How did trying something different feel?",
    "What would I like to explore or change tomorrow?",
    "What comfort zone would I like to step out of?",
  ],
}

const generalPrompts = [
  "What am I grateful for today?",
  "How did I show kindness to myself or others?",
  "What challenged me today and how did I respond?",
  "What brought me joy or peace today?",
  "What would I like to let go of?",
  "How did I practice mindfulness today?",
  "What intention do I want to set for tomorrow?",
]

export default function JournalEntry() {
  const { selectedCategory } = useCategoryContext()
  const [entry, setEntry] = useState("")
  const [selectedMood, setSelectedMood] = useState("")
  const [selectedPrompt, setSelectedPrompt] = useState("")

  const handleSave = () => {
    if (entry.trim() || selectedMood) {
      const journalEntry = {
        id: Date.now(),
        date: new Date().toISOString(),
        content: entry,
        mood: selectedMood,
        prompt: selectedPrompt,
        category: selectedCategory,
      }

      const existingEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]")
      const updatedEntries = [journalEntry, ...existingEntries]
      localStorage.setItem("journalEntries", JSON.stringify(updatedEntries))

      // Clear form
      setEntry("")
      setSelectedMood("")
      setSelectedPrompt("")

      // Update progress
      const today = new Date().toDateString()
      const lastJournalDate = localStorage.getItem("lastJournalDate")
      if (lastJournalDate !== today) {
        localStorage.setItem("lastJournalDate", today)
      }
    }
  }

  const JournalEntryComponent = () => {
    const usePrompt = (prompt: string) => {
      setSelectedPrompt(prompt)
      setEntry(prompt + "\n\n")
    }

    // Get prompts based on selected category
    const getPromptsForCategory = () => {
      let prompts = [...generalPrompts]

      if (selectedCategory && categoryPrompts[selectedCategory]) {
        prompts = [...categoryPrompts[selectedCategory], ...generalPrompts]
      }

      // Always include gratitude prompt
      if (!prompts.includes("What am I grateful for today?")) {
        prompts.unshift("What am I grateful for today?")
      }

      return prompts.slice(0, 4) // Show top 4 prompts
    }

    const availablePrompts = getPromptsForCategory()

    return (
      <Card className="mindful-card animate-slide-up">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center text-taupe-800">
            <BookOpen className="w-5 h-5 mr-2 text-sage-500" />
            Today's Reflection
            {selectedCategory && (
              <span className="ml-2 text-sm bg-sage-100 text-sage-700 px-2 py-1 rounded-full">{selectedCategory}</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-taupe-700">How are you feeling?</label>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <button
                  key={mood.name}
                  onClick={() => setSelectedMood(mood.name)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl border-2 transition-all duration-200 ${
                    selectedMood === mood.name
                      ? `${mood.bg} border-current ${mood.color}`
                      : "border-sage-200 text-taupe-600 hover:border-sage-300"
                  }`}
                >
                  <mood.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{mood.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Writing Prompts */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-taupe-700">
              {selectedCategory ? `${selectedCategory} prompts` : "Writing prompts"}
            </label>
            <div className="grid grid-cols-1 gap-2">
              {availablePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => usePrompt(prompt)}
                  className="text-left p-3 bg-gradient-to-r from-sage-50 to-stone-50 hover:from-sage-100 hover:to-stone-100 rounded-xl border border-sage-200/50 transition-all duration-200 text-sm text-taupe-700"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Journal Entry */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-taupe-700">Your thoughts</label>
            <Textarea
              placeholder="Let your thoughts flow freely... There's no right or wrong way to journal."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="mindful-input min-h-[120px] resize-none"
            />
          </div>

          {/* Save Button */}
          <Button onClick={handleSave} disabled={!entry.trim() && !selectedMood} className="mindful-button w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Entry
          </Button>

          <div className="text-center pt-2">
            <p className="text-xs text-taupe-500">
              {selectedCategory
                ? `Reflecting on your ${selectedCategory} practice`
                : "Your thoughts are safe and private here"}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return <JournalEntryComponent />
}
