
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mail, Users, BarChart3, AlertCircle } from "lucide-react";

interface CampaignStatsProps {
  totalSent: number;
  totalRecipients: number;
  openRate?: number;
  clickRate?: number;
  bounceRate?: number;
}

export const CampaignStats = ({
  totalSent,
  totalRecipients,
  openRate = 0,
  clickRate = 0,
  bounceRate = 0
}: CampaignStatsProps) => {
  const sentPercentage = totalRecipients > 0 ? (totalSent / totalRecipients) * 100 : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
      <Card className="premium-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Mail className="w-5 h-5 mr-2 text-primary/80" />
            Progresso de Envio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Enviadas</span>
              <span className="text-sm font-medium">{totalSent}/{totalRecipients}</span>
            </div>
            <Progress value={sentPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground pt-1">
              {sentPercentage.toFixed(1)}% concluído
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="premium-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary/80" />
            Métricas de Engajamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Abertura</span>
              <span className="text-lg font-medium">{openRate}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Cliques</span>
              <span className="text-lg font-medium">{clickRate}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Rejeições</span>
              <span className="text-lg font-medium">{bounceRate}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
