import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SYSTEM_FLOWCHART } from "@/polymet/data/system-flowchart-data";
import {
  ArrowRightIcon,
  CircleIcon,
  LayoutIcon,
  ServerIcon,
  UsersIcon,
  ActivityIcon,
  DatabaseIcon,
} from "lucide-react";

export function SystemFlowchart() {
  const [selectedFlow, setSelectedFlow] = useState<string>("authentication");

  // Render authentication flow
  const renderAuthFlow = () => {
    const { steps } = SYSTEM_FLOWCHART.authentication;

    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground mb-4">
          Authentication flow from login to accessing the main application
        </div>

        <div className="flex flex-col space-y-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Step card */}
              <Card className="border-2 border-violet-200 dark:border-violet-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CircleIcon className="h-4 w-4 mr-2 text-violet-500" />

                    {step.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {step.description}
                  </p>

                  <div className="space-y-2">
                    {step.actions.map((action, actionIndex) => (
                      <div
                        key={actionIndex}
                        className="flex items-center text-sm p-2 bg-violet-50 dark:bg-violet-900/20 rounded-md"
                      >
                        <ArrowRightIcon className="h-4 w-4 mr-2 text-violet-500" />

                        <span>{action.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          → {action.target}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 -translate-x-1/2 h-8 w-0.5 bg-violet-200 dark:bg-violet-800 mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render main application flow
  const renderMainFlow = () => {
    const { pages } = SYSTEM_FLOWCHART.mainFlow;

    return (
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground mb-4">
          Main application pages and their components
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pages.map((page, index) => (
            <Card
              key={page.id}
              className="border-2 border-violet-200 dark:border-violet-900"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <LayoutIcon className="h-4 w-4 mr-2 text-violet-500" />

                  {page.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {page.description}
                </p>

                <div className="space-y-4">
                  {/* Components */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Components:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {page.components.map((component, index) => (
                        <div
                          key={component.id}
                          className="flex items-center text-sm p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md"
                        >
                          <CircleIcon className="h-3 w-3 mr-2 text-blue-500" />

                          <span>{component.name}</span>
                          {component.dataSource && (
                            <span className="ml-auto text-xs text-muted-foreground">
                              Data: {component.dataSource}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Actions:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {page.actions.map((action, actionIndex) => (
                        <div
                          key={actionIndex}
                          className="flex items-center text-sm p-2 bg-green-50 dark:bg-green-900/20 rounded-md"
                        >
                          <ArrowRightIcon className="h-3 w-3 mr-2 text-green-500" />

                          <span>{action.name}</span>
                          <span className="ml-auto text-xs text-muted-foreground">
                            → {action.target}
                            {action.affectsData && " (updates data)"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  // Render data flow
  const renderDataFlow = () => {
    const { sources, destinations } = SYSTEM_FLOWCHART.dataFlow;

    return (
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground mb-4">
          Data sources and destinations in the application
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Data Sources */}
          <Card className="border-2 border-amber-200 dark:border-amber-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <DatabaseIcon className="h-4 w-4 mr-2 text-amber-500" />
                Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sources.map((source, index) => (
                  <div key={source.id} className="space-y-2">
                    <h4 className="text-sm font-medium">{source.name}</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {source.provides.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center text-sm p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md"
                        >
                          <ServerIcon className="h-3 w-3 mr-2 text-amber-500" />

                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Destinations */}
          <Card className="border-2 border-cyan-200 dark:border-cyan-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <LayoutIcon className="h-4 w-4 mr-2 text-cyan-500" />
                Data Destinations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {destinations.map((destination, index) => (
                  <div key={destination.id} className="space-y-2">
                    <h4 className="text-sm font-medium">{destination.name}</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {destination.consumes.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center text-sm p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-md"
                        >
                          <CircleIcon className="h-3 w-3 mr-2 text-cyan-500" />

                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Render user journeys
  const renderUserJourneys = () => {
    const { userJourneys } = SYSTEM_FLOWCHART;

    return (
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground mb-4">
          Common user paths through the application
        </div>

        <div className="grid grid-cols-1 gap-6">
          {userJourneys.map((journey, index) => (
            <Card
              key={journey.id}
              className="border-2 border-purple-200 dark:border-purple-900"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <UsersIcon className="h-4 w-4 mr-2 text-purple-500" />

                  {journey.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {journey.steps.map((step, index) => (
                    <div key={index} className="flex items-start mb-4 relative">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 z-10">
                        <span className="text-xs font-medium text-purple-700 dark:text-purple-300">
                          {index + 1}
                        </span>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-md p-3 flex-grow">
                        <div className="font-medium text-sm">{step.page}</div>
                        <div className="text-sm text-muted-foreground">
                          {step.action}
                        </div>
                      </div>

                      {/* Connector line */}
                      {index < journey.steps.length - 1 && (
                        <div className="absolute left-4 top-8 h-8 w-0.5 bg-purple-200 dark:bg-purple-800"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  // Render system states
  const renderSystemStates = () => {
    const { systemStates } = SYSTEM_FLOWCHART;

    return (
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground mb-4">
          Different states the application can be in
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(systemStates).map(([category, states], index) => (
            <Card
              key={category}
              className="border-2 border-indigo-200 dark:border-indigo-900"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ActivityIcon className="h-4 w-4 mr-2 text-indigo-500" />
                  {category.charAt(0).toUpperCase() + category.slice(1)} States
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {states.map((state, index) => (
                    <div
                      key={state.id}
                      className="flex items-center text-sm p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-md"
                    >
                      <CircleIcon className="h-3 w-3 mr-2 text-indigo-500" />

                      <span>{state.name}</span>
                      {state.description && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          {state.description}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <Tabs
        defaultValue="authentication"
        value={selectedFlow}
        onValueChange={setSelectedFlow}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="authentication">Auth Flow</TabsTrigger>
          <TabsTrigger value="mainFlow">Main Flow</TabsTrigger>
          <TabsTrigger value="dataFlow">Data Flow</TabsTrigger>
          <TabsTrigger value="userJourneys">User Journeys</TabsTrigger>
          <TabsTrigger value="systemStates">System States</TabsTrigger>
        </TabsList>

        <TabsContent value="authentication" className="mt-0">
          {renderAuthFlow()}
        </TabsContent>

        <TabsContent value="mainFlow" className="mt-0">
          {renderMainFlow()}
        </TabsContent>

        <TabsContent value="dataFlow" className="mt-0">
          {renderDataFlow()}
        </TabsContent>

        <TabsContent value="userJourneys" className="mt-0">
          {renderUserJourneys()}
        </TabsContent>

        <TabsContent value="systemStates" className="mt-0">
          {renderSystemStates()}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SystemFlowchart;
