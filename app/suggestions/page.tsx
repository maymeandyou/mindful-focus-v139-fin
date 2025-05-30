"use client"

import { PageHeader } from "@/components/page-header"
import ActivitySuggestions from "@/components/activity-suggestions"

export default function SuggestionsPage() {
  return (
    <div className="page-transition">
      <PageHeader title="Activity Suggestions" subtitle="Discover mindful practices to enhance your wellbeing" />

      <div className="p-4 pb-20 lg:pb-4">
        <ActivitySuggestions />
      </div>
    </div>
  )
}
