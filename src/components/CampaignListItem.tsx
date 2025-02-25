
import { Card } from "@/components/ui/card";
import { StatusBadge, StatusType } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Eye, MoreVertical } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Campaign {
  id: string;
  name: string;
  startDate: Date;
  sentCount: number;
  totalRecipients: number;
  status: StatusType;
}

interface CampaignListItemProps {
  campaign: Campaign;
}

export const CampaignListItem = ({ campaign }: CampaignListItemProps) => {
  const navigate = useNavigate();
  const progress = (campaign.sentCount / campaign.totalRecipients) * 100;
  
  const viewCampaign = () => {
    navigate(`/campaign/${campaign.id}`);
  };
  
  return (
    <Card className="premium-card transition-all duration-300 hover:shadow-elevation">
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        <div className="sm:col-span-3">
          <h3 className="font-medium truncate">{campaign.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Início: {formatDate(campaign.startDate)}
          </p>
        </div>
        
        <div className="sm:col-span-3">
          <p className="text-sm text-muted-foreground mb-1">Progresso</p>
          <div className="flex items-center gap-2">
            <Progress value={progress} className="h-2 flex-grow" />
            <span className="text-sm font-medium min-w-16 text-right">
              {campaign.sentCount}/{campaign.totalRecipients}
            </span>
          </div>
        </div>
        
        <div className="sm:col-span-2 flex justify-start">
          <StatusBadge status={campaign.status} />
        </div>
        
        <div className="sm:col-span-4 flex justify-end items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="premium-button"
            onClick={viewCampaign}
          >
            <Eye className="h-4 w-4 mr-1" />
            Detalhes
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={viewCampaign}>Ver detalhes</DropdownMenuItem>
              {campaign.status === "scheduled" && (
                <DropdownMenuItem>Cancelar agendamento</DropdownMenuItem>
              )}
              {campaign.status === "sending" && (
                <DropdownMenuItem>Pausar envio</DropdownMenuItem>
              )}
              {campaign.status === "paused" && (
                <DropdownMenuItem>Retomar envio</DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};
