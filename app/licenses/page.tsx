"use client"

import { useState } from "react"
import { CopyrightIcon as License } from "lucide-react"
import { ComplianceScore } from "@/components/compliance-score"
import { DataTable } from "@/components/data-table"
import { StatCard } from "@/components/ui/stat-card"
import DashboardLayout from "../dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock data for the licenses page
const mockLicenses = [
  {
    id: "ML-2025-001",
    miner: "Cobalt Extraction Co.",
    country: "DRC",
    issuedDate: "2023-01-15",
    expiryDate: "2028-01-15",
    status: "Active",
    complianceScore: 92,
    certifications: ["ISO 14001", "Fair Mining"],
  },
  {
    id: "ML-2025-002",
    miner: "Namibia Minerals Ltd.",
    country: "Namibia",
    issuedDate: "2023-03-22",
    expiryDate: "2028-03-22",
    status: "Active",
    complianceScore: 88,
    certifications: ["ISO 14001", "OHSAS 18001"],
  },
  {
    id: "ML-2025-003",
    miner: "Zambia Copper Inc.",
    country: "Zambia",
    issuedDate: "2023-05-10",
    expiryDate: "2028-05-10",
    status: "Active",
    complianceScore: 85,
    certifications: ["Fair Mining"],
  },
  {
    id: "ML-2025-004",
    miner: "Angola Diamond Co.",
    country: "Angola",
    issuedDate: "2023-07-05",
    expiryDate: "2028-07-05",
    status: "Active",
    complianceScore: 79,
    certifications: ["ISO 14001"],
  },
  {
    id: "ML-2025-005",
    miner: "Eastern Cobalt Ltd.",
    country: "DRC",
    issuedDate: "2023-09-18",
    expiryDate: "2028-09-18",
    status: "Suspended",
    complianceScore: 45,
    certifications: [],
  },
  {
    id: "ML-2025-006",
    miner: "Katanga Mining Corp.",
    country: "DRC",
    issuedDate: "2023-11-30",
    expiryDate: "2028-11-30",
    status: "Active",
    complianceScore: 82,
    certifications: ["Fair Mining", "OHSAS 18001"],
  },
  {
    id: "ML-2025-007",
    miner: "Namibia Gold Extraction",
    country: "Namibia",
    issuedDate: "2024-01-25",
    expiryDate: "2029-01-25",
    status: "Active",
    complianceScore: 90,
    certifications: ["ISO 14001", "Fair Mining"],
  },
  {
    id: "ML-2025-008",
    miner: "Copperbelt Minerals",
    country: "Zambia",
    issuedDate: "2024-03-12",
    expiryDate: "2029-03-12",
    status: "Active",
    complianceScore: 87,
    certifications: ["ISO 14001"],
  },
]

export default function LicensesPage() {
  const [licenses] = useState(mockLicenses)

  const columns = [
    {
      accessorKey: "id",
      header: "License ID",
    },
    {
      accessorKey: "miner",
      header: "Mining Company",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "issuedDate",
      header: "Issued Date",
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry Date",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return <Badge variant={status === "Active" ? "outline" : "destructive"}>{status}</Badge>
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
      accessorKey: "certifications",
      header: "Certifications",
      cell: ({ row }) => {
        const certifications = row.getValue("certifications") as string[]
        return (
          <div className="flex flex-wrap gap-1">
            {certifications.map((cert) => (
              <Badge key={cert} variant="secondary" className="text-xs">
                {cert}
              </Badge>
            ))}
          </div>
        )
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
  const totalLicenses = licenses.length
  const activeLicenses = licenses.filter((l) => l.status === "Active").length
  const suspendedLicenses = licenses.filter((l) => l.status === "Suspended").length
  const avgComplianceScore = Math.round(licenses.reduce((sum, l) => sum + l.complianceScore, 0) / totalLicenses)

  return (
    <DashboardLayout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Mining Licenses</h1>
          <Button>Issue New License</Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <StatCard title="Total Licenses" value={totalLicenses} icon={<License className="h-4 w-4" />} />
          <StatCard
            title="Active Licenses"
            value={activeLicenses}
            description={`${Math.round((activeLicenses / totalLicenses) * 100)}% of total`}
          />
          <StatCard
            title="Suspended Licenses"
            value={suspendedLicenses}
            description={`${Math.round((suspendedLicenses / totalLicenses) * 100)}% of total`}
          />
          <StatCard title="Avg. Compliance Score" value={`${avgComplianceScore}%`} />
        </div>

        <DataTable columns={columns} data={licenses} searchKey="miner" title="Mining License Registry" />
      </div>
    </DashboardLayout>
  )
}
