"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Leaf, Users, Shield, Target } from "lucide-react"

export default function ESGDashboard() {
  const esgMetrics = {
    environmental: {
      score: 78,
      trend: "up",
      metrics: [
        { name: "Émissions CO2", value: "2.3t/kg", target: "2.0t/kg", progress: 85 },
        { name: "Consommation d'eau", value: "15L/kg", target: "12L/kg", progress: 72 },
        { name: "Déchets recyclés", value: "89%", target: "95%", progress: 94 },
        { name: "Zones restaurées", value: "45ha", target: "60ha", progress: 75 },
      ],
    },
    social: {
      score: 85,
      trend: "up",
      metrics: [
        { name: "Emplois locaux", value: "2,450", target: "2,800", progress: 88 },
        { name: "Formation professionnelle", value: "340h", target: "400h", progress: 85 },
        { name: "Sécurité (accidents)", value: "0.8/1000", target: "0.5/1000", progress: 60 },
        { name: "Égalité hommes/femmes", value: "42%", target: "50%", progress: 84 },
      ],
    },
    governance: {
      score: 92,
      trend: "stable",
      metrics: [
        { name: "Transparence", value: "94%", target: "95%", progress: 99 },
        { name: "Conformité réglementaire", value: "98%", target: "100%", progress: 98 },
        { name: "Audits externes", value: "12/12", target: "12/12", progress: 100 },
        { name: "Lutte anti-corruption", value: "96%", target: "100%", progress: 96 },
      ],
    },
  }

  const regionalComparison = [
    { region: "Katanga", environmental: 82, social: 88, governance: 94, overall: 88 },
    { region: "Haut-Katanga", environmental: 75, social: 82, governance: 90, overall: 82 },
    { region: "Sud-Kivu", environmental: 71, social: 79, governance: 89, overall: 80 },
    { region: "Nord-Kivu", environmental: 68, social: 76, governance: 85, overall: 76 },
  ]

  const dx2025Objectives = [
    { objective: "Réduction émissions -30%", progress: 65, deadline: "2025" },
    { objective: "100% traçabilité", progress: 94, deadline: "2024" },
    { objective: "Emploi local +40%", progress: 78, deadline: "2025" },
    { objective: "Zéro travail des enfants", progress: 96, deadline: "2024" },
  ]

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : trend === "down" ? (
      <TrendingDown className="h-4 w-4 text-red-600" />
    ) : (
      <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">Tableaux de Bord ESG et KPI</h2>
        <p className="text-gray-600 mt-2">Indicateurs de performance environnementale, sociale et de gouvernance</p>
      </div>

      {/* Overall ESG Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">Environnemental</CardTitle>
              </div>
              {getTrendIcon(esgMetrics.environmental.trend)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(esgMetrics.environmental.score)}`}>
                {esgMetrics.environmental.score}
              </div>
              <div className="text-sm text-gray-600">Score ESG</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Social</CardTitle>
              </div>
              {getTrendIcon(esgMetrics.social.trend)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(esgMetrics.social.score)}`}>
                {esgMetrics.social.score}
              </div>
              <div className="text-sm text-gray-600">Score ESG</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg">Gouvernance</CardTitle>
              </div>
              {getTrendIcon(esgMetrics.governance.trend)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(esgMetrics.governance.score)}`}>
                {esgMetrics.governance.score}
              </div>
              <div className="text-sm text-gray-600">Score ESG</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="detailed" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="detailed">Métriques Détaillées</TabsTrigger>
          <TabsTrigger value="regional">Comparaison Régionale</TabsTrigger>
          <TabsTrigger value="objectives">Objectifs DX 2025</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="detailed" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Environmental Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Indicateurs Environnementaux
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {esgMetrics.environmental.metrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{metric.name}</span>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={metric.progress} className="flex-1" />
                      <span className="text-xs text-gray-500">Cible: {metric.target}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Indicateurs Sociaux
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {esgMetrics.social.metrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{metric.name}</span>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={metric.progress} className="flex-1" />
                      <span className="text-xs text-gray-500">Cible: {metric.target}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Governance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  Indicateurs de Gouvernance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {esgMetrics.governance.metrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{metric.name}</span>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={metric.progress} className="flex-1" />
                      <span className="text-xs text-gray-500">Cible: {metric.target}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparaison Inter-Régions</CardTitle>
              <CardDescription>Performance ESG par région minière</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regionalComparison.map((region, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">{region.region}</h3>
                      <Badge
                        className={
                          getScoreColor(region.overall).includes("green")
                            ? "bg-green-100 text-green-800"
                            : getScoreColor(region.overall).includes("yellow")
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        Score global: {region.overall}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Environnemental</div>
                        <div className="flex items-center gap-2">
                          <Progress value={region.environmental} className="flex-1" />
                          <span className="text-sm font-medium">{region.environmental}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Social</div>
                        <div className="flex items-center gap-2">
                          <Progress value={region.social} className="flex-1" />
                          <span className="text-sm font-medium">{region.social}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Gouvernance</div>
                        <div className="flex items-center gap-2">
                          <Progress value={region.governance} className="flex-1" />
                          <span className="text-sm font-medium">{region.governance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objectives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Objectifs DX 2025 & Agenda 2063
              </CardTitle>
              <CardDescription>Suivi des progrès vers les objectifs de développement durable</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dx2025Objectives.map((objective, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{objective.objective}</h3>
                      <Badge variant="outline">Échéance: {objective.deadline}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={objective.progress} className="flex-1" />
                      <span className="text-sm font-medium">{objective.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Benchmarks Internationaux</CardTitle>
              <CardDescription>Comparaison avec les standards internationaux du secteur minier</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Standards Internationaux</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">OECD Due Diligence</span>
                      <Badge className="bg-green-100 text-green-800">Conforme</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">ITSCI Standards</span>
                      <Badge className="bg-green-100 text-green-800">Conforme</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">RMI Responsible Minerals</span>
                      <Badge className="bg-yellow-100 text-yellow-800">En cours</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Fairtrade Mining</span>
                      <Badge className="bg-green-100 text-green-800">Certifié</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Comparaison Régionale</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Moyenne Afrique Centrale</span>
                      <span className="text-sm font-medium">Score: 72</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Notre Performance</span>
                      <span className="text-sm font-medium text-green-600">Score: 85</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Meilleure Pratique Mondiale</span>
                      <span className="text-sm font-medium">Score: 94</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
