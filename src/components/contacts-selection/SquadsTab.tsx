
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapsibleGroup } from "./CollapsibleGroup";
import { Contact, Squad } from "./types";

interface SquadsTabProps {
  squads: Squad[];
  openSquads: string[];
  selectedContacts: Contact[];
  onToggleSquad: (squadId: string) => void;
  onSelectAllSquad: (squadId: string) => void;
  onContactSelection: (contact: Contact) => void;
  isSquadAllSelected: (squadId: string) => boolean;
}

export function SquadsTab({
  squads,
  openSquads,
  selectedContacts,
  onToggleSquad,
  onSelectAllSquad,
  onContactSelection,
  isSquadAllSelected
}: SquadsTabProps) {
  return (
    <ScrollArea className="max-h-[400px] pr-4">
      <div className="space-y-2 pt-2">
        {squads.map(squad => (
          <CollapsibleGroup 
            key={squad.id}
            id={squad.id}
            name={squad.name}
            contacts={squad.contacts}
            isOpen={openSquads.includes(squad.id)}
            isAllSelected={isSquadAllSelected(squad.id)}
            selectedContacts={selectedContacts}
            onToggle={onToggleSquad}
            onSelectAll={onSelectAllSquad}
            onContactSelection={onContactSelection}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
