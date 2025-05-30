import PageHeader from "@/components/page-header"
import CategoryGrid from "@/components/category-grid"

export default function FocusAreaPage() {
  return (
    <div className="page-transition">
      <PageHeader
        title="Focus Areas"
        subtitle="Choose your mindfulness journey based on what you need most right now"
      />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-sage-50 rounded-lg border border-sage-200 p-6 mb-6">
          <div className="mb-4">
            <h3 className="secondary-title mb-2">Meditation</h3>
            <p className="text-[#4a4a4a] leading-relaxed pl-6" style={{ color: "#4a4a4a !important" }}>
              Find your center through guided meditation practices designed to cultivate inner peace and awareness
            </p>
          </div>
          <CategoryGrid />
        </div>
      </div>
    </div>
  )
}
