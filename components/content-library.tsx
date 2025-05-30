"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Heart } from "lucide-react"

const categories = [
  {
    id: "mindfulness",
    name: "Mindfulness",
    color: "bg-purple-500",
    description: "Present moment awareness practices",
  },
  {
    id: "breathing",
    name: "Breathing",
    color: "bg-green-500",
    description: "Breathwork and respiratory techniques",
  },
  {
    id: "movement",
    name: "Movement",
    color: "bg-orange-500",
    description: "Gentle movement and body awareness",
  },
  {
    id: "gratitude",
    name: "Gratitude",
    color: "bg-pink-500",
    description: "Appreciation and thankfulness practices",
  },
  {
    id: "meditation",
    name: "Meditation",
    color: "bg-yellow-500",
    description: "Contemplative and centering practices",
  },
  {
    id: "reflection",
    name: "Reflection",
    color: "bg-blue-500",
    description: "Self-inquiry and introspective exercises",
  },
  {
    id: "connection",
    name: "Connection",
    color: "bg-indigo-500",
    description: "Relationship and community practices",
  },
  {
    id: "creativity",
    name: "Creativity",
    color: "bg-violet-500",
    description: "Artistic and expressive activities",
  },
  {
    id: "rest",
    name: "Rest",
    color: "bg-slate-500",
    description: "Relaxation and restoration practices",
  },
]

