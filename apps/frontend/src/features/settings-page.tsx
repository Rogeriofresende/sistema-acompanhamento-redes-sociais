import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BrandButton } from "@/features/brand-button";
import { PageHeader } from "@/features/page-header";
import {
  BellIcon,
  GlobeIcon,
  ShieldIcon,
  KeyIcon,
  TrashIcon,
  MailIcon,
  AlertTriangleIcon,
  UsersIcon,
  UserPlusIcon,
  LockIcon,
  Youtube,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SettingsPageProps {
  onBackToDashboard?: () => void;
}

export default function SettingsPage({ onBackToDashboard }: SettingsPageProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newsletterUpdates, setNewsletterUpdates] = useState(true);
  const [videoPublished, setVideoPublished] = useState(true);
  const [commentNotifications, setCommentNotifications] = useState(true);
  const [language, setLanguage] = useState("pt-BR");
  const [timezone, setTimezone] = useState("America/Sao_Paulo");
  const [theme, setTheme] = useState("system");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("notifications");
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [youtubeStatus, setYoutubeStatus] = useState(null);
  const [loadingYoutube, setLoadingYoutube] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleNavigateToVideos = () => {
    navigate("/videos");
  };

  // Verificar status do YouTube
  useEffect(() => {
    async function checkYouTubeStatus() {
      if (!token) return;
      
      try {
        const res = await fetch("http://localhost:1717/api/youtube/status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (res.ok) {
          const data = await res.json();
          setYoutubeStatus(data);
        } else {
          setYoutubeStatus({ connected: false });
        }
      } catch (error) {
        console.error("Erro ao verificar status do YouTube:", error);
        setYoutubeStatus({ connected: false });
      }
    }

    if (activeSection === "integrations") {
      checkYouTubeStatus();
    }
  }, [token, activeSection]);

  // Desconectar YouTube
  const handleDisconnectYoutube = async () => {
    setLoadingYoutube(true);
    try {
      const res = await fetch("http://localhost:1717/api/youtube/disconnect", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.ok) {
        setYoutubeStatus({ connected: false });
        alert("YouTube desconectado com sucesso! Agora você pode reconectar com as novas permissões.");
      } else {
        alert("Erro ao desconectar YouTube. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao desconectar YouTube:", error);
      alert("Erro ao desconectar YouTube. Tente novamente.");
    } finally {
      setLoadingYoutube(false);
    }
  };

  // Conectar YouTube
  const handleConnectYoutube = async () => {
    setLoadingYoutube(true);
    try {
      const res = await fetch("http://localhost:1717/api/youtube/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch (error) {
      console.error("Erro ao conectar YouTube:", error);
      alert("Erro ao conectar YouTube. Tente novamente.");
      setLoadingYoutube(false);
    }
  };

  // Mock users data
  const users = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@lanceiessa.com",
      role: "Administrador",
      avatar: "https://github.com/yusufhilmi.png",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@lanceiessa.com",
      role: "Editor",
      avatar: "https://github.com/kdrnp.png",
    },
    {
      id: 3,
      name: "Carlos Oliveira",
      email: "carlos@lanceiessa.com",
      role: "Visualizador",
      avatar: "https://github.com/furkanksl.png",
    },
  ];

  // Role permissions
  const rolePermissions = {
    Administrador: [
      { name: "Gerenciar usuários", enabled: true },
      { name: "Publicar vídeos", enabled: true },
      { name: "Editar conteúdo", enabled: true },
      { name: "Gerenciar newsletter", enabled: true },
      { name: "Ver estatísticas", enabled: true },
    ],

    Editor: [
      { name: "Gerenciar usuários", enabled: false },
      { name: "Publicar vídeos", enabled: true },
      { name: "Editar conteúdo", enabled: true },
      { name: "Gerenciar newsletter", enabled: false },
      { name: "Ver estatísticas", enabled: true },
    ],

    Visualizador: [
      { name: "Gerenciar usuários", enabled: false },
      { name: "Publicar vídeos", enabled: false },
      { name: "Editar conteúdo", enabled: false },
      { name: "Gerenciar newsletter", enabled: false },
      { name: "Ver estatísticas", enabled: true },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Configurações"
        description="Gerencie as configurações da sua conta e preferências"
        onNavigateToVideos={handleNavigateToVideos}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        {/* Settings Navigation Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <nav className="space-y-1">
              <BrandButton
                variant="ghost"
                className="w-full justify-start"
                active={activeSection === "notifications"}
                onClick={() => setActiveSection("notifications")}
              >
                <BellIcon className="h-5 w-5 mr-3" />
                Notificações
              </BrandButton>
              <BrandButton
                variant="ghost"
                className="w-full justify-start"
                active={activeSection === "integrations"}
                onClick={() => setActiveSection("integrations")}
              >
                <Youtube className="h-5 w-5 mr-3" />
                Integrações
              </BrandButton>
              <BrandButton
                variant="ghost"
                className="w-full justify-start"
                active={activeSection === "account"}
                onClick={() => setActiveSection("account")}
              >
                <KeyIcon className="h-5 w-5 mr-3" />
                Conta e Segurança
              </BrandButton>
              <BrandButton
                variant="ghost"
                className="w-full justify-start"
                active={activeSection === "access"}
                onClick={() => setActiveSection("access")}
              >
                <UsersIcon className="h-5 w-5 mr-3" />
                Controle de Acesso
              </BrandButton>
              <BrandButton
                variant="ghost"
                className="w-full justify-start"
                active={activeSection === "preferences"}
                onClick={() => setActiveSection("preferences")}
              >
                <GlobeIcon className="h-5 w-5 mr-3" />
                Preferências
              </BrandButton>
              <BrandButton
                variant="ghost"
                className="w-full justify-start"
                active={activeSection === "newsletter"}
                onClick={() => setActiveSection("newsletter")}
              >
                <MailIcon className="h-5 w-5 mr-3" />
                Newsletter
              </BrandButton>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* Integrations Section */}
          {activeSection === "integrations" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Youtube className="h-6 w-6 mr-2 text-red-600" />
                  Integrações
                </CardTitle>
                <CardDescription>
                  Gerencie suas conexões com serviços externos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* YouTube Integration */}
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <Youtube className="h-8 w-8 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">YouTube Analytics</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Conecte seu canal do YouTube para visualizar estatísticas detalhadas
                        </p>
                        
                        {youtubeStatus && (
                          <div className="mt-3">
                            <div className="flex items-center space-x-2">
                              {youtubeStatus.connected ? (
                                <>
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                  <span className="text-green-600 font-medium">Conectado</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-5 w-5 text-red-600" />
                                  <span className="text-red-600 font-medium">Desconectado</span>
                                </>
                              )}
                            </div>
                            
                            {youtubeStatus.connected && youtubeStatus.channel && (
                              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Canal: <span className="font-medium">{youtubeStatus.channel.title}</span>
                              </div>
                            )}
                            
                            {youtubeStatus.connected && youtubeStatus.hasAnalytics !== undefined && (
                              <div className="mt-2">
                                <div className="flex items-center space-x-2">
                                  {youtubeStatus.hasAnalytics ? (
                                    <>
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                      <span className="text-sm text-green-600">Permissões do Analytics: OK</span>
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="h-4 w-4 text-orange-600" />
                                      <span className="text-sm text-orange-600">Precisa reconectar para Analytics</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      {youtubeStatus?.connected ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDisconnectYoutube}
                            disabled={loadingYoutube}
                            className="flex items-center"
                          >
                            {loadingYoutube ? (
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <XCircle className="h-4 w-4 mr-2" />
                            )}
                            Desconectar
                          </Button>
                          {!youtubeStatus.hasAnalytics && (
                            <Button
                              size="sm"
                              onClick={handleConnectYoutube}
                              disabled={loadingYoutube}
                              className="flex items-center bg-red-600 hover:bg-red-700"
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Reconectar
                            </Button>
                          )}
                        </>
                      ) : (
                        <Button
                          size="sm"
                          onClick={handleConnectYoutube}
                          disabled={loadingYoutube}
                          className="flex items-center bg-red-600 hover:bg-red-700"
                        >
                          {loadingYoutube ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Youtube className="h-4 w-4 mr-2" />
                          )}
                          Conectar
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {youtubeStatus?.connected && !youtubeStatus.hasAnalytics && (
                    <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertTriangleIcon className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-orange-800 dark:text-orange-200">
                            Permissões do Analytics Necessárias
                          </h4>
                          <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                            Para ver estatísticas detalhadas, você precisa reconectar o YouTube e autorizar 
                            as permissões do <strong>YouTube Analytics</strong>.
                          </p>
                          <ol className="text-sm text-orange-700 dark:text-orange-300 mt-2 ml-4 list-decimal">
                            <li>Clique em "Desconectar" acima</li>
                            <li>Clique em "Conectar" novamente</li>
                            <li>Na tela do Google, autorize <strong>todas as permissões</strong>, incluindo Analytics</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Notificações</CardTitle>
                <CardDescription>
                  Configure como e quando você deseja receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificações por Email</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receba atualizações importantes por email
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Atualizações da Newsletter</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receba notificações sobre novos inscritos na newsletter
                    </p>
                  </div>
                  <Switch
                    checked={newsletterUpdates}
                    onCheckedChange={setNewsletterUpdates}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Vídeos Publicados</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receba notificações quando seus vídeos forem publicados
                    </p>
                  </div>
                  <Switch
                    checked={videoPublished}
                    onCheckedChange={setVideoPublished}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Comentários</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receba notificações sobre novos comentários nos seus
                      vídeos
                    </p>
                  </div>
                  <Switch
                    checked={commentNotifications}
                    onCheckedChange={setCommentNotifications}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Account and Security Section */}
          {activeSection === "account" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Segurança da Conta</CardTitle>
                <CardDescription>
                  Gerencie as configurações de segurança da sua conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Alterar Senha</h3>
                  <div className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="current-password">Senha Atual</Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="confirm-password">
                        Confirmar Nova Senha
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <BrandButton className="w-full sm:w-auto">
                      Atualizar Senha
                    </BrandButton>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="font-medium text-red-600 dark:text-red-400 mb-4">
                    Zona de Perigo
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Uma vez excluída, sua conta não poderá ser recuperada. Todos
                    os seus dados serão permanentemente removidos.
                  </p>
                  <Dialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="flex items-center"
                      >
                        <TrashIcon className="h-4 w-4 mr-2" />
                        Excluir Conta
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center text-red-600 dark:text-red-400">
                          <AlertTriangleIcon className="h-5 w-5 mr-2" />
                          Excluir Conta
                        </DialogTitle>
                        <DialogDescription>
                          Esta ação não pode ser desfeita. Isso excluirá
                          permanentemente sua conta e removerá seus dados dos
                          nossos servidores.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm font-medium mb-2">
                          Digite "excluir" para confirmar:
                        </p>
                        <Input placeholder="excluir" />
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setDeleteDialogOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button variant="destructive">
                          Excluir Permanentemente
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Access Control Section */}
          {activeSection === "access" && (
            <>
              <Card className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Usuários</CardTitle>
                    <CardDescription>
                      Gerencie os usuários que têm acesso à sua conta
                    </CardDescription>
                  </div>
                  <Dialog
                    open={addUserDialogOpen}
                    onOpenChange={setAddUserDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="flex items-center">
                        <UserPlusIcon className="h-4 w-4 mr-2" />
                        Adicionar Usuário
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                        <DialogDescription>
                          Preencha os dados do novo usuário para conceder acesso
                          à plataforma.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor="new-user-name">Nome</Label>
                          <Input
                            id="new-user-name"
                            placeholder="Nome completo"
                          />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor="new-user-email">Email</Label>
                          <Input
                            id="new-user-email"
                            type="email"
                            placeholder="email@exemplo.com"
                          />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor="new-user-role">Função</Label>
                          <Select>
                            <SelectTrigger id="new-user-role">
                              <SelectValue placeholder="Selecione uma função" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">
                                Administrador
                              </SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="viewer">
                                Visualizador
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setAddUserDialogOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button>Adicionar Usuário</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Função</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user, index) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={user.avatar}
                                  alt={user.name}
                                />

                                <AvatarFallback>
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                user.role === "Administrador"
                                  ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                                  : user.role === "Editor"
                                    ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                                    : "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Editar
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                            >
                              Remover
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Permissões</CardTitle>
                  <CardDescription>
                    Configure as permissões para cada função de usuário
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="admin">
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="admin">Administrador</TabsTrigger>
                      <TabsTrigger value="editor">Editor</TabsTrigger>
                      <TabsTrigger value="viewer">Visualizador</TabsTrigger>
                    </TabsList>

                    <TabsContent value="admin" className="space-y-4">
                      {rolePermissions["Administrador"].map(
                        (permission, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <h3 className="font-medium">{permission.name}</h3>
                            </div>
                            <Switch
                              defaultChecked={permission.enabled}
                              disabled
                            />
                          </div>
                        )
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                        Administradores têm acesso completo a todas as
                        funcionalidades da plataforma.
                      </p>
                    </TabsContent>

                    <TabsContent value="editor" className="space-y-4">
                      {rolePermissions["Editor"].map((permission, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <h3 className="font-medium">{permission.name}</h3>
                          </div>
                          <Switch defaultChecked={permission.enabled} />
                        </div>
                      ))}
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                        Editores podem criar e editar conteúdo, mas não podem
                        gerenciar usuários ou configurações avançadas.
                      </p>
                    </TabsContent>

                    <TabsContent value="viewer" className="space-y-4">
                      {rolePermissions["Visualizador"].map(
                        (permission, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <h3 className="font-medium">{permission.name}</h3>
                            </div>
                            <Switch defaultChecked={permission.enabled} />
                          </div>
                        )
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                        Visualizadores podem apenas ver conteúdo e estatísticas,
                        sem permissão para editar ou publicar.
                      </p>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <BrandButton>Salvar Alterações</BrandButton>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Preferences Section */}
          {activeSection === "preferences" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Preferências</CardTitle>
                <CardDescription>
                  Personalize sua experiência na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Selecione um idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Selecione um fuso horário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">
                        Brasília (GMT-3)
                      </SelectItem>
                      <SelectItem value="America/New_York">
                        New York (GMT-5)
                      </SelectItem>
                      <SelectItem value="Europe/London">
                        London (GMT+0)
                      </SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="theme">Tema</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Selecione um tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <BrandButton className="w-full sm:w-auto">
                  Salvar Preferências
                </BrandButton>
              </CardContent>
            </Card>
          )}

          {/* Newsletter Section */}
          {activeSection === "newsletter" && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">
                  Configurações da Newsletter
                </CardTitle>
                <CardDescription>
                  Gerencie as configurações da sua newsletter
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="newsletter-name">Nome da Newsletter</Label>
                  <Input
                    id="newsletter-name"
                    defaultValue="Lancei Essa - Atualizações Semanais"
                  />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="sender-name">Nome do Remetente</Label>
                  <Input
                    id="sender-name"
                    defaultValue="João Silva | Lancei Essa"
                  />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="sender-email">Email do Remetente</Label>
                  <Input
                    id="sender-email"
                    type="email"
                    defaultValue="newsletter@lanceiessa.com"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Confirmação de Inscrição</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Exigir confirmação por email para novos inscritos
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <BrandButton className="w-full sm:w-auto">
                  Salvar Configurações
                </BrandButton>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Import for Tabs component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
