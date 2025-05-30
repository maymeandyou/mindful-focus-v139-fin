import PageHeader from "@/components/page-header"
import IntentionGuide from "@/components/intention-guide"

export default function IntentionGuidePage() {
  return (
    <div className="page-transition">
      <PageHeader
        title="Intention Guide"
        subtitle="Explore and discover meaningful intentions for your mindful practice"
        backTo="/intentions"
      />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <IntentionGuide />
      </div>
    </div>
  )
}
