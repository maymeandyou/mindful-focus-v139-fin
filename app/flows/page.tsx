import GuidedFlowSystem from "@/components/guided-flow-system"
import PageHeader from "@/components/page-header"

export default function FlowsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-950">
      <PageHeader title="Guided Flows" subtitle="Step-by-step wellness practices" />
      <GuidedFlowSystem />
    </div>
  )
}
