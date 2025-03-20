
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapsibleGroup } from "./CollapsibleGroup";
import { Contact, Carteira } from "./types";

interface CarteirasTabProps {
  carteiras: Carteira[];
  openCarteiras: string[];
  selectedContacts: Contact[];
  onToggleCarteira: (carteiraId: string) => void;
  onSelectAllCarteira: (carteiraId: string) => void;
  onContactSelection: (contact: Contact) => void;
  isCarteiraAllSelected: (carteiraId: string) => boolean;
}

export function CarteirasTab({
  carteiras,
  openCarteiras,
  selectedContacts,
  onToggleCarteira,
  onSelectAllCarteira,
  onContactSelection,
  isCarteiraAllSelected
}: CarteirasTabProps) {
  return (
    <ScrollArea className="max-h-[400px] pr-4">
      <div className="space-y-2 pt-2">
        {carteiras.map(carteira => (
          <CollapsibleGroup 
            key={carteira.id}
            id={carteira.id}
            name={carteira.name}
            contacts={carteira.contacts}
            isOpen={openCarteiras.includes(carteira.id)}
            isAllSelected={isCarteiraAllSelected(carteira.id)}
            selectedContacts={selectedContacts}
            onToggle={onToggleCarteira}
            onSelectAll={onSelectAllCarteira}
            onContactSelection={onContactSelection}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
