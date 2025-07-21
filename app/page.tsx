"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Eye, BarChart3, FileText, Gavel, Globe, Zap } from "lucide-react"
import GovernmentPortal from "./components/government-portal"
import CitizenPortal from "./components/citizen-portal"
import TransactionRegistry from "./components/transaction-registry"
import ESGDashboard from "./components/esg-dashboard"
import SmartContracts from "./components/smart-contracts"
import OpenDataAPI from "./components/open-data-api"
import AuditModule from "./components/audit-module"
import FiscalIntegration from "./components/fiscal-integration"

export default function MineralTraceabilitySystem() {
  const [activeModule, setActiveModule] = useState("overview")

  const modules = [
    {
      id: "registry",
      title: "Registre des Transactions",
      description: "Enregistrement immutable des lots de minerais",
      icon: FileText,
      component: TransactionRegistry,
    },
    {
      id: "government",
      title: "Portail Gouvernemental",
      description: "Tableau de bord pour les autorités",
      icon: Shield,
      component: GovernmentPortal,
    },
    {
      id: "contracts",
      title: "Smart Contracts",
      description: "Contrats intelligents de conformité",
      icon: Zap,
      component: SmartContracts,
    },
    {
      id: "opendata",
      title: "Données Ouvertes",
      description: "API publique et métriques",
      icon: Globe,
      component: OpenDataAPI,
    },
    {
      id: "citizen",
      title: "Vérification Citoyenne",
      description: "Portail public de transparence",
      icon: Eye,
      component: CitizenPortal,
    },
    {
      id: "fiscal",
      title: "Intégration Fiscale",
      description: "Interface douanière et facturation",
      icon: Users,
      component: FiscalIntegration,
    },
    {
      id: "audit",
      title: "Gouvernance & Audit",
      description: "Journal de preuve d'audit",
      icon: Gavel,
      component: AuditModule,
    },
    {
      id: "esg",
      title: "Tableaux de Bord ESG",
      description: "KPI et indicateurs de performance",
      icon: BarChart3,
      component: ESGDashboard,
    },
  ]

  if (activeModule !== "overview") {
    const module = modules.find((m) => m.id === activeModule)
    if (module) {
      const Component = module.component
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="border-b bg-white">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" onClick={() => setActiveModule("overview")}>
                    ← Retour
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold">{module.title}</h1>
                    <p className="text-gray-600">{module.description}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Blockchain Actif
                </Badge>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            <Component />
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Système de Traçabilité Minière</h1>
              <p className="text-gray-600 mt-2">Plateforme blockchain pour la gouvernance des ressources minières</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Blockchain Actif
              </Badge>
              <Badge variant="outline">DX 2025 • Agenda 2063</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* System Overview */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Vue d'ensemble du système</CardTitle>
              <CardDescription>
                Plateforme intégrée de traçabilité blockchain pour la gouvernance minière transparente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-gray-600">Lots enregistrés</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">98.5%</div>
                  <div className="text-sm text-gray-600">Taux de conformité</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">45</div>
                  <div className="text-sm text-gray-600">Coopératives actives</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <Card
                key={module.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveModule(module.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{module.description}</CardDescription>
                  <Button variant="outline" className="w-full mt-4">
                    Accéder au module
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques en temps réel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-gray-600">Transactions aujourd'hui</div>
                  <div className="text-2xl font-bold">127</div>
                  <div className="text-xs text-green-600">+12% vs hier</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-gray-600">Alertes de conformité</div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs text-red-600">Nécessite attention</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-gray-600">Audits en cours</div>
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-xs text-blue-600">5 régions</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-gray-600">Revenus fiscaux (M€)</div>
                  <div className="text-2xl font-bold">2.4</div>
                  <div className="text-xs text-green-600">Ce mois</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
