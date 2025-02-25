
import { cn } from "@/lib/utils";

type StatusType = "scheduled" | "paused" | "sending" | "completed" | "cancelled";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  scheduled: {
    label: "Agendado",
    bgColor: "bg-status-scheduled/10",
    textColor: "text-status-scheduled",
    borderColor: "border-status-scheduled/30"
  },
  paused: {
    label: "Pausado",
    bgColor: "bg-status-paused/10",
    textColor: "text-status-paused",
    borderColor: "border-status-paused/30"
  },
  sending: {
    label: "Enviando",
    bgColor: "bg-status-sending/10",
    textColor: "text-status-sending",
    borderColor: "border-status-sending/30"
  },
  completed: {
    label: "Concluído",
    bgColor: "bg-status-completed/10",
    textColor: "text-status-completed",
    borderColor: "border-status-completed/30"
  },
  cancelled: {
    label: "Cancelado",
    bgColor: "bg-status-cancelled/10",
    textColor: "text-status-cancelled",
    borderColor: "border-status-cancelled/30"
  }
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <div 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.bgColor,
        config.textColor,
        config.borderColor,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full mr-1", config.textColor.replace('text', 'bg'))}></span>
      {config.label}
    </div>
  );
};

export type { StatusType };
