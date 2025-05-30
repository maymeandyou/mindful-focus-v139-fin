"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Sun, Moon, Cloud } from "lucide-react"

export default function WelcomeHeader() {
  const [greeting, setGreeting] = useState("")
  const [timeIcon, setTimeIcon] = useState<React.ReactNode>(null)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting("Good morning")
      setTimeIcon(<Sun className="w-5 h-5" style={{ color: "#4a4a4a" }} />)
    } else if (hour < 17) {
      setGreeting("Good afternoon")
      setTimeIcon(<Cloud className="w-5 h-5" style={{ color: "#4a4a4a" }} />)
    } else {
      setGreeting("Good evening")
      setTimeIcon(<Moon className="w-5 h-5" style={{ color: "#4a4a4a" }} />)
    }
  }, [])

  return (
    <div className="header-container" style={{ backgroundColor: "#DDE5D4", borderBottom: "1px solid #d1d9c6" }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <span className="mr-6">{timeIcon}</span>
            <h1 className="secondary-title">{greeting}</h1>
          </div>
          <p className="body-text">Let's begin with calm and intention</p>
        </div>
      </div>
    </div>
  )
}
