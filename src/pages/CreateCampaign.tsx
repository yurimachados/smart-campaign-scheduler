
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Calendar, Smartphone, Gauge, Users, ImageIcon, X, Plus, UploadCloud } from "lucide-react";
import { AIPromptEditor } from "@/components/AIPromptEditor";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SendingMetricsCard } from "@/components/SendingMetricsCard";
import { ContactsSelectionDialog } from "@/components/ContactsSelectionDialog";
import { CampaignImage } from "@/components/contacts-selection/types";

// Tipo de velocidade de envio
interface SendingSpeed {
  type: string;
  minDelay: number;
  maxDelay: number;
  messagesPerHour: number;
  description?: string;
  customizable?: boolean;
}

// Interface para contatos
interface Contact {
  id: string;
  name: string;
  phone: string;
  carteira?: string;
  squad?: string;
}

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [whatsappInstance, setWhatsappInstance] = useState("");
  const [sendingSpeed, setSendingSpeed] = useState<string>("safe");
  const [contactsList, setContactsList] = useState<string>("");
  const [prompts, setPrompts] = useState<string[]>(["Olá {{nome}},\n\nBem-vindo à nossa campanha!\n\nAtenciosamente,\nEquipe de Marketing"]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [campaignImages, setCampaignImages] = useState<CampaignImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Configurações de velocidade de envio
  const speedSettings: Record<string, SendingSpeed> = {
    safe: {
      type: "safe",
      minDelay: 20,
      maxDelay: 30,
      messagesPerHour: 144
    },
    medium: {
      type: "medium",
      minDelay: 10,
      maxDelay: 15,
      messagesPerHour: 288
    },
    fast: {
      type: "fast",
      minDelay: 5,
      maxDelay: 8,
      messagesPerHour: 553
    },
    instant: {
      type: "instant",
      minDelay: 1,
      maxDelay: 3,
      messagesPerHour: 1800
    },
    custom: {
      type: "custom",
      description: "Configuração personalizada de delays",
      customizable: true,
      minDelay: 0,
      maxDelay: 0,
      messagesPerHour: 0
    }
  };

  // Lista de instâncias de WhatsApp disponíveis
  const whatsappInstances = [
    { id: "instance1", name: "Instância Principal" },
    { id: "instance2", name: "Instância de Backup" },
    { id: "instance3", name: "Instância de Marketing" },
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSavePrompts = (newPrompts: string[]) => {
    setPrompts(newPrompts);
    toast({
      title: "Modelos salvos",
      description: "Os modelos de mensagens foram salvos com sucesso.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!campaignName.trim()) {
      toast({
        title: "Erro na criação",
        description: "O nome da campanha é obrigatório.",
        variant: "destructive"
      });
      return;
    }

    if (!whatsappInstance) {
      toast({
        title: "Erro na criação",
        description: "É necessário selecionar uma instância do WhatsApp.",
        variant: "destructive"
      });
      return;
    }

    if (!contactsList) {
      toast({
        title: "Erro na criação",
        description: "É necessário selecionar uma lista de contatos.",
        variant: "destructive"
      });
      return;
    }
    
    setIsCreating(true);
    
    // Simulando a criação de campanha
    setTimeout(() => {
      setIsCreating(false);
      toast({
        title: "Campanha criada",
        description: "Sua campanha foi criada com sucesso!",
      });
      navigate("/");
    }, 1500);
  };

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const newImages = Array.from(files).map(file => {
      const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      const previewUrl = URL.createObjectURL(file);
      
      return { id, file, previewUrl };
    });
    
    setCampaignImages([...campaignImages, ...newImages]);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const removeImage = (id: string) => {
    const updatedImages = campaignImages.filter(image => image.id !== id);
    const removedImage = campaignImages.find(image => image.id === id);
    
    if (removedImage) {
      URL.revokeObjectURL(removedImage.previewUrl);
    }
    
    setCampaignImages(updatedImages);
    
    toast({
      title: "Imagem removida",
      description: "A imagem foi removida da campanha.",
    });
  };

  // Get the total number of contacts in the selected list
  const getSelectedContactsCount = () => {
    if (!contactsList) return 0;
    const selectedList = contactLists.find(list => list.id === contactsList);
    if (!selectedList) return 0;
    
    // Extract the number from the parentheses in the name
    const match = selectedList.name.match(/\((\d+) contatos\)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Get messages per hour based on the selected sending speed
  const getMessagesPerHour = () => {
    if (!sendingSpeed || !speedSettings[sendingSpeed]) return 0;
    return speedSettings[sendingSpeed].messagesPerHour;
  };
  
  // Manipulador para seleção de contatos
  const handleContactsSelection = (contacts: Contact[]) => {
    setSelectedContacts(contacts);
    // Aqui você pode implementar a lógica para criar uma nova lista com os contatos selecionados
    // ou simplesmente trabalhar com os contatos selecionados
  };
  
  // Manipulador para seleção de lista de contatos
  const handleContactListSelect = (listId: string, listName: string) => {
    setContactsList(listId);
  };

  // Lista de contatos disponíveis (simulada)
  const contactLists = [
    { id: "list1", name: "Clientes Ativos (542 contatos)" },
    { id: "list2", name: "Leads Novos (238 contatos)" },
    { id: "list3", name: "Clientes Inativos (890 contatos)" },
    { id: "list4", name: "Aniversariantes do Mês (45 contatos)" },
  ];

  return (
    <div className="container py-8 max-w-6xl animate-fade-in">
      <Button variant="ghost" onClick={handleGoBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar para campanhas
      </Button>

      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Nova Campanha</h1>
          <p className="text-muted-foreground">
            Configure sua campanha de marketing e personalize suas mensagens
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Informações Básicas</h2>
                
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome da Campanha *</Label>
                    <Input 
                      id="name" 
                      placeholder="Ex: Promoção de Verão 2023" 
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Breve descrição da sua campanha e seus objetivos"
                      value={campaignDescription}
                      onChange={(e) => setCampaignDescription(e.target.value)}
                      className="resize-none h-24"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Configurações</h2>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="whatsappInstance" className="flex items-center">
                        <Smartphone className="h-4 w-4 mr-1 text-muted-foreground" />
                        Instância WhatsApp *
                      </Label>
                      <Select 
                        value={whatsappInstance}
                        onValueChange={setWhatsappInstance}
                      >
                        <SelectTrigger id="whatsappInstance">
                          <SelectValue placeholder="Selecione uma instância" />
                        </SelectTrigger>
                        <SelectContent>
                          {whatsappInstances.map((instance) => (
                            <SelectItem key={instance.id} value={instance.id}>
                              {instance.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="sendingSpeed" className="flex items-center">
                        <Gauge className="h-4 w-4 mr-1 text-muted-foreground" />
                        Velocidade de Envio
                      </Label>
                      <Select 
                        value={sendingSpeed}
                        onValueChange={setSendingSpeed}
                      >
                        <SelectTrigger id="sendingSpeed">
                          <SelectValue placeholder="Selecione a velocidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="safe">
                            Segura ({speedSettings.safe.messagesPerHour} msgs/hora)
                          </SelectItem>
                          <SelectItem value="medium">
                            Média ({speedSettings.medium.messagesPerHour} msgs/hora)
                          </SelectItem>
                          <SelectItem value="fast">
                            Rápida ({speedSettings.fast.messagesPerHour} msgs/hora)
                          </SelectItem>
                          <SelectItem value="instant">
                            Instantânea ({speedSettings.instant.messagesPerHour} msgs/hora)
                          </SelectItem>
                          <SelectItem value="custom">
                            Personalizada
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        {sendingSpeed !== "custom" ? 
                          `Delay entre mensagens: ${speedSettings[sendingSpeed].minDelay}-${speedSettings[sendingSpeed].maxDelay} segundos` : 
                          "Configure os delays de acordo com sua necessidade"
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="contactsList" className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        Lista de Contatos *
                      </Label>
                      <ContactsSelectionDialog 
                        onSelectionChange={handleContactsSelection} 
                        selectedListId={contactsList}
                        onListSelect={handleContactListSelect}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="schedule" 
                          checked={isScheduled}
                          onCheckedChange={setIsScheduled}
                        />
                        <Label htmlFor="schedule" className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          Agendar envio
                        </Label>
                      </div>
                      
                      {isScheduled && (
                        <div className="grid gap-2">
                          <Label htmlFor="date">Data de envio</Label>
                          <input
                            type="date"
                            id="date"
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Adding the sending metrics card */}
          {contactsList && sendingSpeed && (
            <SendingMetricsCard 
              messagesPerHour={getMessagesPerHour()}
              totalContacts={getSelectedContactsCount()}
              isScheduled={isScheduled}
              scheduledDate={scheduledDate}
              sendingSpeedType={sendingSpeed}
            />
          )}

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Conteúdo da Mensagem</h2>
            <AIPromptEditor 
              initialPrompts={prompts} 
              onSave={handleSavePrompts} 
            />
          </div>

          {/* Image Attachment Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Anexar Imagens
                </h2>
                <p className="text-sm text-muted-foreground">
                  Adicione imagens para enviar junto com sua mensagem. Formatos aceitos: JPG, PNG, GIF (máx. 5MB por arquivo)
                </p>

                <div className="space-y-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelection}
                    accept="image/jpeg, image/png, image/gif"
                    multiple
                    className="hidden"
                    id="image-upload"
                  />
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-24 border-dashed flex flex-col gap-2"
                  >
                    <UploadCloud className="h-6 w-6" />
                    <span>Clique para selecionar imagens</span>
                  </Button>
                  
                  {campaignImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {campaignImages.map(image => (
                        <div key={image.id} className="relative group">
                          <div className="aspect-square rounded-md overflow-hidden border bg-muted">
                            <img 
                              src={image.previewUrl} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(image.id)}
                            className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remover imagem"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleGoBack}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isCreating}
              className="premium-button"
            >
              <Save className="h-4 w-4 mr-1" />
              {isCreating ? "Criando..." : "Criar Campanha"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;