const practiceLibrary = {
  mindfulness: [
    "5-minute body scan meditation",
    "Mindful eating with a single raisin",
    "Walking meditation in nature",
    "Mindful listening to sounds around you",
    "Present moment awareness check-in",
    "Mindful hand washing practice",
    "Observing thoughts without judgment",
    "Mindful tea or coffee drinking",
    "Awareness of breath in daily activities",
    "Mindful observation of a flower or plant",
    "Noticing physical sensations practice",
    "Mindful transition between activities",
    "Awareness of emotions as they arise",
    "Mindful technology use practice",
    "Present moment grounding with 5 senses",
    "Mindful waiting practice",
    "Awareness of automatic behaviors",
    "Mindful appreciation of surroundings",
    "Non-judgmental self-observation",
    "Mindful response vs. reaction practice",
    "Awareness of mental chatter",
    "Mindful posture check-in",
    "Present moment return technique",
    "Mindful appreciation of simple pleasures",
    "Awareness of breathing patterns",
    "Mindful observation of weather",
    "Non-attachment to outcomes practice",
    "Mindful awareness of habits",
    "Present moment acceptance practice",
    "Mindful observation of colors and textures",
    "Awareness of energy levels throughout day",
    "Mindful appreciation of food sources",
    "Non-judgmental awareness of preferences",
    "Mindful observation of natural rhythms",
    "Present moment curiosity practice",
    "Awareness of interconnectedness",
    "Mindful appreciation of human kindness",
    "Non-reactive awareness practice",
    "Mindful observation of change",
    "Present moment gratitude practice",
    "Awareness of breath as anchor",
    "Mindful appreciation of silence",
    "Non-judgmental body awareness",
    "Mindful observation of thoughts passing",
    "Present moment self-compassion",
    "Awareness of space between thoughts",
    "Mindful appreciation of movement",
    "Non-attachment to mental stories",
    "Mindful observation of light and shadow",
    "Present moment loving-kindness practice",
  ],
  breathing: [
    "4-7-8 calming breath technique",
    "Box breathing for focus",
    "Belly breathing for relaxation",
    "Alternate nostril breathing",
    "Coherent breathing (5 seconds in, 5 out)",
    "Three-part breath awareness",
    "Breath counting meditation",
    "Energizing breath practice",
    "Calming exhale extension",
    "Breath observation without control",
    "Morning energizing breath",
    "Evening calming breath",
    "Breath awareness during stress",
    "Cooling breath technique",
    "Warming breath practice",
    "Breath synchronization with movement",
    "Mindful sighing practice",
    "Breath awareness in nature",
    "Gentle breath retention",
    "Breath as emotional regulation",
    "Rhythmic breathing patterns",
    "Breath awareness during walking",
    "Cleansing breath visualization",
    "Breath connection to heart",
    "Breath awareness during eating",
    "Gentle breath deepening",
    "Breath as mindfulness anchor",
    "Breath awareness during transitions",
    "Calming breath before sleep",
    "Energizing breath upon waking",
    "Breath awareness during work",
    "Gentle breath expansion",
    "Breath synchronization with music",
    "Breath awareness during exercise",
    "Calming breath during anxiety",
    "Breath connection to gratitude",
    "Breath awareness during meditation",
    "Gentle breath release practice",
    "Breath awareness during conversations",
    "Calming breath during conflict",
    "Breath connection to joy",
    "Breath awareness during creativity",
    "Gentle breath warming practice",
    "Breath awareness during learning",
    "Calming breath during overwhelm",
    "Breath connection to peace",
    "Breath awareness during healing",
    "Gentle breath cooling practice",
    "Breath awareness during gratitude",
    "Calming breath for inner peace",
  ],
  movement: [
    "Gentle neck and shoulder rolls",
    "Mindful stretching sequence",
    "Walking meditation practice",
    "Tai chi-inspired movements",
    "Yoga sun salutation",
    "Dance to favorite music",
    "Gentle spinal twists",
    "Mindful hand and wrist exercises",
    "Balance practice on one foot",
    "Gentle hip circles",
    "Mindful walking in nature",
    "Simple qigong movements",
    "Gentle forward folds",
    "Mindful arm circles",
    "Walking barefoot on grass",
    "Gentle backbends",
    "Mindful leg swings",
    "Simple balance poses",
    "Gentle side stretches",
    "Mindful marching in place",
    "Flowing movement sequence",
    "Gentle ankle circles",
    "Mindful reaching and stretching",
    "Simple core movements",
    "Gentle knee lifts",
    "Mindful swaying practice",
    "Simple strength movements",
    "Gentle finger exercises",
    "Mindful stepping practice",
    "Flowing dance movements",
    "Gentle shoulder blade squeezes",
    "Mindful toe movements",
    "Simple flexibility routine",
    "Gentle pelvic tilts",
    "Mindful walking meditation",
    "Flowing arm movements",
    "Gentle calf raises",
    "Mindful body shaking",
    "Simple coordination exercises",
    "Gentle head movements",
    "Mindful walking patterns",
    "Flowing spine movements",
    "Gentle joint mobility",
    "Mindful movement meditation",
    "Simple balance challenges",
    "Gentle muscle releases",
    "Mindful movement improvisation",
    "Flowing energy movements",
    "Gentle posture adjustments",
    "Mindful movement appreciation",
  ],
  gratitude: [
    "Three good things reflection",
    "Gratitude letter to someone special",
    "Appreciation for body parts",
    "Gratitude for simple pleasures",
    "Thank you meditation",
    "Appreciation for challenges as growth",
    "Gratitude for people in your life",
    "Appreciation for nature's gifts",
    "Gratitude for basic necessities",
    "Appreciation for past experiences",
    "Gratitude for present moment",
    "Appreciation for future possibilities",
    "Gratitude for lessons learned",
    "Appreciation for acts of kindness",
    "Gratitude for personal strengths",
    "Appreciation for creative expressions",
    "Gratitude for peaceful moments",
    "Appreciation for human connections",
    "Gratitude for technological conveniences",
    "Appreciation for cultural diversity",
    "Gratitude for seasonal changes",
    "Appreciation for artistic beauty",
    "Gratitude for learning opportunities",
    "Appreciation for healing processes",
    "Gratitude for emotional experiences",
    "Appreciation for physical sensations",
    "Gratitude for mental capabilities",
    "Appreciation for spiritual insights",
    "Gratitude for daily routines",
    "Appreciation for unexpected surprises",
    "Gratitude for problem-solving abilities",
    "Appreciation for communication skills",
    "Gratitude for adaptation capacity",
    "Appreciation for resilience",
    "Gratitude for imagination",
    "Appreciation for memory",
    "Gratitude for intuition",
    "Appreciation for humor",
    "Gratitude for compassion",
    "Appreciation for wisdom",
    "Gratitude for courage",
    "Appreciation for patience",
    "Gratitude for forgiveness",
    "Appreciation for hope",
    "Gratitude for love",
    "Appreciation for peace",
    "Gratitude for joy",
    "Appreciation for wonder",
    "Gratitude for existence itself",
    "Appreciation for this very moment",
  ],
  meditation: [
    "Loving-kindness meditation",
    "Body scan relaxation",
    "Breath awareness meditation",
    "Walking meditation practice",
    "Mantra repetition meditation",
    "Visualization meditation",
    "Open awareness meditation",
    "Compassion meditation",
    "Forgiveness meditation",
    "Gratitude meditation",
    "Mountain meditation",
    "Ocean meditation",
    "Light meditation",
    "Sound meditation",
    "Silence meditation",
    "Heart-centered meditation",
    "Chakra meditation",
    "Nature meditation",
    "Peace meditation",
    "Joy meditation",
    "Wisdom meditation",
    "Healing meditation",
    "Protection meditation",
    "Grounding meditation",
    "Centering meditation",
    "Balancing meditation",
    "Energizing meditation",
    "Calming meditation",
    "Clarity meditation",
    "Insight meditation",
    "Mindfulness meditation",
    "Concentration meditation",
    "Contemplation meditation",
    "Prayer meditation",
    "Sacred word meditation",
    "Breath counting meditation",
    "Candle gazing meditation",
    "Movement meditation",
    "Eating meditation",
    "Listening meditation",
    "Seeing meditation",
    "Feeling meditation",
    "Thinking meditation",
    "Being meditation",
    "Unity meditation",
    "Emptiness meditation",
    "Fullness meditation",
    "Present moment meditation",
    "Eternal now meditation",
    "Pure awareness meditation",
  ],
  reflection: [
    "Daily intention setting",
    "Evening reflection practice",
    "Values clarification exercise",
    "Life purpose contemplation",
    "Personal growth assessment",
    "Relationship reflection",
    "Career path contemplation",
    "Spiritual journey reflection",
    "Emotional pattern awareness",
    "Habit examination practice",
    "Goal alignment reflection",
    "Priority reassessment",
    "Strength identification exercise",
    "Challenge reframing practice",
    "Success celebration reflection",
    "Failure learning extraction",
    "Fear exploration exercise",
    "Dream interpretation practice",
    "Memory appreciation reflection",
    "Future visioning exercise",
    "Past healing reflection",
    "Present moment assessment",
    "Identity exploration practice",
    "Belief system examination",
    "Assumption questioning exercise",
    "Perspective shifting practice",
    "Wisdom gathering reflection",
    "Insight integration exercise",
    "Pattern recognition practice",
    "Cycle awareness reflection",
    "Transition contemplation",
    "Change acceptance practice",
    "Growth edge identification",
    "Comfort zone examination",
    "Courage cultivation reflection",
    "Authenticity assessment",
    "Integrity check-in practice",
    "Compassion cultivation exercise",
    "Forgiveness reflection practice",
    "Acceptance deepening exercise",
    "Surrender contemplation",
    "Trust building reflection",
    "Faith strengthening practice",
    "Hope cultivation exercise",
    "Love expansion reflection",
    "Peace deepening practice",
    "Joy cultivation exercise",
    "Wonder appreciation reflection",
    "Mystery embracing practice",
    "Meaning-making reflection",
  ],
  connection: [
    "Loving-kindness for family",
    "Compassion for difficult people",
    "Gratitude for friendships",
    "Appreciation for community",
    "Connection with nature",
    "Bonding with pets",
    "Reaching out to old friends",
    "Making new connections",
    "Deepening existing relationships",
    "Healing relationship wounds",
    "Forgiveness practice for others",
    "Empathy cultivation exercise",
    "Active listening practice",
    "Nonviolent communication",
    "Conflict resolution skills",
    "Boundary setting practice",
    "Vulnerability sharing exercise",
    "Trust building activities",
    "Intimacy deepening practices",
    "Community service engagement",
    "Group meditation practice",
    "Collaborative creative projects",
    "Shared learning experiences",
    "Mutual support networks",
    "Intergenerational connections",
    "Cultural exchange experiences",
    "Language learning for connection",
    "Travel for human connection",
    "Volunteering for causes",
    "Mentoring relationships",
    "Being mentored by others",
    "Family tradition participation",
    "Community event attendance",
    "Religious or spiritual gatherings",
    "Support group participation",
    "Team building activities",
    "Collaborative problem solving",
    "Shared meal experiences",
    "Storytelling and listening",
    "Game playing together",
    "Music making with others",
    "Dancing with community",
    "Gardening with neighbors",
    "Learning from elders",
    "Teaching younger generations",
    "Cross-cultural friendships",
    "Online community engagement",
    "Local community involvement",
    "Global awareness practices",
    "Universal love meditation",
  ],
  creativity: [
    "Free-form journaling",
    "Artistic doodling practice",
    "Creative writing prompts",
    "Photography exploration",
    "Music improvisation",
    "Dance movement expression",
    "Collage creation",
    "Poetry writing",
    "Storytelling practice",
    "Painting or drawing",
    "Sculpture with clay",
    "Craft project creation",
    "Cooking experimentation",
    "Garden design planning",
    "Interior decorating",
    "Fashion styling play",
    "Jewelry making",
    "Woodworking projects",
    "Textile arts exploration",
    "Digital art creation",
    "Video production",
    "Podcast creation",
    "Blog writing",
    "Social media content",
    "Presentation design",
    "Infographic creation",
    "Mind mapping exercises",
    "Brainstorming sessions",
    "Problem-solving innovation",
    "Invention ideation",
    "Recipe development",
    "Game creation",
    "Puzzle design",
    "Riddle composition",
    "Joke writing",
    "Song composition",
    "Choreography creation",
    "Theater improvisation",
    "Character development",
    "World building",
    "Language creation",
    "Code writing",
    "App design",
    "Website creation",
    "Logo design",
    "Pattern creation",
    "Color palette exploration",
    "Texture experimentation",
    "Sound design",
    "Creative collaboration",
  ],
  rest: [
    "Progressive muscle relaxation",
    "Guided imagery for peace",
    "Gentle yoga nidra",
    "Restorative yoga poses",
    "Warm bath meditation",
    "Nature sounds listening",
    "Soft music relaxation",
    "Aromatherapy practice",
    "Gentle self-massage",
    "Comfortable reading time",
    "Peaceful tea ceremony",
    "Sunset watching",
    "Cloud gazing practice",
    "Hammock relaxation",
    "Cozy blanket meditation",
    "Gentle stretching routine",
    "Breathing for sleep",
    "Bedtime gratitude practice",
    "Dream preparation ritual",
    "Morning gentle awakening",
    "Afternoon rest break",
    "Evening wind-down routine",
    "Weekend relaxation ritual",
    "Vacation planning meditation",
    "Staycation appreciation",
    "Home sanctuary creation",
    "Comfort zone enjoyment",
    "Slow living practice",
    "Minimalist appreciation",
    "Simplicity cultivation",
    "Ease and flow practice",
    "Effortless being meditation",
    "Natural rhythm alignment",
    "Seasonal rest adaptation",
    "Energy conservation practice",
    "Gentle boundary setting",
    "Saying no with love",
    "Rest without guilt practice",
    "Productivity release meditation",
    "Achievement detachment",
    "Being vs. doing practice",
    "Presence over performance",
    "Quality over quantity focus",
    "Depth over breadth practice",
    "Stillness appreciation",
    "Silence cultivation",
    "Emptiness meditation",
    "Spaciousness practice",
    "Timelessness experience",
    "Eternal rest meditation",
  ],
}

