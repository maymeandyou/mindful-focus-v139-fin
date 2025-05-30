import PageHeader from "@/components/page-header"
import AffirmationCategories from "@/components/affirmation-categories"

export default function AffirmationsPage() {
  return (
    <div className="page-transition">
      <PageHeader
        title="Affirmation Guide"
        subtitle="Transform your inner dialogue with powerful, positive statements"
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6">
          <AffirmationCategories />
        </div>
      </div>
    </div>
  )
}
