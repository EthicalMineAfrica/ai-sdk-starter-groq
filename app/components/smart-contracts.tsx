"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Zap, CheckCircle, AlertTriangle, XCircle, Code, Shield, DollarSign } from "lucide-react"

export default function SmartContracts() {
  const [contracts] = useState([
    {
      id: "SC-EXTRACT-001",
      type: "Extraction",
      cooperative: "Coop Minière du Sud",
      status: "active",
      license: "LIC-2024-001",
      quota: { used: 8500, limit: 10000 },
      compliance: 98,
      lastExecution: "2024-01-17 14:30",
    },
    {
      id: "SC-TRANSPORT-002",
      type: "Transport",
      cooperative: "Union des Mineurs",
      status: "active",
      license: "LIC-2024-002",
      quota: { used: 6200, limit: 8000 },
      compliance: 95,
      lastExecution: "2024-01-17 12:15",
    },
    {
      id: "SC-SALE-003",
      type: "Vente",
      cooperative: "Coop Minière Est",
      status: "warning",
      license: "LIC-2024-003",
      quota: { used: 7800, limit: 7500 },
      compliance: 87,
      lastExecution: "2024-01-17 09:45",
    },
  ])

  const [validationRules] = useState([
    {
      rule: "Licence coopérative active",
      description: "Vérification automatique de la validité de la licence",
      status: "active",
      violations: 0,
    },
    {
      rule: "Respect des quotas de production",
      description: "Contrôle des limites mensuelles et annuelles",
      status: "active",
      violations: 2,
    },
    {
      rule: "Paiement des redevances",
      description: "Vérification des taxes et royalties",
      status: "active",
      violations: 1,
    },
    {
      rule: "Certifications ESG",
      description: "Validation des certifications environnementales",
      status: "active",
      violations: 0,
    },
  ])

  const [penalties] = useState([
    {
      id: "PEN-2024-001",
      cooperative: "Coop Minière Est",
      violation: "Dépassement quota mensuel",
      penalty: "Blocage temporaire des ventes",
      amount: "€5,000",
      status: "applied",
      date: "2024-01-16",
    },
    {
      id: "PEN-2024-002",
      cooperative: "Union des Mineurs",
      violation: "Retard paiement redevances",
      penalty: "Amende automatique",
      amount: "€2,500",
      status: "paid",
      date: "2024-01-14",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "blocked":
        return "bg-red-100 text-red-800"
      case "applied":
        return "bg-red-100 text-red-800"
      case "paid":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "blocked":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Smart Contracts de Conformité</h2>
          <p className="text-gray-600">Contrats intelligents modulaires pour la validation automatique</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Code className="h-4 w-4 mr-2" />
            Déployer Contrat
          </Button>
          <Button variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Audit Sécurité
          </Button>
        </div>
      </div>

      {/* Contract Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contrats Actifs</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-blue-600 mt-2">Tous opérationnels</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Validations/jour</p>
                <p className="text-2xl font-bold">847</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+15% vs hier</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Violations détectées</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-xs text-yellow-600 mt-2">Cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pénalités appliquées</p>
                <p className="text-2xl font-bold">€7.5K</p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs text-red-600 mt-2">Ce mois</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contracts">Contrats Actifs</TabsTrigger>
          <TabsTrigger value="rules">Règles de Validation</TabsTrigger>
          <TabsTrigger value="penalties">Pénalités</TabsTrigger>
          <TabsTrigger value="deployment">Déploiement</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contrats Intelligents Déployés</CardTitle>
              <CardDescription>Surveillance en temps réel des contrats de conformité</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Contrat</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Coopérative</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Licence</TableHead>
                    <TableHead>Quota</TableHead>
                    <TableHead>Conformité</TableHead>
                    <TableHead>Dernière Exécution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{contract.type}</Badge>
                      </TableCell>
                      <TableCell>{contract.cooperative}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(contract.status)}
                          <Badge className={getStatusColor(contract.status)}>{contract.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>{contract.license}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{contract.quota.used.toLocaleString()}</span>
                            <span>{contract.quota.limit.toLocaleString()}</span>
                          </div>
                          <Progress value={(contract.quota.used / contract.quota.limit) * 100} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                contract.compliance >= 95
                                  ? "bg-green-600"
                                  : contract.compliance >= 85
                                    ? "bg-yellow-600"
                                    : "bg-red-600"
                              }`}
                              style={{ width: `${contract.compliance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{contract.compliance}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{contract.lastExecution}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Règles de Validation Automatique</CardTitle>
              <CardDescription>Configuration des contrôles de conformité intégrés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {validationRules.map((rule, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(rule.status)}
                        <div>
                          <h3 className="font-medium">{rule.rule}</h3>
                          <p className="text-sm text-gray-600">{rule.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(rule.status)}>
                          {rule.status === "active" ? "Actif" : "Inactif"}
                        </Badge>
                        {rule.violations > 0 && (
                          <p className="text-xs text-red-600 mt-1">{rule.violations} violation(s) détectée(s)</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="penalties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pénalités et Blocages Automatiques</CardTitle>
              <CardDescription>Exécution automatique des sanctions en cas de non-conformité</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pénalité</TableHead>
                    <TableHead>Coopérative</TableHead>
                    <TableHead>Violation</TableHead>
                    <TableHead>Pénalité</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {penalties.map((penalty) => (
                    <TableRow key={penalty.id}>
                      <TableCell className="font-medium">{penalty.id}</TableCell>
                      <TableCell>{penalty.cooperative}</TableCell>
                      <TableCell>{penalty.violation}</TableCell>
                      <TableCell>{penalty.penalty}</TableCell>
                      <TableCell className="font-medium">{penalty.amount}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(penalty.status)}>
                          {penalty.status === "applied"
                            ? "Appliquée"
                            : penalty.status === "paid"
                              ? "Payée"
                              : penalty.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{penalty.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Déploiement de Nouveaux Contrats</CardTitle>
              <CardDescription>Interface pour créer et déployer de nouveaux smart contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Contrat d'Extraction</h3>
                  <p className="text-sm text-gray-600 mb-4">Validation des licences et quotas d'extraction</p>
                  <Button variant="outline" className="w-full">
                    Déployer
                  </Button>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Contrat de Transport</h3>
                  <p className="text-sm text-gray-600 mb-4">Traçabilité et conformité du transport</p>
                  <Button variant="outline" className="w-full">
                    Déployer
                  </Button>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Contrat de Vente</h3>
                  <p className="text-sm text-gray-600 mb-4">Validation des ventes et paiement des taxes</p>
                  <Button variant="outline" className="w-full">
                    Déployer
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
