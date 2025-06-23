import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/features/page-header";
import {
  SYSTEM_FLOWCHART,
  COMPONENT_RELATIONSHIPS,
  APP_ROUTES,
  DATA_DEPENDENCIES,
} from "@/features/system-flowchart-data";

export default function SystemDocumentationPage() {
  const [activeTab, setActiveTab] = useState("flowchart");

  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader
        title="Documentação do Sistema"
        description="Visão geral da arquitetura e fluxo do aplicativo Lancei Essa"
      />

      <Tabs
        defaultValue="flowchart"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="flowchart">Fluxograma do Sistema</TabsTrigger>
          <TabsTrigger value="components">
            Relacionamento de Componentes
          </TabsTrigger>
          <TabsTrigger value="routes">Rotas da Aplicação</TabsTrigger>
          <TabsTrigger value="data">Dependências de Dados</TabsTrigger>
        </TabsList>

        <TabsContent value="flowchart" className="space-y-6">
          <h2 className="text-2xl font-bold">Fluxograma do Sistema</h2>

          {/* Authentication Flow */}
          <Card>
            <CardHeader className="bg-violet-50 dark:bg-violet-950/30">
              <CardTitle className="text-violet-700 dark:text-violet-300">
                Fluxo de Autenticação
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {SYSTEM_FLOWCHART &&
                SYSTEM_FLOWCHART.authentication &&
                SYSTEM_FLOWCHART.authentication.steps ? (
                  SYSTEM_FLOWCHART.authentication.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="border border-violet-200 dark:border-violet-800 rounded-lg p-4"
                    >
                      <div className="flex items-center mb-2">
                        <div className="bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                          {index + 1}
                        </div>
                        <h3 className="font-medium text-lg">{step.name}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {step.description}
                      </p>
                      {step.actions && step.actions.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium mb-1">Ações:</p>
                          <div className="flex flex-wrap gap-2">
                            {step.actions.map((action, index) => (
                              <span
                                key={action.name}
                                className="bg-violet-50 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-xs px-2 py-1 rounded"
                              >
                                {action.name} → {action.target}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">
                    Dados de autenticação não disponíveis
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Main Application Flow */}
          <Card>
            <CardHeader className="bg-blue-50 dark:bg-blue-950/30">
              <CardTitle className="text-blue-700 dark:text-blue-300">
                Fluxo Principal da Aplicação
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {SYSTEM_FLOWCHART &&
                SYSTEM_FLOWCHART.mainFlow &&
                SYSTEM_FLOWCHART.mainFlow.pages ? (
                  SYSTEM_FLOWCHART.mainFlow.pages.map((page, index) => (
                    <div
                      key={page.id}
                      className="border border-blue-200 dark:border-blue-800 rounded-lg p-4"
                    >
                      <h3 className="font-medium text-lg mb-2">{page.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {page.description}
                      </p>

                      {page.components && page.components.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-1">
                            Componentes:
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {page.components.map((component, index) => (
                              <span
                                key={component.id}
                                className="bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded"
                              >
                                {component.name}
                                {component.dataSource && (
                                  <span className="ml-1 opacity-70">
                                    ({component.dataSource})
                                  </span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {page.actions && page.actions.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-1">Ações:</p>
                          <div className="flex flex-wrap gap-2">
                            {page.actions.map((action, index) => (
                              <span
                                key={action.name}
                                className="bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded"
                              >
                                {action.name} → {action.target}
                                {action.affectsData && " (Afeta Dados)"}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">
                    Dados do fluxo principal não disponíveis
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Data Flow */}
          <Card>
            <CardHeader className="bg-amber-50 dark:bg-amber-950/30">
              <CardTitle className="text-amber-700 dark:text-amber-300">
                Fluxo de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Data Sources */}
                <div>
                  <h3 className="font-medium text-lg mb-3">Fontes de Dados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SYSTEM_FLOWCHART &&
                    SYSTEM_FLOWCHART.dataFlow &&
                    SYSTEM_FLOWCHART.dataFlow.sources ? (
                      SYSTEM_FLOWCHART.dataFlow.sources.map((source, index) => (
                        <div
                          key={source.id}
                          className="border border-amber-200 dark:border-amber-800 rounded-lg p-4"
                        >
                          <h4 className="font-medium mb-2">{source.name}</h4>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Fornece:</p>
                            <div className="flex flex-wrap gap-1">
                              {source.provides &&
                                source.provides.map((item, index) => (
                                  <span
                                    key={item}
                                    className="bg-amber-50 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-xs px-2 py-1 rounded"
                                  >
                                    {item}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 dark:text-gray-400">
                        Dados de fontes não disponíveis
                      </div>
                    )}
                  </div>
                </div>

                {/* Data Destinations */}
                <div>
                  <h3 className="font-medium text-lg mb-3">
                    Destinos de Dados
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SYSTEM_FLOWCHART &&
                    SYSTEM_FLOWCHART.dataFlow &&
                    SYSTEM_FLOWCHART.dataFlow.destinations ? (
                      SYSTEM_FLOWCHART.dataFlow.destinations.map(
                        (dest, index) => (
                          <div
                            key={dest.id}
                            className="border border-green-200 dark:border-green-800 rounded-lg p-4"
                          >
                            <h4 className="font-medium mb-2">{dest.name}</h4>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Consome:</p>
                              <div className="flex flex-wrap gap-1">
                                {dest.consumes &&
                                  dest.consumes.map((item, index) => (
                                    <span
                                      key={item}
                                      className="bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded"
                                    >
                                      {item}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="text-gray-500 dark:text-gray-400">
                        Dados de destinos não disponíveis
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Journeys */}
          <Card>
            <CardHeader className="bg-purple-50 dark:bg-purple-950/30">
              <CardTitle className="text-purple-700 dark:text-purple-300">
                Jornadas de Usuário
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {SYSTEM_FLOWCHART && SYSTEM_FLOWCHART.userJourneys ? (
                  SYSTEM_FLOWCHART.userJourneys.map((journey, index) => (
                    <div
                      key={journey.id}
                      className="border border-purple-200 dark:border-purple-800 rounded-lg p-4"
                    >
                      <h3 className="font-medium text-lg mb-3">
                        {journey.name}
                      </h3>
                      <div className="relative">
                        {/* Journey Steps */}
                        <div className="ml-6 space-y-6 relative">
                          {/* Vertical Line */}
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-800"></div>

                          {journey.steps &&
                            journey.steps.map((step, index) => (
                              <div key={index} className="relative">
                                {/* Step Circle */}
                                <div className="absolute -left-6 top-0 w-3 h-3 rounded-full bg-purple-500 dark:bg-purple-400"></div>
                                <div className="pl-2">
                                  <p className="font-medium">
                                    {index + 1}. {step.page}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {step.action}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">
                    Dados de jornadas de usuário não disponíveis
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* System States */}
          <Card>
            <CardHeader className="bg-teal-50 dark:bg-teal-950/30">
              <CardTitle className="text-teal-700 dark:text-teal-300">
                Estados do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SYSTEM_FLOWCHART && SYSTEM_FLOWCHART.systemStates ? (
                  Object.entries(SYSTEM_FLOWCHART.systemStates).map(
                    ([category, states], index) => (
                      <div
                        key={category}
                        className="border border-teal-200 dark:border-teal-800 rounded-lg p-4"
                      >
                        <h3 className="font-medium text-lg mb-3 capitalize">
                          {category.replace(/([A-Z])/g, " $1").trim()}
                        </h3>
                        <div className="space-y-2">
                          {states &&
                            states.map((state, index) => (
                              <div
                                key={state.id}
                                className="bg-teal-50 dark:bg-teal-900/30 p-2 rounded"
                              >
                                <p className="font-medium">{state.name}</p>
                                {state.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {state.description}
                                  </p>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">
                    Dados de estados do sistema não disponíveis
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          <h2 className="text-2xl font-bold">Relacionamento de Componentes</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {COMPONENT_RELATIONSHIPS ? (
                  Object.entries(COMPONENT_RELATIONSHIPS).map(
                    ([componentId, details], index) => (
                      <div
                        key={componentId}
                        className="border border-violet-200 dark:border-violet-800 rounded-lg p-4"
                      >
                        <h3 className="font-medium text-lg mb-2">
                          {componentId}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium mb-1">Tipo:</p>
                            <span className="bg-violet-50 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-xs px-2 py-1 rounded">
                              {details.type}
                            </span>

                            {details.contains &&
                              details.contains.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-sm font-medium mb-1">
                                    Contém:
                                  </p>
                                  <div className="flex flex-wrap gap-1">
                                    {details.contains.map((item, index) => (
                                      <span
                                        key={item}
                                        className="bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded"
                                      >
                                        {item}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>

                          <div>
                            {details.usedBy && details.usedBy.length > 0 && (
                              <div>
                                <p className="text-sm font-medium mb-1">
                                  Usado por:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {details.usedBy.map((item, index) => (
                                    <span
                                      key={item}
                                      className="bg-amber-50 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-xs px-2 py-1 rounded"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {details.affects && details.affects.length > 0 && (
                              <div className="mt-3">
                                <p className="text-sm font-medium mb-1">
                                  Afeta:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {details.affects.map((item, index) => (
                                    <span
                                      key={item}
                                      className="bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-xs px-2 py-1 rounded"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {details.dataSource && (
                              <div className="mt-3">
                                <p className="text-sm font-medium mb-1">
                                  Fonte de dados:
                                </p>
                                <span className="bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded">
                                  {details.dataSource}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">
                    Dados de relacionamento de componentes não disponíveis
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-6">
          <h2 className="text-2xl font-bold">Rotas da Aplicação</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                        Caminho
                      </th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                        Componente
                      </th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                        Requer Autenticação
                      </th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                        Requer YouTube
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {APP_ROUTES ? (
                      APP_ROUTES.map((route, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0
                              ? "bg-white dark:bg-gray-900"
                              : "bg-gray-50 dark:bg-gray-850"
                          }
                        >
                          <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                              {route.path}
                            </code>
                          </td>
                          <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                            {route.component}
                          </td>
                          <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                            {route.requiresAuth ? (
                              <span className="text-green-600 dark:text-green-400">
                                Sim
                              </span>
                            ) : (
                              <span className="text-red-600 dark:text-red-400">
                                Não
                              </span>
                            )}
                          </td>
                          <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                            {route.requiresYouTube ? (
                              <span className="text-green-600 dark:text-green-400">
                                Sim
                              </span>
                            ) : (
                              <span className="text-red-600 dark:text-red-400">
                                Não
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center text-gray-500 dark:text-gray-400"
                        >
                          Dados de rotas não disponíveis
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <h2 className="text-2xl font-bold">Dependências de Dados</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {DATA_DEPENDENCIES ? (
                  Object.entries(DATA_DEPENDENCIES).map(
                    ([pageId, dependencies], index) => (
                      <div
                        key={pageId}
                        className="border border-blue-200 dark:border-blue-800 rounded-lg p-4"
                      >
                        <h3 className="font-medium text-lg mb-3">{pageId}</h3>
                        <div className="space-y-3">
                          {dependencies &&
                            dependencies.map((dep, index) => (
                              <div
                                key={index}
                                className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg"
                              >
                                <p className="font-medium mb-2">
                                  <code className="bg-blue-100 dark:bg-blue-800 px-1.5 py-0.5 rounded text-sm">
                                    {dep.dataKey}
                                  </code>
                                </p>
                                {dep.affects && dep.affects.length > 0 && (
                                  <div>
                                    <p className="text-sm font-medium mb-1">
                                      Afeta componentes:
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {dep.affects.map((component, index) => (
                                        <span
                                          key={component}
                                          className="bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded"
                                        >
                                          {component}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">
                    Dados de dependências não disponíveis
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
