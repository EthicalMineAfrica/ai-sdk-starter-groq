"use client"

import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Alert {
  id: string
  title: string
  message: string
  severity: "critical" | "warning" | "info"
  timestamp: string
  resolved: boolean
}

interface ComplianceAlertsProps {
  alerts: Alert[]
  className?: string
}

export function ComplianceAlerts({ alerts, className }: ComplianceAlertsProps) {
  const getSeverityIcon = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <CheckCircle2 className="h-5 w-5 text-blue-500" />
    }
  }

  const getSeverityClass = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return "border-l-4 border-red-500"
      case "warning":
        return "border-l-4 border-yellow-500"
      case "info":
        return "border-l-4 border-blue-500"
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Compliance Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
              <p className="text-sm text-muted-foreground">No alerts found</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "rounded-md border bg-card p-4",
                  getSeverityClass(alert.severity),
                  alert.resolved && "opacity-60",
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(alert.severity)}
                    <div>
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{alert.timestamp}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
