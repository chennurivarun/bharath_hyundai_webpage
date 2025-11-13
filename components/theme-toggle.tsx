"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full hover:bg-white/10 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 ring-white/40 dark:ring-white/40 transition-all"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5 text-white dark:text-white" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-10 w-10 rounded-full hover:bg-white/10 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 ring-white/40 dark:ring-white/40 transition-all hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-white transition-all" />
      ) : (
        <Moon className="h-5 w-5 text-white transition-all" />
      )}
    </Button>
  )
}

