"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, Heart, Calendar, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import SideNavigation from "./side-navigation"

export default function BottomNavigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Daily", href: "/daily-routine", icon: Calendar },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Affirmations", href: "/affirmations", icon: Heart },
    { name: "More", icon: Menu, action: () => setIsOpen(true) },
  ]

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white z-50" style={{ borderTop: "1px solid #DDE5D4" }}>
        <div className="flex justify-around items-center h-16">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href

            if (item.action) {
              return (
                <Sheet key={item.name} open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <button className="flex flex-col items-center justify-center w-full h-full" onClick={item.action}>
                      <item.icon className={cn("h-5 w-5", isActive ? "text-gray-800" : "text-gray-500")} />
                      <span className="form-text mt-1">{item.name}</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-64 p-0">
                    <SideNavigation />
                  </SheetContent>
                </Sheet>
              )
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center w-full h-full"
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-gray-800" : "text-gray-500")} />
                <span className={cn("form-text mt-1", isActive ? "text-gray-800" : "text-gray-500")}>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
