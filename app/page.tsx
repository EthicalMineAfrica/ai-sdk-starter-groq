import { Leaf, CopyrightIcon as License, Link, Users } from "lucide-react"
import { ComplianceAlerts } from "@/components/compliance-alerts"
import { ComplianceChart } from "@/components/compliance-chart"
import { ComplianceScore } from "@/components/compliance-score"
import { StatCard } from "@/components/ui/stat-card"
import DashboardLayout from "./dashboard-layout"

// Mock data for the dashboard
const mockAlerts = [
  {
    id: "1",
    title: "Environmental Compliance Alert",
    message: "Water usage exceeded threshold at DRC Mining Site #12",
    severity: "critical" as const,
    timestamp: "2 hours ago",
    resolved: false,
  },
  {
    id: "2",
    title: "Labor Compliance Warning",
    message: "Safety training certificates expiring in 7 days",
    severity: "warning" as const,
    timestamp: "1 day ago",
    resolved: false,
  },
  {
    id: "3",
    title: "License Renewal",
    message: "Mining license for Zambia Site #8 renewed successfully",
    severity: "info" as const,
    timestamp: "3 days ago",
    resolved: true,
  },
]

const mockChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Overall Compliance",
      data: [65, 72, 78, 75, 82, 88],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
    },
  ],
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Compliance Dashboard</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Last updated: June 10, 2025, 3:46 PM</span>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="flex flex-col items-center">
            <ComplianceScore score={88} size="lg" showLabel />
            <h2 className="mt-2 text-lg font-semibold">Overall Compliance</h2>
          </div>

          <div className="grid flex-1 grid-cols-4 gap-4">
            <StatCard
              title="Mining Licenses"
              value="87%"
              icon={<License className="h-4 w-4" />}
              trend={{ value: 5, isPositive: true }}
            />
            <StatCard
              title="Environmental"
              value="92%"
              icon={<Leaf className="h-4 w-4" />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Labor Rights"
              value="79%"
              icon={<Users className="h-4 w-4" />}
              trend={{ value: 2, isPositive: false }}
            />
            <StatCard
              title="Supply Chain"
              value="94%"
              icon={<Link className="h-4 w-4" />}
              trend={{ value: 6, isPositive: true }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <ComplianceChart title="Compliance Trend" data={mockChartData} className="col-span-2" />
          <ComplianceAlerts alerts={mockAlerts} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Mining Sites Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="DRC Sites" value="12/15" description="Sites meeting compliance" />
              <StatCard title="Namibia Sites" value="8/8" description="Sites meeting compliance" />
              <StatCard title="Zambia Sites" value="6/7" description="Sites meeting compliance" />
              <StatCard title="Angola Sites" value="4/5" description="Sites meeting compliance" />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Mineral Batches</h2>
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Total Batches" value="1,248" description="Tracked in blockchain" />
              <StatCard title="Verified Batches" value="1,187" description="Fully compliant" />
              <StatCard title="Pending Verification" value="42" description="Awaiting verification" />
              <StatCard title="Rejected Batches" value="19" description="Failed compliance checks" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
