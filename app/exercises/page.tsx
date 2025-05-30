import PageHeader from "@/components/page-header"
import ExerciseLibrary from "@/components/exercise-library"

export default function ExercisesPage() {
  return (
    <div className="page-transition">
      <PageHeader
        title="Mindful Exercises"
        subtitle="Physical practices to enhance mind-body connection"
        backTo="/explore"
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <ExerciseLibrary />
      </div>
    </div>
  )
}
