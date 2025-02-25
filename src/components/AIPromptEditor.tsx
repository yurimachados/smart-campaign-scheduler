
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
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Editor</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleGenerateWithAI}
                      disabled={isGenerating}
                      className="h-7 gap-1 text-xs"
                    >
                      <Sparkles className="h-3 w-3" />
                      {isGenerating ? "Gerando..." : "Gerar com IA"}
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Digite sua mensagem aqui ou use a IA para gerar automaticamente..."
                    value={prompt}
                    onChange={(e) => handlePromptChange(index, e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="bg-muted/50 cursor-pointer hover:bg-muted" onClick={() => handlePromptChange(index, prompt + "{{nome}}")}>
                      {'{{nome}}'}
                    </Badge>
                    <Badge variant="outline" className="bg-muted/50 cursor-pointer hover:bg-muted" onClick={() => handlePromptChange(index, prompt + "{{produto_interesse}}")}>
                      {'{{produto_interesse}}'}
                    </Badge>
                    <Badge variant="outline" className="bg-muted/50 cursor-pointer hover:bg-muted" onClick={() => handlePromptChange(index, prompt + "{{oferta_personalizada}}")}>
                      {'{{oferta_personalizada}}'}
                    </Badge>
                    <Badge variant="outline" className="bg-muted/50 cursor-pointer hover:bg-muted" onClick={() => handlePromptChange(index, prompt + "{{empresa}}")}>
                      {'{{empresa}}'}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Pré-visualização</h4>
                  <div className="border rounded-md p-4 min-h-[200px] bg-muted/30">
                    {prompt ? (
                      <div className="whitespace-pre-wrap">{getPreview(prompt)}</div>
                    ) : (
                      <p className="text-muted-foreground text-sm italic">A pré-visualização aparecerá aqui...</p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onSave(initialPrompts)}>
          Cancelar
        </Button>
        <Button onClick={handleSavePrompts} className="premium-button">
          <Save className="h-4 w-4 mr-1" />
          Salvar Modelos
        </Button>
      </CardFooter>
    </Card>
  );
};