export default function ContentLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredPractices = selectedCategory
    ? practiceLibrary[selectedCategory as keyof typeof practiceLibrary].filter((practice) =>
        practice.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  const toggleFavorite = (practice: string) => {
    setFavorites((prev) => (prev.includes(practice) ? prev.filter((p) => p !== practice) : [...prev, practice]))
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-taupe-800 mb-4">Practice Library</h1>
        <p className="text-taupe-600 font-sans mb-6">
          Explore our comprehensive collection of mindfulness and wellness practices
        </p>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taupe-400 h-4 w-4" />
          <Input
            placeholder="Search practices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 mindful-input"
          />
        </div>
      </div>

      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer mindful-card mindful-card-hover"
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardHeader>
                <div className={`${category.color} p-4 rounded-xl mb-3`}>
                  <CardTitle className="text-lg font-display text-white">{category.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-taupe-600 font-sans">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => setSelectedCategory(null)} className="mindful-button-primary">
                ← Back to Categories
              </Button>
              <h2 className="text-2xl font-display font-bold text-taupe-800">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </h2>
            </div>
            <Badge variant="secondary" className="bg-sage-200 text-sage-800">
              {filteredPractices.length} practices
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPractices.map((practice, index) => (
              <Card key={index} className="mindful-card mindful-card-hover">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium font-sans text-taupe-800 flex-1">{practice}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(practice)}
                      className="ml-2 p-1 h-8 w-8"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(practice) ? "fill-rose-500 text-rose-500" : "text-taupe-400"
                        }`}
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
