"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, AlertTriangle, CheckCircle, MapPin, Calendar } from "lucide-react"

export default function CitizenPortal() {
  const [searchQuery, setSearchQuery] = useState("")

  const [purchases] = useState([
    {
      id: "ACH-2024-001",
      buyer: "État - Ministère des Mines",
      mineral: "Cobalt",
      quantity: "5,000 kg",
      origin: "Mine de Kolwezi",
      cooperative: "Coop Minière du Sud",
      date: "2024-01-15",
      price: "€125,000",
      certifications: ["ISO 14001", "Fairtrade", "ITSCI"],
    },
    {
      id: "ACH-2024-002",
      buyer: "État - Réserves Stratégiques",
      mineral: "Cuivre",
      quantity: "8,200 kg",
      origin: "Mine de Lubumbashi",
      cooperative: "Union des Mineurs",
      date: "2024-01-12",
      price: "€98,400",
      certifications: ["RMI", "OECD Due Diligence"],
    },
  ])

  const [audits] = useState([
    {
      id: "AUD-2024-001",
      cooperative: "Coop Minière du Sud",
      auditor: "Bureau Veritas",
      date: "2024-01-10",
      status: "passed",
      score: 94,
      findings: "Conformité excellente, recommandations mineures",
    },
    {
      id: "AUD-2024-002",
      cooperative: "Union des Mineurs",
      auditor: "SGS",
      date: "2024-01-08",
      status: "passed",
      score: 87,
      findings: "Conformité satisfaisante, amélioration documentation",
    },
    {
      id: "AUD-2024-003",
      cooperative: "Coop Minière Est",
      auditor: "Intertek",
      date: "2024-01-05",
      status: "warning",
      score: 72,
      findings: "Non-conformités détectées, plan d'action requis",
    },
  ])

  const [incidents] = useState([
    {
      id: "INC-2024-001",
      type: "Travail des enfants",
      location: "Région de Kolwezi",
      date: "2024-01-14",
      status: "investigating",
      reporter: "ONG Locale",
      description: "Signalement de mineurs dans une exploitation artisanale",
    },
    {
      id: "INC-2024-002",
      type: "Mine illégale",
      location: "Sud-Kivu",
      date: "2024-01-10",
      status: "resolved",
      reporter: "Citoyen",
      description: "Exploitation sans licence fermée par les autorités",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "investigating":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">Portail de Vérification Citoyenne</h2>
        <p className="text-gray-600 mt-2">Transparence totale sur l'origine des minerais et la gouvernance minière</p>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Recherche de Traçabilité
          </CardTitle>
          <CardDescription>Recherchez l'origine d'un lot de minerai ou vérifiez une transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">ID de lot, coopérative, ou région</Label>
              <Input
                id="search"
                placeholder="MIN-2024-001, Coop Minière du Sud, Katanga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
          {searchQuery && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <CheckCircle className="h-4 w-4 inline mr-2" />
                Lot trouvé: MIN-2024-001 - Cobalt de qualité Grade A, 2,500kg
                <br />
                Origine: Mine de Kolwezi, Coop Minière du Sud
                <br />
                Certifications: ISO 14001, Fairtrade ✓
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="purchases" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="purchases">Achats de l'État</TabsTrigger>
          <TabsTrigger value="audits">Audits & Certifications</TabsTrigger>
          <TabsTrigger value="incidents">Rapports d'Incidents</TabsTrigger>
        </TabsList>

        <TabsContent value="purchases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achats de Minerais par l'État</CardTitle>
              <CardDescription>Transparence totale sur les acquisitions publiques de minerais</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Achat</TableHead>
                    <TableHead>Acheteur</TableHead>
                    <TableHead>Minerai</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Origine</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Certifications</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchases.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell className="font-medium">{purchase.id}</TableCell>
                      <TableCell>{purchase.buyer}</TableCell>
                      <TableCell>{purchase.mineral}</TableCell>
                      <TableCell>{purchase.quantity}</TableCell>
                      <TableCell>
                        <div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            {purchase.origin}
                          </div>
                          <div className="text-xs text-gray-500">{purchase.cooperative}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{purchase.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          {purchase.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {purchase.certifications.map((cert, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Audits et Certifications</CardTitle>
              <CardDescription>Tous les contrôles et certifications des coopératives minières</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Audit</TableHead>
                    <TableHead>Coopérative</TableHead>
                    <TableHead>Auditeur</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Observations</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audits.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell className="font-medium">{audit.id}</TableCell>
                      <TableCell>{audit.cooperative}</TableCell>
                      <TableCell>{audit.auditor}</TableCell>
                      <TableCell>{audit.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(audit.status)}>
                          {audit.status === "passed"
                            ? "Conforme"
                            : audit.status === "warning"
                              ? "Avertissement"
                              : "Non conforme"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                audit.score >= 90 ? "bg-green-600" : audit.score >= 75 ? "bg-yellow-600" : "bg-red-600"
                              }`}
                              style={{ width: `${audit.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{audit.score}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate" title={audit.findings}>
                          {audit.findings}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapports d'Incidents</CardTitle>
              <CardDescription>
                Signalements de mines illégales, travail des enfants et autres violations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <p className="text-sm text-yellow-800">
                    <strong>Signaler un incident:</strong> Utilisez notre formulaire sécurisé pour signaler anonymement
                    toute activité suspecte ou violation des droits.
                  </p>
                </div>
                <Button size="sm" className="mt-2">
                  Signaler un Incident
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Incident</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Localisation</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Signalé par</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="font-medium">{incident.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-red-600 border-red-200">
                          {incident.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          {incident.location}
                        </div>
                      </TableCell>
                      <TableCell>{incident.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(incident.status)}>
                          {incident.status === "investigating"
                            ? "En cours"
                            : incident.status === "resolved"
                              ? "Résolu"
                              : incident.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{incident.reporter}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate" title={incident.description}>
                          {incident.description}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Public Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Statistiques Publiques</CardTitle>
          <CardDescription>Métriques de transparence et de performance du secteur minier</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-gray-600">Lots tracés</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">94.2%</div>
              <div className="text-sm text-gray-600">Taux de conformité</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">45</div>
              <div className="text-sm text-gray-600">Coopératives certifiées</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">€2.4M</div>
              <div className="text-sm text-gray-600">Revenus publics</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
