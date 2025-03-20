
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Contact } from "./types";

interface ContactItemProps {
  contact: Contact;
  isSelected: boolean;
  onSelect: (contact: Contact) => void;
}

export function ContactItem({ contact, isSelected, onSelect }: ContactItemProps) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
      <div className="flex items-center gap-3">
        <Checkbox 
          id={`contact-${contact.id}`}
          checked={isSelected}
          onCheckedChange={() => onSelect(contact)}
        />
        <div className="flex flex-col">
          <label 
            htmlFor={`contact-${contact.id}`}
            className="text-sm font-medium cursor-pointer"
          >
            {contact.name}
          </label>
          <span className="text-xs text-muted-foreground">{contact.phone}</span>
        </div>
      </div>
    </div>
  );
}
