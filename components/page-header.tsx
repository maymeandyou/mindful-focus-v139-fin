"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  backTo?: string
}

export default function PageHeader({ title, subtitle, backTo }: PageHeaderProps) {
  const router = useRouter()
  const [previousPage, setPreviousPage] = useState<string>("")

  useEffect(() => {
    // Get the previous page from sessionStorage or use backTo
    const prevPage = sessionStorage.getItem("previousPage")
    if (prevPage && !backTo) {
      setPreviousPage(prevPage)
    }

    // Store current page as previous for next navigation
    sessionStorage.setItem("previousPage", window.location.pathname)
  }, [backTo])

  const handleBack = () => {
    if (backTo) {
      router.push(backTo)
    } else if (previousPage) {
      router.push(previousPage)
    } else {
      router.back()
    }
  }

  return (
    <div className="header-container">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="text-[#4a4a4a] hover:text-sage-600 flex items-center"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0" }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <div className="text-center flex-1">
            <h1 className="secondary-title mb-2">{title}</h1>
            {subtitle && <p className="body-text text-sm">{subtitle}</p>}
          </div>
          <div className="w-16"></div> {/* Spacer to center the title */}
        </div>
      </div>
    </div>
  )
}
