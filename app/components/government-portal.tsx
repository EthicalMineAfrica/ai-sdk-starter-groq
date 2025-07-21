"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Download, Mail, Bell, TrendingUp, MapPin } from "lucide-react"

export default function GovernmentPortal() {
  const [alerts] = useState([
    {
      id: 1,
      type: "compliance",
      severity: "high",
      message: "Lot MIN-2024-045 non certifié détecté",
      cooperative: "Coop Minière Est",
      region: "Katanga",
      timestamp: "2024-01-17 14:30",
    },
    {
      id: 2,
      type: "quota",
      severity: "medium",
      message: "Quota mensuel dépassé de 15%",
      cooperative: "Union des Mineurs",
      region: "Haut-Katanga",
      timestamp: "2024-01-17 12:15",
    },
    {
      id: 3,
      type: "tax",
      severity: "low",
      message: "Retard de paiement de redevances",
      cooperative: "Coop du Nord",
      region: "Nord-Kivu",
      timestamp: "2024-01-17 09:45",
    },
  ])

  const [cooperatives] = useState([
    {
      name: "Coop Minière du Sud",
      region: "Katanga",
      license: "LIC-2024-001",
      status: "active",
      compliance: 98.5,
      production: 12500,
      taxes: 45000,
    },
    {
      name: "Union des Mineurs",
      region: "Haut-Katanga",
      license: "LIC-2024-002",
      status: "active",
      compliance: 95.2,
      production: 8900,
      taxes: 32000,
    },
    {
      name: "Coop Minière Est",
      region: "Sud-Kivu",
      license: "LIC-2024-003",
      status: "warning",
      compliance: 87.3,
      production: 6700,
      taxes: 28000,
    },
  ])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Portail Gouvernemental</h2>
          <p className="text-gray-600">Tableau de bord de surveillance et de conformité</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Configurer Alertes
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Réglementaire
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Coopératives Actives</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+3 ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taux de Conformité</p>
                <p className="text-2xl font-bold">94.2%</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Bon</Badge>
            </div>
            <p className="text-xs text-green-600 mt-2">+2.1% vs mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenus Fiscaux (M€)</p>
                <p className="text-2xl font-bold">2.4</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-blue-600 mt-2">Ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alertes Actives</p>
                <p className="text-2xl font-bold">{alerts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-xs text-yellow-600 mt-2">Nécessite attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">Alertes de Conformité</TabsTrigger>
          <TabsTrigger value="cooperatives">Coopératives</TabsTrigger>
          <TabsTrigger value="regions">Analyse Régionale</TabsTrigger>
          <TabsTrigger value="exports">Exports Réglementaires</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alertes Automatisées
              </CardTitle>
              <CardDescription>Surveillance en temps réel des ruptures de conformité</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-gray-600">
                          {alert.cooperative} • {alert.region} • {alert.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                      <Button size="sm" variant="outline">
                        Traiter
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cooperatives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Surveillance des Coopératives</CardTitle>
              <CardDescription>Filtres par coopérative, région et type de minerai</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Label htmlFor="region-filter">Région</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les régions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="katanga">Katanga</SelectItem>
                      <SelectItem value="haut-katanga">Haut-Katanga</SelectItem>
                      <SelectItem value="sud-kivu">Sud-Kivu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="mineral-filter">Type de Minerai</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les minerais" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="cobalt">Cobalt</SelectItem>
                      <SelectItem value="copper">Cuivre</SelectItem>
                      <SelectItem value="gold">Or</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="status-filter">Statut</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="warning">Avertissement</SelectItem>
                      <SelectItem value="suspended">Suspendu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Coopérative</TableHead>
                    <TableHead>Région</TableHead>
                    <TableHead>Licence</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Conformité</TableHead>
                    <TableHead>Production (kg)</TableHead>
                    <TableHead>Taxes (€)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cooperatives.map((coop, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{coop.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {coop.region}
                        </div>
                      </TableCell>
                      <TableCell>{coop.license}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(coop.status)}>{coop.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${coop.compliance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{coop.compliance}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{coop.production.toLocaleString()}</TableCell>
                      <TableCell>{coop.taxes.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse Régionale</CardTitle>
              <CardDescription>Performance par région et comparatifs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Katanga</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Production</span>
                      <span className="text-sm font-medium">45,200 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Conformité</span>
                      <span className="text-sm font-medium">96.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Coopératives</span>
                      <span className="text-sm font-medium">18</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Haut-Katanga</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Production</span>
                      <span className="text-sm font-medium">32,100 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Conformité</span>
                      <span className="text-sm font-medium">94.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Coopératives</span>
                      <span className="text-sm font-medium">15</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Sud-Kivu</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Production</span>
                      <span className="text-sm font-medium">28,900 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Conformité</span>
                      <span className="text-sm font-medium">89.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Coopératives</span>
                      <span className="text-sm font-medium">12</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exports Réglementaires</CardTitle>
              <CardDescription>Formats calibrés pour les bases de données ministérielles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <h3 className="font-semibold mb-2">Format CSV</h3>
                  <p className="text-sm text-gray-600 mb-4">Compatible avec Excel et systèmes legacy</p>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger CSV
                  </Button>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <h3 className="font-semibold mb-2">Format JSON</h3>
                  <p className="text-sm text-gray-600 mb-4">Pour intégrations API modernes</p>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger JSON
                  </Button>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <h3 className="font-semibold mb-2">Format XML</h3>
                  <p className="text-sm text-gray-600 mb-4">Compatible SIGEF/Douanes</p>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger XML
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
