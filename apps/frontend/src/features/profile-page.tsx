import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrandButton } from "@/features/brand-button";
import { PageHeader } from "@/features/page-header";
import {
  UserIcon,
  CameraIcon,
  LinkIcon,
  YoutubeIcon,
  InstagramIcon,
  TwitterIcon,
} from "lucide-react";

interface ProfilePageProps {
  onBackToDashboard?: () => void;
}

export default function ProfilePage({ onBackToDashboard }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "João Silva",
    email: "joao@lanceiessa.com",
    youtube: "https://youtube.com/lanceiessa",
    instagram: "https://instagram.com/lanceiessa",
    twitter: "https://twitter.com/lanceiessa",
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes logic would go here
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Perfil"
        description="Gerencie suas informações pessoais e do canal"
        onNavigateToVideos={onBackToDashboard}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl">Informações do Perfil</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800 shadow-md">
                  <img
                    src="https://github.com/yusufhilmi.png"
                    alt="Avatar"
                    className="object-cover"
                  />
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                  >
                    <CameraIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <h2 className="text-xl font-bold">{profileData.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {profileData.email}
              </p>

              <div className="w-full mt-6 space-y-4">
                <BrandButton
                  variant={isEditing ? "default" : "outline"}
                  className="w-full"
                  onClick={handleEditToggle}
                >
                  {isEditing ? "Salvar Alterações" : "Editar Perfil"}
                </BrandButton>
              </div>

              {/* Channel statistics section removed as requested */}
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Detalhes do Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
                <TabsTrigger value="social">Redes Sociais</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                        {profileData.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                        {profileData.email}
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <YoutubeIcon className="h-5 w-5 text-red-600 mr-2" />

                    <Label htmlFor="youtube" className="w-24">
                      YouTube
                    </Label>
                    {isEditing ? (
                      <Input
                        id="youtube"
                        name="youtube"
                        value={profileData.youtube}
                        onChange={handleInputChange}
                        className="flex-1"
                      />
                    ) : (
                      <a
                        href={profileData.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-violet-600 dark:text-violet-400 hover:underline flex items-center"
                      >
                        {profileData.youtube}
                        <LinkIcon className="h-4 w-4 ml-1" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center">
                    <InstagramIcon className="h-5 w-5 text-pink-600 mr-2" />

                    <Label htmlFor="instagram" className="w-24">
                      Instagram
                    </Label>
                    {isEditing ? (
                      <Input
                        id="instagram"
                        name="instagram"
                        value={profileData.instagram}
                        onChange={handleInputChange}
                        className="flex-1"
                      />
                    ) : (
                      <a
                        href={profileData.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-violet-600 dark:text-violet-400 hover:underline flex items-center"
                      >
                        {profileData.instagram}
                        <LinkIcon className="h-4 w-4 ml-1" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center">
                    <TwitterIcon className="h-5 w-5 text-blue-500 mr-2" />

                    <Label htmlFor="twitter" className="w-24">
                      Twitter
                    </Label>
                    {isEditing ? (
                      <Input
                        id="twitter"
                        name="twitter"
                        value={profileData.twitter}
                        onChange={handleInputChange}
                        className="flex-1"
                      />
                    ) : (
                      <a
                        href={profileData.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-violet-600 dark:text-violet-400 hover:underline flex items-center"
                      >
                        {profileData.twitter}
                        <LinkIcon className="h-4 w-4 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* YouTube Account Card */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-xl">
              Conta do YouTube Conectada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mr-4">
                  <YoutubeIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-medium">Lancei Essa</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Canal conectado em 15/01/2024
                  </p>
                </div>
              </div>
              <BrandButton variant="outline">Reconectar</BrandButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
