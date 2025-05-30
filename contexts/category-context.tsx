"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface GuidedFlowState {
  isOpen: boolean
  suggestion: any | null
  theme: string | null
  category: string | null
}

interface CategoryContextType {
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  selectedTheme: string | null
  setSelectedTheme: (theme: string | null) => void
  guidedFlow: GuidedFlowState
  setGuidedFlow: (state: GuidedFlowState) => void
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [guidedFlow, setGuidedFlow] = useState<GuidedFlowState>({
    isOpen: false,
    suggestion: null,
    theme: null,
    category: null,
  })

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedTheme,
        setSelectedTheme,
        guidedFlow,
        setGuidedFlow,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategoryContext() {
  const context = useContext(CategoryContext)
  if (context === undefined) {
    throw new Error("useCategoryContext must be used within a CategoryProvider")
  }
  return context
}
