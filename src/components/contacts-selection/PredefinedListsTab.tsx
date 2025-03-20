
import React from "react";
import { Users, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContactList } from "./types";

interface PredefinedListsTabProps {
  contactLists: ContactList[];
  selectedListId?: string;
  onSelectList: (listId: string) => void;
}

export function PredefinedListsTab({
  contactLists,
  selectedListId,
  onSelectList
}: PredefinedListsTabProps) {
  return (
    <ScrollArea className="max-h-[400px] pr-4">
      <div className="space-y-2 pt-2">
        {contactLists.map(list => (
          <div 
            key={list.id} 
            className={`flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-muted ${selectedListId === list.id ? 'bg-muted' : ''}`}
            onClick={() => onSelectList(list.id)}
          >
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{list.name}</span>
            </div>
            {selectedListId === list.id && <Check className="h-4 w-4 text-primary" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
