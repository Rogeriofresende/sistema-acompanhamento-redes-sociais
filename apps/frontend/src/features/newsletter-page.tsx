import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  MailIcon,
  ArrowLeftIcon,
  SendIcon,
  FileTextIcon,
  PlusIcon,
  TrashIcon,
  SaveIcon,
  VideoIcon,
  CheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for videos
const mockVideos = [
  {
    id: "video1",
    title: "Como aumentar seu engajamento no YouTube em 2023",
    publishedAt: "2023-06-15",
  },
  {
    id: "video2",
    title: "Dicas para editar vídeos como um profissional",
    publishedAt: "2023-07-02",
  },
  {
    id: "video3",
    title: "Os melhores equipamentos para criadores de conteúdo",
    publishedAt: "2023-07-20",
  },
  {
    id: "video4",
    title: "Como criar thumbnails que atraem mais cliques",
    publishedAt: "2023-08-05",
  },
];

// Mock data for newsletter templates
const mockTemplates = [
  { id: "template1", name: "Newsletter Semanal" },
  { id: "template2", name: "Novidades do Canal" },
  { id: "template3", name: "Resumo Mensal" },
];

interface NewsletterPageProps {
  onBackToDashboard: () => void;
}

export default function NewsletterPage({
  onBackToDashboard,
}: NewsletterPageProps) {
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [newsletterTitle, setNewsletterTitle] = useState<string>("");
  const [newsletterContent, setNewsletterContent] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
    // In a real app, this would fetch the video content and populate the newsletter
    const video = mockVideos.find((v) => v.id === videoId);
    if (video) {
      setNewsletterTitle(`Newsletter: ${video.title}`);
      setNewsletterContent(
        `Olá,\n\nAcabamos de lançar um novo vídeo: "${video.title}".\n\nNeste vídeo, abordamos tópicos importantes como...\n\nConfira o vídeo completo em nosso canal e não se esqueça de deixar seu like e comentário!\n\nAté a próxima,\nEquipe Lancei Essa`
      );
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    // In a real app, this would load the template content
  };

  const handleSaveNewsletter = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleSendNewsletter = () => {
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6" id="3j1zw5">
      <div className="flex items-center justify-between" id="psfl2l">
        <div id="epfemv">
          <h1
            className="text-3xl font-bold text-gray-900 dark:text-white"
            id="04z58x"
          >
            Newsletter
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1" id="og70k6">
            Crie e envie newsletters a partir do conteúdo dos seus vídeos
          </p>
        </div>
        <Button
          variant="outline"
          onClick={onBackToDashboard}
          className="flex items-center space-x-2"
          id="42z0kk"
        >
          <ArrowLeftIcon className="h-4 w-4" id="iwlzb6" />

          <span id="kko72g">Voltar ao Dashboard</span>
        </Button>
      </div>

      {showSuccess && (
        <div
          className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-md p-4 flex items-center"
          id="9zey15"
        >
          <CheckIcon className="h-5 w-5 mr-2" id="p54fiv" />

          <span id="k1y9zr">Operação realizada com sucesso!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="m45r3f">
        {/* Left sidebar - Video selection */}
        <Card id="60813r">
          <CardHeader id="467kas">
            <CardTitle className="flex items-center" id="lxaroc">
              <VideoIcon className="mr-2 h-5 w-5 text-gray-500" id="cltdxi" />
              Selecionar Vídeo
            </CardTitle>
            <CardDescription id="s120yx">
              Escolha um vídeo para criar sua newsletter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4" id="92g1y6">
            {mockVideos.map((video, index) => (
              <div
                key={video.id}
                className={`p-3 border rounded-md cursor-pointer transition-colors ${
                  selectedVideo === video.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                }`}
                onClick={() => handleVideoSelect(video.id)}
                id={`fh6p8j_${index}`}
              >
                <h3
                  className="font-medium text-gray-900 dark:text-white text-sm"
                  id={`qwiy8h_${index}`}
                >
                  {video.title}
                </h3>
                <p
                  className="text-xs text-gray-500 dark:text-gray-400 mt-1"
                  id={`qwpohc_${index}`}
                >
                  Publicado em: {video.publishedAt}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Center - Newsletter editor */}
        <Card className="lg:col-span-2" id="x7pd6h">
          <CardHeader id="fpxzpc">
            <CardTitle className="flex items-center" id="wscp8l">
              <MailIcon className="mr-2 h-5 w-5 text-gray-500" id="6qv6qi" />
              Editor de Newsletter
            </CardTitle>
            <CardDescription id="30b6vw">
              Crie e personalize sua newsletter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4" id="0ysube">
            <div className="flex items-center space-x-4" id="2fchvo">
              <div className="flex-1" id="lophhr">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  id="srrkv4"
                >
                  Modelo
                </label>
                <Select
                  onValueChange={handleTemplateSelect}
                  value={selectedTemplate}
                  id="58ospa"
                >
                  <SelectTrigger id="tb88wi">
                    <SelectValue
                      placeholder="Selecione um modelo"
                      id="d4dyfm"
                    />
                  </SelectTrigger>
                  <SelectContent id="5u2g99">
                    {mockTemplates.map((template, index) => (
                      <SelectItem
                        key={template.id}
                        value={template.id}
                        id={`dv674v_${index}`}
                      >
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div id="k94myk">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  id="kqxcvo"
                >
                  &nbsp;
                </label>
                <Button variant="outline" size="icon" id="d78yrb">
                  <PlusIcon className="h-4 w-4" id="0ik0on" />
                </Button>
              </div>
            </div>

            <div id="0ncu7m">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                id="hej9is"
              >
                Título da Newsletter
              </label>
              <Input
                value={newsletterTitle}
                onChange={(e) => setNewsletterTitle(e.target.value)}
                placeholder="Digite o título da sua newsletter"
                id="daez52"
              />
            </div>

            <div id="opfbt2">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                id="oz55cq"
              >
                Conteúdo
              </label>
              <Textarea
                value={newsletterContent}
                onChange={(e) => setNewsletterContent(e.target.value)}
                placeholder="Digite o conteúdo da sua newsletter"
                className="min-h-[200px]"
                id="qr21nh"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between" id="qvqkwp">
            <div className="flex space-x-2" id="1bzmyd">
              <Button
                variant="outline"
                disabled={isSaving || isSending}
                id="520r6k"
              >
                <FileTextIcon className="mr-2 h-4 w-4" id="u6zool" />
                Visualizar
              </Button>
              <Button
                variant="outline"
                onClick={handleSaveNewsletter}
                disabled={
                  !newsletterTitle ||
                  !newsletterContent ||
                  isSaving ||
                  isSending
                }
                id="j9kdav"
              >
                {isSaving ? (
                  <>
                    <div
                      className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                      id="6itwqx"
                    />
                    Salvando...
                  </>
                ) : (
                  <>
                    <SaveIcon className="mr-2 h-4 w-4" id="gdrk1i" />
                    Salvar
                  </>
                )}
              </Button>
            </div>
            <Button
              onClick={handleSendNewsletter}
              disabled={
                !newsletterTitle || !newsletterContent || isSaving || isSending
              }
              id="jmc7u8"
            >
              {isSending ? (
                <>
                  <div
                    className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                    id="3mrnq6"
                  />
                  Enviando...
                </>
              ) : (
                <>
                  <SendIcon className="mr-2 h-4 w-4" id="2qojjo" />
                  Enviar Newsletter
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Newsletters */}
      <Card id="1tk7my">
        <CardHeader id="4bcco4">
          <CardTitle className="flex items-center" id="rq06kw">
            <MailIcon className="mr-2 h-5 w-5 text-gray-500" id="y17fcn" />
            Newsletters Recentes
          </CardTitle>
          <CardDescription id="rufk2l">
            Histórico das suas newsletters enviadas
          </CardDescription>
        </CardHeader>
        <CardContent id="dwntwd">
          <div className="overflow-x-auto" id="5o3cu7">
            <table className="w-full text-sm" id="610iow">
              <thead id="mfyxr7">
                <tr
                  className="border-b border-gray-200 dark:border-gray-700"
                  id="t9q7jk"
                >
                  <th
                    className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                    id="0ssocm"
                  >
                    Título
                  </th>
                  <th
                    className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                    id="buskra"
                  >
                    Data de Envio
                  </th>
                  <th
                    className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                    id="rtyeav"
                  >
                    Destinatários
                  </th>
                  <th
                    className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                    id="kpwlih"
                  >
                    Taxa de Abertura
                  </th>
                  <th
                    className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                    id="tkckaj"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody id="ms1s2c">
                <tr
                  className="border-b border-gray-200 dark:border-gray-700"
                  id="p9l3in"
                >
                  <td className="py-3 px-4" id="p46gsg">
                    Newsletter: Como aumentar seu engajamento no YouTube
                  </td>
                  <td className="py-3 px-4" id="o5rub0">
                    20/06/2023
                  </td>
                  <td className="py-3 px-4" id="j9waeg">
                    1,245
                  </td>
                  <td className="py-3 px-4" id="efgek1">
                    68%
                  </td>
                  <td className="py-3 px-4" id="vb5q1e">
                    <div className="flex space-x-2" id="hfd76x">
                      <Button variant="ghost" size="sm" id="ponotb">
                        <FileTextIcon className="h-4 w-4" id="293w4p" />
                      </Button>
                      <Button variant="ghost" size="sm" id="c4zh54">
                        <TrashIcon
                          className="h-4 w-4 text-red-500"
                          id="aelzla"
                        />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr
                  className="border-b border-gray-200 dark:border-gray-700"
                  id="ti2k0q"
                >
                  <td className="py-3 px-4" id="qzmkhh">
                    Newsletter: Dicas para editar vídeos
                  </td>
                  <td className="py-3 px-4" id="yk0pjg">
                    05/07/2023
                  </td>
                  <td className="py-3 px-4" id="s99xhe">
                    1,356
                  </td>
                  <td className="py-3 px-4" id="i8lwqb">
                    72%
                  </td>
                  <td className="py-3 px-4" id="t3cbu3">
                    <div className="flex space-x-2" id="pphe77">
                      <Button variant="ghost" size="sm" id="xg081p">
                        <FileTextIcon className="h-4 w-4" id="s8c4bn" />
                      </Button>
                      <Button variant="ghost" size="sm" id="6xnmcf">
                        <TrashIcon
                          className="h-4 w-4 text-red-500"
                          id="cckssd"
                        />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr id="ivi8mo">
                  <td className="py-3 px-4" id="v4td4y">
                    Newsletter: Os melhores equipamentos
                  </td>
                  <td className="py-3 px-4" id="957bmk">
                    22/07/2023
                  </td>
                  <td className="py-3 px-4" id="2wjpbr">
                    1,489
                  </td>
                  <td className="py-3 px-4" id="546085">
                    75%
                  </td>
                  <td className="py-3 px-4" id="hr5jke">
                    <div className="flex space-x-2" id="k8hem1">
                      <Button variant="ghost" size="sm" id="lr5run">
                        <FileTextIcon className="h-4 w-4" id="3fwn4m" />
                      </Button>
                      <Button variant="ghost" size="sm" id="nc4m2i">
                        <TrashIcon
                          className="h-4 w-4 text-red-500"
                          id="o6rz1x"
                        />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
