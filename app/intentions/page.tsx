import PageHeader from "@/components/page-header"
import IntentionSelector from "@/components/intention-selector"
import MyIntentions from "@/components/my-intentions"

export default function IntentionsPage() {
  return (
    <div className="page-transition">
      <PageHeader title="Daily Intentions" subtitle="Set meaningful directions for your mindful practice" />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - My Intentions */}
          <div className="lg:col-span-1">
            <MyIntentions />
          </div>

          {/* Right Column - Intention Library */}
          <div className="lg:col-span-2">
            <IntentionSelector />
          </div>
        </div>
      </div>
    </div>
  )
}
