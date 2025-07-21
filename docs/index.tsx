"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Code, Users, Shield, Globe } from "lucide-react"

export default function Documentation() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-100">
          <BookOpen className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Documentation du Système de Traçabilité Minière</h1>
          <p className="text-gray-600">Guide utilisateur et documentation technique</p>
        </div>
      </div>

      {/* Tabs root */}
      <Tabs defaultValue="intro" className="space-y-8">
        {/* Tab triggers */}
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="intro">
            <BookOpen className="mr-2 h-4 w-4" />
            Introduction
          </TabsTrigger>
          <TabsTrigger value="user">
            <Users className="mr-2 h-4 w-4" />
            Guide&nbsp;utilisateur
          </TabsTrigger>
          <TabsTrigger value="tech">
            <Code className="mr-2 h-4 w-4" />
            Technique
          </TabsTrigger>
          <TabsTrigger value="api">
            <Globe className="mr-2 h-4 w-4" />
            API
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Sécurité
          </TabsTrigger>
        </TabsList>

        {/* Introduction */}
        <TabsContent value="intro">
          <Card>
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
              <CardDescription>
                Vue d’ensemble fonctionnelle du système de traçabilité minière basé sur la blockchain.
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Ce document décrit le fonctionnement, les objectifs et l’architecture globale de la plateforme. Utilisez
                les onglets ci-dessus pour accéder au guide utilisateur, à la référence technique, à la documentation
                API ainsi qu’aux bonnes pratiques de sécurité.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User guide placeholder */}
        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>Guide utilisateur</CardTitle>
              <CardDescription>Mode d’emploi pour les autorités, coopératives, auditeurs et citoyens.</CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Cette section est un résumé. Les guides détaillés figurent dans les modules individuels
                (Portail&nbsp;Gov, Registre, etc.).
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technical overview placeholder */}
        <TabsContent value="tech">
          <Card>
            <CardHeader>
              <CardTitle>Documentation technique</CardTitle>
              <CardDescription>Architecture et déploiement.</CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Reportez-vous aux fichiers <code>docs/architecture.md</code>, <code>docs/deployment.md</code> et aux
                commentaires des smart-contracts pour plus d’informations.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API placeholder */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>Documentation API</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Les spécifications OpenAPI sont disponibles à l’adresse&nbsp;:
                <code> /api/openapi.json</code>
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security placeholder */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité &amp; conformité</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Cette plateforme applique les meilleures pratiques OWASP&nbsp;Top&nbsp;10 et les recommandations ANSSI
                pour la protection des données sensibles.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
