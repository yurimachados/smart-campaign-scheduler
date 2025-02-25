
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge, StatusType } from "@/components/StatusBadge";
import { CampaignStats } from "@/components/CampaignStats";
import { AIPromptEditor } from "@/components/AIPromptEditor";
import { ArrowLeft, Pencil, Calendar, PlayCircle, PauseCircle, StopCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

// Dados de exemplo para demonstração
const mockCampaignDetails = {
  "1": {
    id: "1",
    name: "Campanha de Lançamento - Produto X",
    description: "Campanha para promover o lançamento do novo Produto X para nossa base de clientes premium.",
    startDate: new Date(2023, 5, 15),
    sentCount: 125,
    totalRecipients: 150,
    status: "completed" as StatusType,
    openRate: 68,
    clickRate: 32,
    bounceRate: 2,
    prompts: [
      "Olá {{nome}},\n\nTemos o prazer de anunciar o lançamento do nosso mais novo produto: {{produto}}!\n\nComo cliente valioso da {{empresa}}, você tem acesso antecipado a esta oferta especial.\n\nConfira agora mesmo e aproveite 15% de desconto na compra!\n\nAtenciosamente,\nEquipe de Marketing"
    ]
  },
  "2": {
    id: "2",
    name: "Promoção de Inverno 2023",
    description: "Campanha sazonal para promover produtos de inverno com descontos especiais.",
    startDate: new Date(2023, 6, 1),
    sentCount: 45,
    totalRecipients: 200,
    status: "sending" as StatusType,
    openRate: 42,
    clickRate: 18,
    bounceRate: 3,
    prompts: [
      "Olá {{nome}},\n\nO inverno chegou e trouxe ofertas imperdíveis!\n\nSabemos que você gosta de {{produto_interesse}} e preparamos descontos especiais em toda nossa linha de inverno.\n\nAproveite até 30% OFF em produtos selecionados.\n\nAtenciosamente,\nEquipe de Marketing"
    ]
  },
  "3": {
    id: "3",
    name: "Reengajamento de Clientes Inativos",
    description: "Campanha para reconectar com clientes que não fizeram compras nos últimos 6 meses.",
    startDate: new Date(2023, 6, 10),
    sentCount: 0,
    totalRecipients: 350,
    status: "scheduled" as StatusType,
    openRate: 0,
    clickRate: 0,
    bounceRate: 0,
    prompts: [
      "Olá {{nome}},\n\nSentimos sua falta!\n\nNotamos que faz algum tempo desde sua última compra na {{empresa}}.\n\nPara celebrar seu retorno, preparamos um cupom especial de {{oferta_personalizada}} válido por 7 dias.\n\nEstamos ansiosos para atendê-lo novamente!\n\nAtenciosamente,\nEquipe de Marketing"
    ]
  },
  "4": {
    id: "4",
    name: "Newsletter Mensal - Agosto",
    description: "Newsletter mensal com novidades, dicas e ofertas exclusivas.",
    startDate: new Date(2023, 7, 5),
    sentCount: 0,
    totalRecipients: 500,
    status: "scheduled" as StatusType,
    openRate: 0,
    clickRate: 0,
    bounceRate: 0,
    prompts: [
      "Olá {{nome}},\n\nConfira as novidades de Agosto:\n\n- Lançamento de novos produtos\n- Dicas de como usar {{produto_interesse}}\n- Ofertas exclusivas para assinantes da newsletter\n\nAproveite {{oferta_personalizada}} usando o cupom AGOSTO2023.\n\nAtenciosamente,\nEquipe de Marketing"
    ]
  },
  "5": {
    id: "5",
    name: "Black Friday - Pré-venda",
    description: "Campanha pré-Black Friday para fidelizar clientes com ofertas antecipadas.",
    startDate: new Date(2023, 10, 15),
    sentCount: 0,
    totalRecipients: 1000,
    status: "paused" as StatusType,
    openRate: 0,
    clickRate: 0,
    bounceRate: 0,
    prompts: [
      "Olá {{nome}},\n\nA Black Friday está chegando, mas você não precisa esperar!\n\nComo cliente VIP da {{empresa}}, você tem acesso antecipado às nossas melhores ofertas.\n\nSabemos do seu interesse em {{produto_interesse}} e separamos descontos especiais de até 50% OFF.\n\nGaranta já seus produtos favoritos antes que acabem!\n\nAtenciosamente,\nEquipe de Marketing"
    ]
  },
};

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<string>("");

  useEffect(() => {
    // Simulando carregamento de dados
    setLoading(true);
    setTimeout(() => {
      if (id && mockCampaignDetails[id as keyof typeof mockCampaignDetails]) {
        const campaignData = mockCampaignDetails[id as keyof typeof mockCampaignDetails];
        setCampaign(campaignData);
        setPrompts(campaignData.prompts);
        setIsScheduled(campaignData.status === "scheduled");
        
        if (campaignData.startDate) {
          const dateObj = new Date(campaignData.startDate);
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const day = String(dateObj.getDate()).padStart(2, '0');
          setScheduledDate(`${year}-${month}-${day}`);
        }
      }
      setLoading(false);
    }, 800);
  }, [id]);

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

  const handleStatusChange = (newStatus: StatusType) => {
    setCampaign({
      ...campaign,
      status: newStatus
    });
    
    const statusMessages = {
      scheduled: "Campanha agendada com sucesso",
      sending: "Campanha iniciada com sucesso",
      paused: "Campanha pausada com sucesso",
      cancelled: "Campanha cancelada com sucesso"
    };
    
    toast({
      title: statusMessages[newStatus as keyof typeof statusMessages],
      description: `Status da campanha atualizado para ${newStatus}.`,
    });
  };

  if (loading) {
    return (
      <div className="container py-12 flex justify-center items-center">
        <div className="animate-pulse text-center">
          <p className="text-lg text-muted-foreground">Carregando detalhes da campanha...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="container py-12">
        <Button variant="ghost" onClick={handleGoBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Campanha não encontrada</h2>
          <p className="text-muted-foreground">
            A campanha que você está procurando não existe ou foi removida.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-6xl animate-fade-in">
      <Button variant="ghost" onClick={handleGoBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar para campanhas
      </Button>

      <div className="flex flex-col space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
              <StatusBadge status={campaign.status} />
            </div>
            <p className="text-muted-foreground">{campaign.description}</p>
          </div>
          <div className="flex items-center gap-2">
            {campaign.status === "scheduled" && (
              <Button 
                variant="outline" 
                onClick={() => handleStatusChange("sending")}
                className="premium-button"
              >
                <PlayCircle className="h-4 w-4 mr-1" />
                Iniciar Agora
              </Button>
            )}
            {campaign.status === "sending" && (
              <Button 
                variant="outline" 
                onClick={() => handleStatusChange("paused")}
                className="premium-button"
              >
                <PauseCircle className="h-4 w-4 mr-1" />
                Pausar
              </Button>
            )}
            {campaign.status === "paused" && (
              <Button 
                variant="outline" 
                onClick={() => handleStatusChange("sending")}
                className="premium-button"
              >
                <PlayCircle className="h-4 w-4 mr-1" />
                Retomar
              </Button>
            )}
            {(campaign.status === "scheduled" || campaign.status === "paused") && (
              <Button 
                variant="destructive" 
                onClick={() => handleStatusChange("cancelled")}
                className="premium-button"
              >
                <StopCircle className="h-4 w-4 mr-1" />
                Cancelar
              </Button>
            )}
            <Button variant="default" className="premium-button">
              <Pencil className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </div>
        </div>

        <CampaignStats 
          totalSent={campaign.sentCount}
          totalRecipients={campaign.totalRecipients}
          openRate={campaign.openRate}
          clickRate={campaign.clickRate}
          bounceRate={campaign.bounceRate}
        />

        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Configuração de Envio</h2>
            
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-4">
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
                  
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="sendLimit">Limite de envios por hora</Label>
                      <Select defaultValue="100">
                        <SelectTrigger id="sendLimit">
                          <SelectValue placeholder="Selecione o limite" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">50 mensagens/hora</SelectItem>
                          <SelectItem value="100">100 mensagens/hora</SelectItem>
                          <SelectItem value="250">250 mensagens/hora</SelectItem>
                          <SelectItem value="500">500 mensagens/hora</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Limitar a taxa de envio ajuda a evitar bloqueios e garantir entregas.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Conteúdo da Mensagem</h2>
            <AIPromptEditor 
              initialPrompts={prompts} 
              onSave={handleSavePrompts} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
