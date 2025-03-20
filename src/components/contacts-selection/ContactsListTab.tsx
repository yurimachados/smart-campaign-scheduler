
import React from "react";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ContactItem } from "./ContactItem";
import { Contact } from "./types";

interface ContactsListTabProps {
  contacts: Contact[];
  selectedContacts: Contact[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onContactSelection: (contact: Contact) => void;
}

export function ContactsListTab({
  contacts,
  selectedContacts,
  searchTerm,
  onSearchChange,
  onContactSelection
}: ContactsListTabProps) {
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  return (
    <>
      <div className="mb-4 pt-2">
        <Input
          placeholder="Buscar contatos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
          icon={<Search className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      
      <ScrollArea className="max-h-[350px] pr-4">
        <div className="space-y-2">
          {filteredContacts.map(contact => (
            <ContactItem 
              key={contact.id}
              contact={contact}
              isSelected={selectedContacts.some(c => c.id === contact.id)}
              onSelect={onContactSelection}
            />
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
