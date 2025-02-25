
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Users, Calendar } from "lucide-react";
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

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [audienceSize, setAudienceSize] = useState<string>("small");
  const [prompts, setPrompts] = useState<string[]>(["Olá {{nome}},\n\nBem-vindo à nossa campanha!\n\nAtenciosamente,\nEquipe de Marketing"]);
  const [isCreating, setIsCreating] = useState(false);

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

  const audienceOptions = {
    small: { label: "Pequena (até 500 contatos)", value: "500" },
    medium: { label: "Média (até 2.000 contatos)", value: "2000" },
    large: { label: "Grande (até 5.000 contatos)", value: "5000" },
    xlarge: { label: "Extra grande (até 10.000 contatos)", value: "10000" }
  };

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
                <h2 className="text-xl font-semibold">Configuração de Audiência</h2>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="audienceSize" className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        Tamanho da Audiência
                      </Label>
                      <Select 
                        value={audienceSize}
                        onValueChange={setAudienceSize}
                      >
                        <SelectTrigger id="audienceSize">
                          <SelectValue placeholder="Selecione o tamanho da audiência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">{audienceOptions.small.label}</SelectItem>
                          <SelectItem value="medium">{audienceOptions.medium.label}</SelectItem>
                          <SelectItem value="large">{audienceOptions.large.label}</SelectItem>
                          <SelectItem value="xlarge">{audienceOptions.xlarge.label}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
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
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Conteúdo da Mensagem</h2>
            <AIPromptEditor 
              initialPrompts={prompts} 
              onSave={handleSavePrompts} 
            />
          </div>

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
