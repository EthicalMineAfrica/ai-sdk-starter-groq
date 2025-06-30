"use client"

import { useState } from "react"
import { Leaf } from "lucide-react"
import { ComplianceChart } from "@/components/compliance-chart"
import { ComplianceScore } from "@/components/compliance-score"
import { DataTable } from "@/components/data-table"
import { StatCard } from "@/components/ui/stat-card"
import DashboardLayout from "../dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Mock data for the environmental page
const mockEnvironmentalData = [
  {
    id: "ENV-2025-001",
    miner: "Cobalt Extraction Co.",
    site: "DRC Site #3",
    carbonFootprint: 850,
    waterUsage: 4200,
    wasteGenerated: 320,
    rehabilitationPlan: true,
    lastAuditDate: "2025-05-15",
    complianceScore: 92,
  },
  {
    id: "ENV-2025-002",
    miner: "Namibia Minerals Ltd.",
    site: "Namibia Site #1",
    carbonFootprint: 720,
    waterUsage: 3800,
    wasteGenerated: 280,
    rehabilitationPlan: true,
    lastAuditDate: "2025-05-12",
    complianceScore: 95,
  },
  {
    id: "ENV-2025-003",
    miner: "Zambia Copper Inc.",
    site: "Zambia Site #2",
    carbonFootprint: 920,
    waterUsage: 4500,
    wasteGenerated: 350,
    rehabilitationPlan: true,
    lastAuditDate: "2025-05-10",
    complianceScore: 88,
  },
  {
    id: "ENV-2025-004",
    miner: "Angola Diamond Co.",
    site: "Angola Site #1",
    carbonFootprint: 780,
    waterUsage: 4100,
    wasteGenerated: 300,
    rehabilitationPlan: true,
    lastAuditDate: "2025-05-08",
    complianceScore: 90,
  },
  {
    id: "ENV-2025-005",
    miner: "Eastern Cobalt Ltd.",
    site: "DRC Site #7",
    carbonFootprint: 1200,
    waterUsage: 5500,
    wasteGenerated: 420,
    rehabilitationPlan: false,
    lastAuditDate: "2025-05-05",
    complianceScore: 65,
  },
]

const mockChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Carbon Footprint",
      data: [950, 920, 880, 860, 840, 820],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
    },
    {
      label: "Water Usage",
      data: [4800, 4700, 4600, 4500, 4300, 4200],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
    },
  ],
}

export default function EnvironmentalPage() {
  const [environmentalData] = useState(mockEnvironmentalData)

  const columns = [
    {
      accessorKey: "miner",
      header: "Mining Company",
    },
    {
      accessorKey: "site",
      header: "Mining Site",
    },
    {
      accessorKey: "carbonFootprint",
      header: "Carbon Footprint",
      cell: ({ row }) => {
        const value = row.getValue("carbonFootprint") as number
        const maxValue = 1000
        const percentage = Math.min(100, (value / maxValue) * 100)

        return (
          <div className="w-full max-w-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs">{value} kg CO₂</span>
              <span className="text-xs">{Math.round(percentage)}%</span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
        )
      },
    },
    {
      accessorKey: "waterUsage",
      header: "Water Usage",
      cell: ({ row }) => {
        const value = row.getValue("waterUsage") as number
        return `${value} L`
      },
    },
    {
      accessorKey: "rehabilitationPlan",
      header: "Rehabilitation Plan",
      cell: ({ row }) => {
        const value = row.getValue("rehabilitationPlan") as boolean
        return <Badge variant={value ? "outline" : "destructive"}>{value ? "In Place" : "Missing"}</Badge>
      },
    },
    {
      accessorKey: "lastAuditDate",
      header: "Last Audit",
    },
    {
      accessorKey: "complianceScore",
      header: "Compliance",
      cell: ({ row }) => {
        const score = row.getValue("complianceScore") as number
        return <ComplianceScore score={score} size="sm" />
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button variant="ghost" size="sm">
            View Details
          </Button>
        )
      },
    },
  ]

  // Calculate statistics
  const avgCarbonFootprint = Math.round(
    environmentalData.reduce((sum, d) => sum + d.carbonFootprint, 0) / environmentalData.length,
  )
  const avgWaterUsage = Math.round(
    environmentalData.reduce((sum, d) => sum + d.waterUsage, 0) / environmentalData.length,
  )
  const sitesWithRehabPlan = environmentalData.filter((d) => d.rehabilitationPlan).length
  const avgComplianceScore = Math.round(
    environmentalData.reduce((sum, d) => sum + d.complianceScore, 0) / environmentalData.length,
  )

  return (
    <DashboardLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Environmental Compliance</h1>
          <Button>Schedule Audit</Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <StatCard
            title="Avg. Carbon Footprint"
            value={`${avgCarbonFootprint} kg`}
            icon={<Leaf className="h-4 w-4" />}
            description="CO₂ per ton of mineral"
          />
          <StatCard title="Avg. Water Usage" value={`${avgWaterUsage} L`} description="Per ton of mineral" />
          <StatCard
            title="Rehabilitation Plans"
            value={`${sitesWithRehabPlan}/${environmentalData.length}`}
            description="Sites with plans in place"
          />
          <StatCard title="Avg. Compliance Score" value={`${avgComplianceScore}%`} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <ComplianceChart title="Environmental Metrics Trend" data={mockChartData} />

          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="Carbon Reduction"
              value="12%"
              description="Year-over-year reduction"
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Water Conservation"
              value="8%"
              description="Year-over-year reduction"
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Waste Reduction"
              value="15%"
              description="Year-over-year reduction"
              trend={{ value: 15, isPositive: true }}
            />
            <StatCard title="Carbon Credits" value="1,250" description="Earned this year" />
          </div>
        </div>

        <DataTable columns={columns} data={environmentalData} searchKey="miner" title="Environmental Audit Records" />
      </div>
    </DashboardLayout>
  )
}
