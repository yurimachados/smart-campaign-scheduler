
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format, addHours } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Shield, AlertTriangle, Clock, CalendarClock } from "lucide-react";

interface SendingMetricsCardProps {
  messagesPerHour: number;
  totalContacts: number;
  isScheduled: boolean;
  scheduledDate: string;
  sendingSpeedType: string;
}

export const SendingMetricsCard = ({
  messagesPerHour,
  totalContacts,
  isScheduled,
  scheduledDate,
  sendingSpeedType,
}: SendingMetricsCardProps) => {
  // Calculate metrics
  const messagesPerDay = messagesPerHour * 24;
  const estimatedDays = Math.ceil(totalContacts / messagesPerDay);
  const estimatedHours = Math.ceil(totalContacts / messagesPerHour);
  
  // Format completion date
  const startDate = isScheduled && scheduledDate 
    ? new Date(scheduledDate)
    : new Date();
  
  const completionDate = addHours(startDate, estimatedHours);
  const formattedCompletionDate = format(completionDate, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });

  // Safety indicators based on sending speed
  const getSafetyInfo = () => {
    switch (sendingSpeedType) {
      case "safe":
        return {
          icon: <Shield className="h-5 w-5 text-green-500" />,
          label: "Segura",
          description: "Velocidade de envio segura para evitar bloqueios",
          color: "bg-green-500",
          percentage: 25
        };
      case "medium":
        return {
          icon: <Shield className="h-5 w-5 text-blue-500" />,
          label: "Moderada",
          description: "Velocidade balanceada entre segurança e eficiência",
          color: "bg-blue-500",
          percentage: 50
        };
      case "fast":
        return {
          icon: <Shield className="h-5 w-5 text-amber-500" />,
          label: "Rápida",
          description: "Velocidade elevada com algum risco de bloqueio",
          color: "bg-amber-500",
          percentage: 75
        };
      case "instant":
        return {
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
          label: "Instantânea",
          description: "Alta velocidade com risco elevado de bloqueio",
          color: "bg-red-500",
          percentage: 95
        };
      default:
        return {
          icon: <Shield className="h-5 w-5 text-muted-foreground" />,
          label: "Personalizada",
          description: "Configuração personalizada",
          color: "bg-primary",
          percentage: 60
        };
    }
  };

  const safetyInfo = getSafetyInfo();

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Métricas de Envio</h2>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Velocidade de Envio</span>
                </div>
                <span className="text-sm font-bold">{messagesPerHour} msgs/hora</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Mensagens por Dia</span>
                </div>
                <span className="text-sm font-bold">{messagesPerDay} msgs/dia</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Tempo Estimado</span>
                </div>
                <span className="text-sm font-bold">
                  {estimatedDays === 0 ? "< 1 dia" : 
                   estimatedDays === 1 ? "1 dia" : 
                   `${estimatedDays} dias`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Conclusão Estimada</span>
                </div>
                <span className="text-sm font-bold whitespace-nowrap text-xs">
                  {formattedCompletionDate}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {safetyInfo.icon}
                <div>
                  <h3 className="font-medium text-sm">{safetyInfo.label}</h3>
                  <p className="text-xs text-muted-foreground">{safetyInfo.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Segurança</span>
                  <span className="text-xs font-medium">Velocidade</span>
                </div>
                <Progress value={safetyInfo.percentage} className="h-2" 
                  style={{ 
                    "--progress-foreground": `var(--${safetyInfo.color})`,
                  } as React.CSSProperties} 
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Mais Seguro</span>
                  <span className="text-xs text-muted-foreground">Mais Rápido</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
