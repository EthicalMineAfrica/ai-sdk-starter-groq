"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Globe, Download, Code, Key, BarChart3, RefreshCw } from "lucide-react"

export default function OpenDataAPI() {
  const [apiEndpoints] = useState([
    {
      endpoint: "/api/v1/production/volumes",
      method: "GET",
      description: "Volumes de production par région",
      parameters: "region, mineral_type, date_range",
      rateLimit: "1000/hour",
      status: "active",
    },
    {
      endpoint: "/api/v1/compliance/rates",
      method: "GET",
      description: "Taux de conformité ESG par coopérative",
      parameters: "cooperative_id, metric_type",
      rateLimit: "500/hour",
      status: "active",
    },
    {
      endpoint: "/api/v1/traceability/realtime",
      method: "GET",
      description: "Traçabilité agrégée en temps réel",
      parameters: "batch_id, status",
      rateLimit: "2000/hour",
      status: "active",
    },
    {
      endpoint: "/api/v1/audits/reports",
      method: "GET",
      description: "Rapports d'audit publics",
      parameters: "audit_date, cooperative",
      rateLimit: "200/hour",
      status: "active",
    },
  ])

  const [metrics] = useState([
    {
      region: "Katanga",
      production: "45,200 kg",
      compliance: "96.8%",
      cooperatives: 18,
      lastUpdate: "2024-01-17 15:30",
    },
    {
      region: "Haut-Katanga",
      production: "32,100 kg",
      compliance: "94.2%",
      cooperatives: 15,
      lastUpdate: "2024-01-17 15:30",
    },
    {
      region: "Sud-Kivu",
      production: "28,900 kg",
      compliance: "89.5%",
      cooperatives: 12,
      lastUpdate: "2024-01-17 15:30",
    },
  ])

  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)

  const generateApiKey = () => {
    const key = `mk_${Math.random().toString(36).substr(2, 32)}`
    setApiKey(key)
    setShowApiKey(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "deprecated":
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
          <h2 className="text-2xl font-bold">Publication de Métriques Ouvertes</h2>
          <p className="text-gray-600">API publique en lecture seule pour la transparence des données</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Code className="h-4 w-4 mr-2" />
            Documentation API
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            SDK Python
          </Button>
        </div>
      </div>

      {/* API Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Endpoints Actifs</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-blue-600 mt-2">100% disponibilité</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Requêtes/jour</p>
                <p className="text-2xl font-bold">15.2K</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+23% vs hier</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Utilisateurs API</p>
                <p className="text-2xl font-bold">847</p>
              </div>
              <Key className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-purple-600 mt-2">Développeurs actifs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dernière MAJ</p>
                <p className="text-2xl font-bold">15:30</p>
              </div>
              <RefreshCw className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-orange-600 mt-2">Temps réel</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="endpoints" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="endpoints">Endpoints API</TabsTrigger>
          <TabsTrigger value="data">Données Ouvertes</TabsTrigger>
          <TabsTrigger value="access">Accès API</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Endpoints API Publics</CardTitle>
              <CardDescription>API REST en lecture seule pour accéder aux données de traçabilité</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Méthode</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Paramètres</TableHead>
                    <TableHead>Limite</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiEndpoints.map((endpoint, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">{endpoint.endpoint}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {endpoint.method}
                        </Badge>
                      </TableCell>
                      <TableCell>{endpoint.description}</TableCell>
                      <TableCell className="text-sm text-gray-600">{endpoint.parameters}</TableCell>
                      <TableCell className="text-sm">{endpoint.rateLimit}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(endpoint.status)}>{endpoint.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Données Ouvertes en Temps Réel</CardTitle>
              <CardDescription>Métriques publiques mises à jour quotidiennement ou en push</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Volumes de Production par Région</h3>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exporter CSV
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Région</TableHead>
                      <TableHead>Production (kg)</TableHead>
                      <TableHead>Taux de Conformité</TableHead>
                      <TableHead>Coopératives</TableHead>
                      <TableHead>Dernière MAJ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metrics.map((metric, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{metric.region}</TableCell>
                        <TableCell>{metric.production}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-600 h-2 rounded-full" style={{ width: metric.compliance }}></div>
                            </div>
                            <span className="text-sm">{metric.compliance}</span>
                          </div>
                        </TableCell>
                        <TableCell>{metric.cooperatives}</TableCell>
                        <TableCell className="text-sm text-gray-600">{metric.lastUpdate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exemple de Réponse API</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`{
  "status": "success",
  "data": {
    "region": "Katanga",
    "production": {
      "total_kg": 45200,
      "by_mineral": {
        "cobalt": 28500,
        "copper": 16700
      }
    },
    "compliance_rate": 96.8,
    "cooperatives": 18,
    "last_updated": "2024-01-17T15:30:00Z"
  },
  "meta": {
    "api_version": "1.0",
    "rate_limit": "1000/hour",
    "next_update": "2024-01-18T00:00:00Z"
  }
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accès à l'API</CardTitle>
              <CardDescription>Générez une clé API pour accéder aux données publiques</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Générer une Clé API</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="votre@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="organization">Organisation</Label>
                      <Input id="organization" placeholder="Nom de votre organisation" />
                    </div>
                    <div>
                      <Label htmlFor="usage">Usage prévu</Label>
                      <Input id="usage" placeholder="Recherche, développement, etc." />
                    </div>
                    <Button onClick={generateApiKey} className="w-full">
                      <Key className="h-4 w-4 mr-2" />
                      Générer Clé API
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Limites d'Usage</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium">Accès Public</div>
                      <div className="text-sm text-gray-600">1,000 requêtes/heure</div>
                      <div className="text-sm text-gray-600">Données en lecture seule</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium">Accès Institutionnel</div>
                      <div className="text-sm text-gray-600">10,000 requêtes/heure</div>
                      <div className="text-sm text-gray-600">Support prioritaire</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium">Accès Gouvernemental</div>
                      <div className="text-sm text-gray-600">Illimité</div>
                      <div className="text-sm text-gray-600">Accès temps réel</div>
                    </div>
                  </div>
                </div>
              </div>

              {showApiKey && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Clé API générée</span>
                  </div>
                  <div className="font-mono text-sm bg-white p-2 rounded border">{apiKey}</div>
                  <p className="text-xs text-green-700 mt-2">
                    Conservez cette clé en sécurité. Elle ne sera plus affichée.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentation et Exemples</CardTitle>
              <CardDescription>Guides d'intégration et exemples de code</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Guides de Démarrage</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Code className="h-4 w-4 mr-2" />
                      Guide d'Intégration REST
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      SDK Python
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      SDK JavaScript
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      Collection Postman
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Exemple d'Utilisation</h3>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <pre>{`# Python Example
import requests

api_key = "mk_your_api_key_here"
headers = {"Authorization": f"Bearer {api_key}"}

response = requests.get(
    "https://api.mineral-trace.gov/v1/production/volumes",
    headers=headers,
    params={"region": "Katanga", "mineral": "cobalt"}
)

data = response.json()
print(f"Production: {data['data']['total_kg']} kg")`}</pre>
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
