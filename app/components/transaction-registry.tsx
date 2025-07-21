"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Weight, Gem, Plus, Search, Download } from "lucide-react"

interface MineralBatch {
  id: string
  origin: string
  weight: number
  quality: string
  date: string
  location: { lat: number; lng: number }
  cooperative: string
  status: "extracted" | "processed" | "transported" | "sold"
  blockHash: string
  certifications: string[]
}

export default function TransactionRegistry() {
  const [batches, setBatches] = useState<MineralBatch[]>([
    {
      id: "MIN-2024-001",
      origin: "Mine de Kolwezi",
      weight: 2500,
      quality: "Grade A",
      date: "2024-01-15",
      location: { lat: -10.7147, lng: 25.4663 },
      cooperative: "Coop Minière du Sud",
      status: "transported",
      blockHash: "0x1a2b3c4d5e6f...",
      certifications: ["ISO 14001", "Fairtrade"],
    },
    {
      id: "MIN-2024-002",
      origin: "Mine de Lubumbashi",
      weight: 1800,
      quality: "Grade B",
      date: "2024-01-16",
      location: { lat: -11.6792, lng: 27.4794 },
      cooperative: "Union des Mineurs",
      status: "processed",
      blockHash: "0x2b3c4d5e6f7a...",
      certifications: ["ITSCI", "RMI"],
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newBatch, setNewBatch] = useState({
    origin: "",
    weight: "",
    quality: "",
    cooperative: "",
    location: "",
    certifications: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const batch: MineralBatch = {
      id: `MIN-2024-${String(batches.length + 1).padStart(3, "0")}`,
      origin: newBatch.origin,
      weight: Number(newBatch.weight),
      quality: newBatch.quality,
      date: new Date().toISOString().split("T")[0],
      location: { lat: -10.7147, lng: 25.4663 }, // Mock coordinates
      cooperative: newBatch.cooperative,
      status: "extracted",
      blockHash: `0x${Math.random().toString(16).substr(2, 12)}...`,
      certifications: newBatch.certifications.split(",").map((c) => c.trim()),
    }
    setBatches([...batches, batch])
    setNewBatch({ origin: "", weight: "", quality: "", cooperative: "", location: "", certifications: "" })
    setShowForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "extracted":
        return "bg-yellow-100 text-yellow-800"
      case "processed":
        return "bg-blue-100 text-blue-800"
      case "transported":
        return "bg-purple-100 text-purple-800"
      case "sold":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Registre Immutable des Transactions</h2>
          <p className="text-gray-600">Enregistrement on-chain de chaque lot de minerais</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Lot
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Recherche et Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Rechercher</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="search" placeholder="ID, origine, coopérative..." className="pl-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Statut</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="extracted">Extrait</SelectItem>
                  <SelectItem value="processed">Traité</SelectItem>
                  <SelectItem value="transported">Transporté</SelectItem>
                  <SelectItem value="sold">Vendu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cooperative">Coopérative</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="coop1">Coop Minière du Sud</SelectItem>
                  <SelectItem value="coop2">Union des Mineurs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Période</Label>
              <Input type="date" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Batch Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Enregistrer un Nouveau Lot</CardTitle>
            <CardDescription>
              Toutes les informations seront enregistrées de manière immutable sur la blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="origin">Origine (Mine)</Label>
                  <Input
                    id="origin"
                    value={newBatch.origin}
                    onChange={(e) => setNewBatch({ ...newBatch, origin: e.target.value })}
                    placeholder="Mine de Kolwezi"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Poids (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={newBatch.weight}
                    onChange={(e) => setNewBatch({ ...newBatch, weight: e.target.value })}
                    placeholder="2500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="quality">Qualité</Label>
                  <Select onValueChange={(value) => setNewBatch({ ...newBatch, quality: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la qualité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade A">Grade A</SelectItem>
                      <SelectItem value="Grade B">Grade B</SelectItem>
                      <SelectItem value="Grade C">Grade C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cooperative">Coopérative</Label>
                  <Input
                    id="cooperative"
                    value={newBatch.cooperative}
                    onChange={(e) => setNewBatch({ ...newBatch, cooperative: e.target.value })}
                    placeholder="Nom de la coopérative"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="certifications">Certifications (séparées par des virgules)</Label>
                <Input
                  id="certifications"
                  value={newBatch.certifications}
                  onChange={(e) => setNewBatch({ ...newBatch, certifications: e.target.value })}
                  placeholder="ISO 14001, Fairtrade, ITSCI"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Enregistrer sur la Blockchain</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lots Enregistrés</CardTitle>
          <CardDescription>{batches.length} lots enregistrés sur la blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Lot</TableHead>
                <TableHead>Origine</TableHead>
                <TableHead>Poids</TableHead>
                <TableHead>Qualité</TableHead>
                <TableHead>Coopérative</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Hash Blockchain</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-medium">{batch.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {batch.origin}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Weight className="h-4 w-4 text-gray-400" />
                      {batch.weight.toLocaleString()} kg
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Gem className="h-4 w-4 text-gray-400" />
                      {batch.quality}
                    </div>
                  </TableCell>
                  <TableCell>{batch.cooperative}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(batch.status)}>{batch.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {batch.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{batch.blockHash}</code>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
