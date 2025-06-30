"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ComplianceChartProps {
  title: string
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: string
    }[]
  }
  type?: "line" | "bar"
  className?: string
}

export function ComplianceChart({ title, data, type = "line", className }: ComplianceChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<any>(null)

  useEffect(() => {
    // This is where we would normally initialize a chart library
    // For this example, we'll just simulate it
    const ctx = chartRef.current?.getContext("2d")
    if (ctx) {
      // In a real implementation, we would use a chart library like Chart.js
      // chartInstance.current = new Chart(ctx, {
      //   type,
      //   data,
      //   options: { ... }
      // })

      // Cleanup function
      return () => {
        // if (chartInstance.current) {
        //   chartInstance.current.destroy()
        // }
      }
    }
  }, [data, type])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="30days">
          <TabsList className="mb-4">
            <TabsTrigger value="7days">7 days</TabsTrigger>
            <TabsTrigger value="30days">30 days</TabsTrigger>
            <TabsTrigger value="90days">90 days</TabsTrigger>
            <TabsTrigger value="1year">1 year</TabsTrigger>
          </TabsList>
          <TabsContent value="7days">
            <div className="h-[300px] w-full">
              <canvas ref={chartRef} />
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Chart visualization would appear here</p>
                  <p className="text-sm">Showing data for last 7 days</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="30days">
            <div className="h-[300px] w-full">
              <canvas ref={chartRef} />
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Chart visualization would appear here</p>
                  <p className="text-sm">Showing data for last 30 days</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="90days">
            <div className="h-[300px] w-full">
              <canvas ref={chartRef} />
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Chart visualization would appear here</p>
                  <p className="text-sm">Showing data for last 90 days</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="1year">
            <div className="h-[300px] w-full">
              <canvas ref={chartRef} />
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Chart visualization would appear here</p>
                  <p className="text-sm">Showing data for last year</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
