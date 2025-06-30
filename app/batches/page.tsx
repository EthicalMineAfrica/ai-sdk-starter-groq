"use client"

import { useState } from "react"
import { Box, FileCheck, Search } from "lucide-react"
import { ComplianceScore } from "@/components/compliance-score"
import { DataTable } from "@/components/data-table"
import { StatCard } from "@/components/ui/stat-card"
import DashboardLayout from "../dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for the batches page
const mockBatches = [
  {
    id: "BATCH-2025-001",
    mineralType: "Cobalt",
    quantity: 5000,
    miner: "Cobalt Extraction Co.",
    origin: "DRC",
    extractionDate: "2025-05-01",
    currentLocation: "Processing Facility",
    ethicallySourced: true,
    complianceScore: 95,
    verificationStatus: "Verified",
  },
  {
    id: "BATCH-2025-002",
    mineralType: "Copper",
    quantity: 8000,
    miner: "Zambia Copper Inc.",
    origin: "Zambia",
    extractionDate: "2025-05-03",
    currentLocation: "Export Terminal",
    ethicallySourced: true,
    complianceScore: 92,
    verificationStatus: "Verified",
  },
  {
    id: "BATCH-2025-003",
    mineralType: "Gold",
    quantity: 200,
    miner: "Namibia Minerals Ltd.",
    origin: "Namibia",
    extractionDate: "2025-05-05",
    currentLocation: "Refinery",
    ethicallySourced: true,
    complianceScore: 90,
    verificationStatus: "Verified",
  },
  {
    id: "BATCH-2025-004",
    mineralType: "Diamond",
    quantity: 50,
    miner: "Angola Diamond Co.",
    origin: "Angola",
    extractionDate: "2025-05-08",
    currentLocation: "Sorting Facility",
    ethicallySourced: true,
    complianceScore: 88,
    verificationStatus: "Verified",
  },
  {
    id: "BATCH-2025-005",
    mineralType: "Cobalt",
    quantity: 3000,
    miner: "Eastern Cobalt Ltd.",
    origin: "DRC",
    extractionDate: "2025-05-10",
    currentLocation: "Processing Facility",
    ethicallySourced: false,
    complianceScore: 65,
    verificationStatus: "Rejected",
  },
  {
    id: "BATCH-2025-006",
    mineralType: "Copper",
    quantity: 6000,
    miner: "Copperbelt Minerals",
    origin: "Zambia",
    extractionDate: "2025-05-12",
    currentLocation: "Mining Site",
    ethicallySourced: true,
    complianceScore: 85,
    verificationStatus: "Pending",
  },
]

export default function BatchesPage() {
  const [batches] = useState(mockBatches)
  const [searchBatchId, setSearchBatchId] = useState("")

  const columns = [
    {
      accessorKey: "id",
      header: "Batch ID",
    },
    {
      accessorKey: "mineralType",
      header: "Mineral",
    },
    {
      accessorKey: "quantity",
      header: "Quantity (kg)",
    },
    {
      accessorKey: "miner",
      header: "Mining Company",
    },
    {
      accessorKey: "origin",
      header: "Origin",
    },
    {
      accessorKey: "currentLocation",
      header: "Current Location",
    },
    {
      accessorKey: "ethicallySourced",
      header: "Ethical Sourcing",
      cell: ({ row }) => {
        const value = row.getValue("ethicallySourced") as boolean
        return <Badge variant={value ? "outline" : "destructive"}>{value ? "Verified" : "Failed"}</Badge>
      },
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
      accessorKey: "verificationStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("verificationStatus") as string
        let variant: "outline" | "secondary" | "destructive" = "outline"

        if (status === "Pending") variant = "secondary"
        if (status === "Rejected") variant = "destructive"

        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button variant="ghost" size="sm">
            View Chain
          </Button>
        )
      },
    },
  ]

  // Calculate statistics
  const totalBatches = batches.length
  const verifiedBatches = batches.filter((b) => b.verificationStatus === "Verified").length
  const pendingBatches = batches.filter((b) => b.verificationStatus === "Pending").length
  const rejectedBatches = batches.filter((b) => b.verificationStatus === "Rejected").length

  return (
    <DashboardLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Mineral Batches</h1>
          <Button>Register New Batch</Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <StatCard title="Total Batches" value={totalBatches} icon={<Box className="h-4 w-4" />} />
          <StatCard
            title="Verified Batches"
            value={verifiedBatches}
            description={`${Math.round((verifiedBatches / totalBatches) * 100)}% of total`}
          />
          <StatCard
            title="Pending Verification"
            value={pendingBatches}
            description={`${Math.round((pendingBatches / totalBatches) * 100)}% of total`}
          />
          <StatCard
            title="Rejected Batches"
            value={rejectedBatches}
            description={`${Math.round((rejectedBatches / totalBatches) * 100)}% of total`}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Batch Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter batch ID or scan QR code..."
                  value={searchBatchId}
                  onChange={(e) => setSearchBatchId(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button>
                <FileCheck className="mr-2 h-4 w-4" />
                Verify Batch
              </Button>
            </div>
          </CardContent>
        </Card>

        <DataTable columns={columns} data={batches} searchKey="id" title="Mineral Batch Registry" />
      </div>
    </DashboardLayout>
  )
}
