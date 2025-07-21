"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, FileText, LinkIcon, Download, Printer, CheckCircle, AlertTriangle } from "lucide-react"

export default function FiscalIntegration() {
  const [invoices] = useState([
    {
      id: "INV-2024-001",
      cooperative: "Coop Minière du Sud",
      mineral: "Cobalt",
      quantity: "2,500 kg",
      amount: "€125,000",
      taxes: "€25,000",
      date: "2024-01-15",
      status: "paid",
      blockchainId: "0x1a2b3c4d5e6f...",
    },
    {
      id: "INV-2024-002",
      cooperative: "Union des Mineurs",
      mineral: "Cuivre",
      quantity: "3,800 kg",
      amount: "€98,400",
      taxes: "€19,680",
      date: "2024-01-12",
      status: "pending",
      blockchainId: "0x2b3c4d5e6f7a...",
    },
    {
      id: "INV-2024-003",
      cooperative: "Coop Minière Est",
      mineral: "Or",
      quantity: "12 kg",
      amount: "€720,000",
      taxes: "€144,000",
      date: "2024-01-10",
      status: "paid",
      blockchainId: "0x3c4d5e6f7a8b...",
    },
  ])

  const [customsDocuments] = useState([
    {
      id: "CUST-2024-001",
      type: "Certificat d'Origine",
      mineral: "Cobalt",
      quantity: "2,500 kg",
      origin: "Mine de Kolwezi",
      destination: "France",
      date: "2024-01-15",
      status: "approved",
    },
    {
      id: "CUST-2024-002",
      type: "Déclaration d'Exportation",
      mineral: "Cuivre",
      quantity: "3,800 kg",
      origin: "Mine de Lubumbashi",
      destination: "Chine",
      date: "2024-01-12",
      status: "pending",
    },
  ])

  const [integrations] = useState([
    {
      system: "SIGEF",
      status: "connected",
      lastSync: "2024-01-17 15:30",
      records: 1247,
    },
    {
      system: "Douanes",
      status: "connected",
      lastSync: "2024-01-17 14:45",
      records: 842,
    },
    {
      system: "Tracfin",
      status: "connected",
      lastSync: "2024-01-17 12:30",
      records: 356,
    },
  ])

  const [newInvoice, setNewInvoice] = useState({
    cooperative: "",
    mineral: "",
    quantity: "",
    unitPrice: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "connected":
        return "bg-green-100 text-green-800"
      case "disconnected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
      case "approved":
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const handleSubmitInvoice = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate invoice creation
    console.log("Nouvelle facture créée:", newInvoice)
    setNewInvoice({ cooperative: "", mineral: "", quantity: "", unitPrice: "" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Intégration Fiscale et Douanière</h2>
          <p className="text-gray-600">Interface de facturation blockchain-native</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Nouvelle Facture
          </Button>
          <Button variant="outline" size="sm">
            <LinkIcon className="h-4 w-4 mr-2" />
            Configurer API
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Factures Émises</p>
                <p className="text-2xl font-bold">127</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-blue-600 mt-2">Ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenus Fiscaux</p>
                <p className="text-2xl font-bold">€2.4M</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+15% vs mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Documents Douaniers</p>
                <p className="text-2xl font-bold">84</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-purple-600 mt-2">Ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Systèmes Connectés</p>
                <p className="text-2xl font-bold">3/3</p>
              </div>
              <LinkIcon className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-orange-600 mt-2">Tous opérationnels</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="invoices">Facturation</TabsTrigger>
          <TabsTrigger value="customs">Documents Douaniers</TabsTrigger>
          <TabsTrigger value="integrations">Intégrations Systèmes</TabsTrigger>
          <TabsTrigger value="create">Créer une Facture</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Facturation Blockchain-Native</CardTitle>
              <CardDescription>Génération automatique des documents fiscaux</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Facture</TableHead>
                    <TableHead>Coopérative</TableHead>
                    <TableHead>Minerai</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Taxes</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.cooperative}</TableCell>
                      <TableCell>{invoice.mineral}</TableCell>
                      <TableCell>{invoice.quantity}</TableCell>
                      <TableCell className="font-medium">{invoice.amount}</TableCell>
                      <TableCell>{invoice.taxes}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(invoice.status)}
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status === "paid"
                              ? "Payée"
                              : invoice.status === "pending"
                                ? "En attente"
                                : invoice.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Télécharger</span>
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Printer className="h-4 w-4" />
                            <span className="sr-only">Imprimer</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents Douaniers</CardTitle>
              <CardDescription>Certificats d'origine et déclarations d'exportation</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Minerai</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Origine</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customsDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.id}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.mineral}</TableCell>
                      <TableCell>{doc.quantity}</TableCell>
                      <TableCell>{doc.origin}</TableCell>
                      <TableCell>{doc.destination}</TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(doc.status)}
                          <Badge className={getStatusColor(doc.status)}>
                            {doc.status === "approved"
                              ? "Approuvé"
                              : doc.status === "pending"
                                ? "En attente"
                                : doc.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Télécharger</span>
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Printer className="h-4 w-4" />
                            <span className="sr-only">Imprimer</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Intégrations Systèmes</CardTitle>
              <CardDescription>Connexion aux systèmes existants via API sécurisée</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.map((integration, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <LinkIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{integration.system}</h3>
                          <p className="text-sm text-gray-600">Dernière synchronisation: {integration.lastSync}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status === "connected" ? "Connecté" : "Déconnecté"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{integration.records} enregistrements synchronisés</span>
                      <Button size="sm" variant="outline">
                        Configurer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Créer une Nouvelle Facture</CardTitle>
              <CardDescription>Génération automatique de facture blockchain-native</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitInvoice} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cooperative">Coopérative</Label>
                    <Select
                      onValueChange={(value) => setNewInvoice({ ...newInvoice, cooperative: value })}
                      value={newInvoice.cooperative}
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
                    <Label htmlFor="mineral">Type de Minerai</Label>
                    <Select
                      onValueChange={(value) => setNewInvoice({ ...newInvoice, mineral: value })}
                      value={newInvoice.mineral}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un minerai" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cobalt">Cobalt</SelectItem>
                        <SelectItem value="copper">Cuivre</SelectItem>
                        <SelectItem value="gold">Or</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantité (kg)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="2500"
                      value={newInvoice.quantity}
                      onChange={(e) => setNewInvoice({ ...newInvoice, quantity: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="unitPrice">Prix Unitaire (€/kg)</Label>
                    <Input
                      id="unitPrice"
                      type="number"
                      placeholder="50"
                      value={newInvoice.unitPrice}
                      onChange={(e) => setNewInvoice({ ...newInvoice, unitPrice: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">
                    <FileText className="h-4 w-4 mr-2" />
                    Générer Facture
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
