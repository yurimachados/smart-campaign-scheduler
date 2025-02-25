
import { Campaign, CampaignListItem } from "@/components/CampaignListItem";

interface CampaignListProps {
  campaigns: Campaign[];
}

export const CampaignList = ({ campaigns }: CampaignListProps) => {
  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
        <div className="mb-4 rounded-full bg-muted p-3">
          <svg
            className="h-6 w-6 text-muted-foreground"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
            <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
            <path d="M13.5 3v18" />
            <path d="M3 13.5h18" />
            <path d="M3 9h4.5" />
            <path d="M3 6h4.5" />
            <path d="M3 18h4.5" />
            <path d="M3 21h4.5" />
            <path d="M20.5 9h-3" />
            <path d="M21 6h-4.5" />
            <path d="M20.5 18h-3" />
            <path d="M21 21h-4.5" />
          </svg>
        </div>
        <h3 className="text-lg font-medium">Nenhuma campanha encontrada</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Comece criando sua primeira campanha de marketing.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {campaigns.map((campaign) => (
        <CampaignListItem key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
};
