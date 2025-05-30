"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Clock, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Exercise categories
const categories = ["All", "Gentle Movement", "Stretching", "Balance", "Strength", "Coordination", "Relaxation"]

// Exercise data
const exercises = [
  {
    id: "e1",
    name: "Mindful Walking",
    category: "Gentle Movement",
    duration: "5-10 min",
    benefits: ["Stress reduction", "Improved focus", "Body awareness"],
    description: "A simple practice of walking with full awareness of each step and breath.",
    instructions: [
      "Find a quiet space where you can walk 10-15 steps in a straight line",
      "Stand at one end, with your feet firmly planted on the ground",
      "Take a deep breath and become aware of your body's sensations",
      "Begin walking slowly, paying attention to the lifting, moving, and placing of each foot",
      "Notice the shifting of weight and balance with each step",
      "When you reach the end, pause, breathe, and turn around mindfully",
      "Continue for 5-10 minutes, returning to breath awareness whenever your mind wanders",
    ],
  },
  {
    id: "e2",
    name: "Standing Mountain Pose",
    category: "Balance",
    duration: "3-5 min",
    benefits: ["Improved posture", "Grounding", "Mental clarity"],
    description: "A foundational standing pose that promotes stability and awareness.",
    instructions: [
      "Stand with feet hip-width apart, weight evenly distributed",
      "Engage your leg muscles slightly, keeping knees soft",
      "Lengthen your spine, imagining a string pulling from the crown of your head",
      "Relax your shoulders down and back",
      "Let your arms rest naturally at your sides, palms facing forward",
      "Breathe deeply and evenly, feeling rooted like a mountain",
      "Hold for 3-5 minutes, noticing any sensations that arise",
    ],
  },
  {
    id: "e3",
    name: "Gentle Neck Stretches",
    category: "Stretching",
    duration: "2-3 min",
    benefits: ["Tension release", "Headache relief", "Improved circulation"],
    description: "Simple stretches to release tension in the neck and shoulders.",
    instructions: [
      "Sit or stand with a straight spine",
      "Drop your right ear toward your right shoulder, keeping shoulders relaxed",
      "Hold for 3-5 breaths, feeling the stretch along the left side of your neck",
      "Return to center, then repeat on the left side",
      "Gently drop your chin toward your chest, feeling the stretch in the back of your neck",
      "Hold for 3-5 breaths",
      "Slowly lift your head back to center",
    ],
  },
  {
    id: "e4",
    name: "Chair Twist",
    category: "Stretching",
    duration: "2-3 min",
    benefits: ["Spine mobility", "Digestive health", "Stress relief"],
    description: "A seated twist that can be done at your desk to refresh your body and mind.",
    instructions: [
      "Sit toward the edge of your chair with feet flat on the floor",
      "Inhale and lengthen your spine",
      "Exhale and gently twist to the right, placing your left hand on your right knee",
      "Place your right hand behind you on the chair for support",
      "Hold for 3-5 breaths, lengthening with each inhale and twisting slightly deeper with each exhale",
      "Return to center and repeat on the other side",
    ],
  },
  {
    id: "e5",
    name: "Standing Forward Fold",
    category: "Stretching",
    duration: "1-2 min",
    benefits: ["Hamstring flexibility", "Stress reduction", "Increased circulation to brain"],
    description: "A gentle forward bend that calms the mind and stretches the back body.",
    instructions: [
      "Stand with feet hip-width apart",
      "Inhale and raise arms overhead",
      "Exhale and hinge at the hips, folding forward",
      "Bend knees as needed to release tension in the lower back",
      "Let your head and neck relax completely",
      "Hold for 5-10 breaths, feeling the stretch in the back of your legs",
      "To come up, bend knees slightly and roll up slowly, stacking vertebrae",
    ],
  },
  // More exercises would be added here to reach 50 total
]

export default function ExerciseLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedExercise, setSelectedExercise] = useState<(typeof exercises)[0] | null>(null)

  // Filter exercises based on search query and active category
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.benefits.some((benefit) => benefit.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = activeCategory === "All" || exercise.category === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taupe-400 h-4 w-4" />
          <Input
            placeholder="Search exercises..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="flex flex-wrap h-auto mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="text-sm">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-medium text-taupe-800">{exercise.name}</CardTitle>
                    <Badge variant="outline" className="bg-sage-50 text-sage-700 border-sage-200">
                      {exercise.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-taupe-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{exercise.duration}</span>
                  </div>
                  <p className="text-sm text-taupe-700">{exercise.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {exercise.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="bg-rose-50 text-rose-700 border-rose-100">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full mt-2 border-sage-300 text-taupe-700 hover:bg-sage-50"
                        onClick={() => setSelectedExercise(exercise)}
                      >
                        View Instructions
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-display text-taupe-800">{exercise.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex flex-wrap gap-2 items-center">
                          <Badge variant="outline" className="bg-sage-50 text-sage-700 border-sage-200">
                            {exercise.category}
                          </Badge>
                          <span className="text-sm text-taupe-600 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {exercise.duration}
                          </span>
                        </div>

                        <p className="text-taupe-700">{exercise.description}</p>

                        <div>
                          <h4 className="font-medium text-taupe-800 mb-2">Benefits:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {exercise.benefits.map((benefit, index) => (
                              <li key={index} className="text-taupe-700">
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-taupe-800 mb-2">Instructions:</h4>
                          <ol className="list-decimal pl-5 space-y-2">
                            {exercise.instructions.map((step, index) => (
                              <li key={index} className="text-taupe-700">
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-12">
              <p className="text-taupe-600">No exercises found matching your search.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
