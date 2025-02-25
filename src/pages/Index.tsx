
import { useState } from "react";
import { CampaignList } from "@/components/CampaignList";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusType } from "@/components/StatusBadge";
import { toast } from "@/components/ui/use-toast";

// Dados de exemplo para demonstração
const mockCampaigns = [
  {
    id: "1",
    name: "Campanha de Lançamento - Produto X",
    startDate: new Date(2023, 5, 15),
    sentCount: 125,
    totalRecipients: 150,
    status: "completed" as StatusType,
  },
  {
    id: "2",
    name: "Promoção de Inverno 2023",
    startDate: new Date(2023, 6, 1),
    sentCount: 45,
    totalRecipients: 200,
    status: "sending" as StatusType,
  },
  {
    id: "3",
    name: "Reengajamento de Clientes Inativos",
    startDate: new Date(2023, 6, 10),
    sentCount: 0,
    totalRecipients: 350,
    status: "scheduled" as StatusType,
  },
  {
    id: "4",
    name: "Newsletter Mensal - Agosto",
    startDate: new Date(2023, 7, 5),
    sentCount: 0,
    totalRecipients: 500,
    status: "scheduled" as StatusType,
  },
  {
    id: "5",
    name: "Black Friday - Pré-venda",
    startDate: new Date(2023, 10, 15),
    sentCount: 0,
    totalRecipients: 1000,
    status: "paused" as StatusType,
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewCampaign = () => {
    navigate("/campaign/new");
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulando um carregamento de dados
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Campanhas atualizadas",
        description: "Lista de campanhas atualizada com sucesso.",
      });
    }, 1000);
  };

  return (
    <div className="container py-8 max-w-6xl animate-fade-in">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campanhas de Marketing</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie campanhas, personalize mensagens e acompanhe resultados
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="premium-button"
            >
              <RefreshCcw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
            <Button 
              size="sm" 
              onClick={handleNewCampaign}
              className="premium-button"
            >
              <Plus className="h-4 w-4 mr-1" />
              Nova Campanha
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-semibold">Suas Campanhas</h2>
            <p className="text-sm text-muted-foreground">
              Visualize, monitore e gerencie todas as suas campanhas de marketing
            </p>
          </div>
          
          <CampaignList campaigns={campaigns} />
        </div>
      </div>
    </div>
  );
};

export default Index;
