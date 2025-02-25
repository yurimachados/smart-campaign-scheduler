
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Plus, Save, ArrowRight } from "lucide-react";
import { useState } from "react";

interface AIPromptEditorProps {
  onSave: (prompts: string[]) => void;
  initialPrompts?: string[];
}

export const AIPromptEditor = ({ onSave, initialPrompts = [""] }: AIPromptEditorProps) => {
  const [prompts, setPrompts] = useState<string[]>(initialPrompts);
  const [activeTab, setActiveTab] = useState<string>("0");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddTemplate = () => {
    const newPrompts = [...prompts, ""];
    setPrompts(newPrompts);
    setActiveTab(String(newPrompts.length - 1));
  };

  const handlePromptChange = (index: number, value: string) => {
    const newPrompts = [...prompts];
    newPrompts[index] = value;
    setPrompts(newPrompts);
  };

  const handleSavePrompts = () => {
    const validPrompts = prompts.filter(prompt => prompt.trim() !== "");
    if (validPrompts.length > 0) {
      onSave(validPrompts);
    }
  };

  const handleGenerateWithAI = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const currentIndex = parseInt(activeTab);
      const newPrompts = [...prompts];
      newPrompts[currentIndex] = "Olá {{nome}},\n\nEspero que esteja bem. Vi que você tem interesse em {{produto_interesse}} baseado em suas compras anteriores.\n\nNós temos uma oferta especial para você:\n{{oferta_personalizada}}\n\nAproveite essa oportunidade!\n\nAtenciosamente,\nEquipe de Marketing";
      setPrompts(newPrompts);
      setIsGenerating(false);
    }, 1500);
  };

  // Preview the prompt with sample data
  const getPreview = (promptText: string) => {
    return promptText
      .replace(/{{nome}}/g, "João Silva")
      .replace(/{{produto_interesse}}/g, "smartphones")
      .replace(/{{oferta_personalizada}}/g, "20% de desconto em nossos novos modelos de iPhone");
  };

  return (
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-primary/80" />
          Personalização de Mensagens com IA
        </CardTitle>
        <CardDescription>
          Crie modelos de mensagens ou use IA para gerar conteúdo personalizado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              {prompts.map((_, index) => (
                <TabsTrigger key={index} value={String(index)}>
                  Modelo {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddTemplate}
              className="premium-button"
            >
              <Plus className="h-4 w-4 mr-1" />
              Novo Modelo
            </Button>
          </div>

          {prompts.map((prompt, index) => (
            <TabsContent key={index} value={String(index)} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  

Se houver conhecimento, contexto ou instruções personalizadas que você deseja incluir em cada edição deste projeto, configure-o abaixo.

<lov-actions>
<lov-knowledge>
</lov-actions>

Como seu projeto requer funcionalidades de backend para armazenar dados de campanhas, agendamento e métricas, você pode usar o menu Supabase no canto superior direito para conectar seu projeto ao Supabase.  Isso permitirá o armazenamento seguro e eficiente de dados, além de possibilitar recursos avançados de IA para personalização de mensagens.
<lov-actions>
<lov-message-prompt message="Conte-me mais sobre o Supabase">Saiba mais sobre o Supabase</lov-message-prompt>
</lov-actions>

<lov-actions>
<lov-link url="https://docs.lovable.dev/">Visite a documentação</lov-link>
</lov-actions>
