"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Gavel, FileText, Shield, Users, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export default function AuditModule() {
  const [auditProofs] = useState([
    {
      id: "POA-2024-001",
      inspector: "Jean Mukendi",
      cooperative: "Coop Minière du Sud",
      date: "2024-01-15",
      type: "Inspection de routine",
      status: "completed",
      cryptoProof: "0x8f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c",
      findings: "Conformité excellente, documentation complète",
    },
    {
      id: "POA-2024-002",
      inspector: "Marie Kabila",
      cooperative: "Union des Mineurs",
      date: "2024-01-12",
      type: "Audit ESG",
      status: "completed",
      cryptoProof: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
      findings: "Amélioration nécessaire sur la sécurité",
    },
    {
      id: "POA-2024-003",
      inspector: "Paul Tshisekedi",
      cooperative: "Coop Minière Est",
      date: "2024-01-10",
      type: "Contrôle de conformité",
      status: "in_progress",
      cryptoProof: "En cours...",
      findings: "Audit en cours d'exécution",
    },
  ])

  const [roles] = useState([
    {
      role: "Gouvernement",
      permissions: ["Lecture complète", "Création d'audits", "Gestion des rôles"],
      users: 12,
      status: "active",
    },
    {
      role: "Coopérative",
      permissions: ["Lecture limitée", "Soumission de documents"],
      users: 45,
      status: "active",
    },
    {
      role: "Auditeur Tiers",
      permissions: ["Lecture d'audit", "Création de rapports"],
      users: 8,
      status: "active",
    },
    {
      role: "Citoyen",
      permissions: ["Lecture publique"],
      users: 1247,
      status: "active",
    },
  ])

  const [reports] = useState([
    {
      id: "RPT-2024-001",
      cycle: "Q1 2024",
      region: "Katanga",
      cooperatives: 18,
      status: "completed",
      timestamp: "2024-01-15 23:59:59",
      signature: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d",
      findings: "94% de conformité générale",
    },
    {
      id: "RPT-2024-002",
      cycle: "Q1 2024",
      region: "Haut-Katanga",
      cooperatives: 15,
      status: "completed",
      timestamp: "2024-01-15 23:59:59",
      signature: "0x8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e",
      findings: "91% de conformité, 3 non-conformités mineures",
    },
  ])

  const [newAudit, setNewAudit] = useState({
    cooperative: "",
    type: "",
    inspector: "",
    notes: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "active":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
    }
  }

  const handleSubmitAudit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate audit creation
    console.log("Nouvel audit créé:", newAudit)
    setNewAudit({ cooperative: "", type: "", inspector: "", notes: "" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gouvernance et Auditabilité</h2>
          <p className="text-gray-600">Journal de preuve d'audit et gestion des accès</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Nouveau Rapport
          </Button>
          <Button variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Gérer les Rôles
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Audits Complétés</p>
                <p className="text-2xl font-bold">127</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">Ce trimestre</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Preuves Cryptographiques</p>
                <p className="text-2xl font-bold">127</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-blue-600 mt-2">100% vérifiables</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Utilisateurs Actifs</p>
                <p className="text-2xl font-bold">1,312</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-purple-600 mt-2">Tous rôles confondus</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rapports Générés</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-orange-600 mt-2">Automatisés</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="proofs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="proofs">Preuves d'Audit</TabsTrigger>
          <TabsTrigger value="governance">Gestion des Rôles</TabsTrigger>
          <TabsTrigger value="reports">Rapports Automatisés</TabsTrigger>
          <TabsTrigger value="create">Créer un Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="proofs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Journal de Preuve d'Audit (Proof of Audit)</CardTitle>
              <CardDescription>Preuves cryptographiques de chaque contrôle réalisé par les inspecteurs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Preuve</TableHead>
                    <TableHead>Inspecteur</TableHead>
                    <TableHead>Coopérative</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Preuve Cryptographique</TableHead>
                    <TableHead>Observations</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditProofs.map((proof) => (
                    <TableRow key={proof.id}>
                      <TableCell className="font-medium">{proof.id}</TableCell>
                      <TableCell>{proof.inspector}</TableCell>
                      <TableCell>{proof.cooperative}</TableCell>
                      <TableCell>{proof.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{proof.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(proof.status)}
                          <Badge className={getStatusColor(proof.status)}>
                            {proof.status === "completed"
                              ? "Terminé"
                              : proof.status === "in_progress"
                                ? "En cours"
                                : proof.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{proof.cryptoProof}</code>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate" title={proof.findings}>
                          {proof.findings}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Module de Gouvernance On-Chain</CardTitle>
              <CardDescription>Gestion des accès et rôles (Gouvernement, Coopérative, Auditeur tiers)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {role.role === "Gouvernement" ? (
                            <Shield className="h-5 w-5 text-blue-600" />
                          ) : role.role === "Coopérative" ? (
                            <Users className="h-5 w-5 text-green-600" />
                          ) : role.role === "Auditeur Tiers" ? (
                            <Gavel className="h-5 w-5 text-purple-600" />
                          ) : (
                            <Users className="h-5 w-5 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{role.role}</h3>
                          <p className="text-sm text-gray-600">{role.users} utilisateur(s)</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(role.status)}>
                        {role.status === "active" ? "Actif" : role.status}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Permissions:</h4>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permission, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapports d'Audit Automatisés</CardTitle>
              <CardDescription>
                Rapports remis en fin de chaque cycle de production, horodatés et signés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Rapport</TableHead>
                    <TableHead>Cycle</TableHead>
                    <TableHead>Région</TableHead>
                    <TableHead>Coopératives</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Horodatage</TableHead>
                    <TableHead>Signature</TableHead>
                    <TableHead>Résultats</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.cycle}</TableCell>
                      <TableCell>{report.region}</TableCell>
                      <TableCell>{report.cooperatives}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status === "completed" ? "Terminé" : report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{report.timestamp}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{report.signature}</code>
                      </TableCell>
                      <TableCell>{report.findings}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Créer un Nouvel Audit</CardTitle>
              <CardDescription>Planifier un contrôle et générer une preuve cryptographique</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitAudit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cooperative">Coopérative</Label>
                    <Select
                      onValueChange={(value) => setNewAudit({ ...newAudit, cooperative: value })}
                      value={newAudit.cooperative}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une coopérative" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coop1">Coop Minière du Sud</SelectItem>
                        <SelectItem value="coop2">Union des Mineurs</SelectItem>
                        <SelectItem value="coop3">Coop Minière Est</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Type d'Audit</Label>
                    <Select onValueChange={(value) => setNewAudit({ ...newAudit, type: value })} value={newAudit.type}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Inspection de routine</SelectItem>
                        <SelectItem value="esg">Audit ESG</SelectItem>
                        <SelectItem value="compliance">Contrôle de conformité</SelectItem>
                        <SelectItem value="surprise">Visite surprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="inspector">Inspecteur Assigné</Label>
                  <Select
                    onValueChange={(value) => setNewAudit({ ...newAudit, inspector: value })}
                    value={newAudit.inspector}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un inspecteur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inspector1">Jean Mukendi</SelectItem>
                      <SelectItem value="inspector2">Marie Kabila</SelectItem>
                      <SelectItem value="inspector3">Paul Tshisekedi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Notes Préliminaires</Label>
                  <Textarea
                    id="notes"
                    placeholder="Informations complémentaires pour l'audit..."
                    value={newAudit.notes}
                    onChange={(e) => setNewAudit({ ...newAudit, notes: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">
                    <Gavel className="h-4 w-4 mr-2" />
                    Créer l'Audit
                  </Button>
                  <Button type="button" variant="outline">
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
