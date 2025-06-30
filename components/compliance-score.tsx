"use client"

import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

interface ComplianceScoreProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

const scoreVariants = cva("rounded-full flex items-center justify-center font-bold text-white", {
  variants: {
    size: {
      sm: "h-8 w-8 text-xs",
      md: "h-12 w-12 text-sm",
      lg: "h-24 w-24 text-2xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export function ComplianceScore({ score, size = "md", showLabel = false, className }: ComplianceScoreProps) {
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-emerald-500"
    if (score >= 75) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    if (score >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent"
    if (score >= 75) return "Good"
    if (score >= 60) return "Fair"
    if (score >= 40) return "Poor"
    return "Critical"
  }

  return (
    <div className="flex flex-col items-center">
      <div className={cn(scoreVariants({ size }), getScoreColor(score), className)}>{score}</div>
      {showLabel && <span className="mt-2 text-sm font-medium">{getScoreLabel(score)}</span>}
    </div>
  )
}
