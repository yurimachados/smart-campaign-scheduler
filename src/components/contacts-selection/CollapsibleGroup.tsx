
import React from "react";
import { FolderOpen } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent 
} from "@/components/ui/collapsible";
import { ContactItem } from "./ContactItem";
import { Contact } from "./types";

interface CollapsibleGroupProps {
  id: string;
  name: string;
  contacts: Contact[];
  isOpen: boolean;
  isAllSelected: boolean;
  selectedContacts: Contact[];
  onToggle: (id: string) => void;
  onSelectAll: (id: string) => void;
  onContactSelection: (contact: Contact) => void;
}

export function CollapsibleGroup({
  id,
  name,
  contacts,
  isOpen,
  isAllSelected,
  selectedContacts,
  onToggle,
  onSelectAll,
  onContactSelection
}: CollapsibleGroupProps) {
  return (
    <Collapsible 
      key={id}
      open={isOpen}
      onOpenChange={() => onToggle(id)}
      className="border rounded-md mb-2"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted rounded-md">
        <div className="flex items-center gap-3">
          <Checkbox 
            id={`group-${id}`}
            checked={isAllSelected}
            onCheckedChange={() => onSelectAll(id)}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex items-center">
            <FolderOpen className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{name} ({contacts.length} contatos)</span>
          </div>
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="pl-9 pr-3 pb-3 space-y-2">
        {contacts.map(contact => (
          <ContactItem 
            key={contact.id}
            contact={contact}
            isSelected={selectedContacts.some(c => c.id === contact.id)}
            onSelect={onContactSelection}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
