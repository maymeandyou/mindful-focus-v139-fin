import PageHeader from "@/components/page-header"
import HabitTracker from "@/components/habit-tracker"
import HabitCreator from "@/components/habit-creator"

export default function HabitsPage() {
  return (
    <div className="page-transition">
      <PageHeader title="Mindful Habits" subtitle="Build consistent practices that nurture your wellbeing" />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HabitTracker />
          <HabitCreator />
        </div>
      </div>
    </div>
  )
}
