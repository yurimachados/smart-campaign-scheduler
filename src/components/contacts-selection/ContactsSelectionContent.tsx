
import React from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DialogFooter,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { PredefinedListsTab } from "./PredefinedListsTab";
import { ContactsListTab } from "./ContactsListTab";
import { CarteirasTab } from "./CarteirasTab";
import { SquadsTab } from "./SquadsTab";
import { Contact, Carteira, Squad, ContactList } from "./types";

interface ContactsSelectionContentProps {
  contacts: Contact[];
  carteiras: Carteira[];
  squads: Squad[];
  contactLists: ContactList[];
  selectedContacts: Contact[];
  searchTerm: string;
  openCarteiras: string[];
  openSquads: string[];
  selectedListId?: string;
  onSearchChange: (value: string) => void;
  onToggleCarteira: (carteiraId: string) => void;
  onToggleSquad: (squadId: string) => void;
  onContactSelection: (contact: Contact) => void;
  onSelectAllCarteira: (carteiraId: string) => void;
  onSelectAllSquad: (squadId: string) => void;
  isCarteiraAllSelected: (carteiraId: string) => boolean;
  isSquadAllSelected: (squadId: string) => boolean;
  onSelectList: (listId: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ContactsSelectionContent({
  contacts,
  carteiras,
  squads,
  contactLists,
  selectedContacts,
  searchTerm,
  openCarteiras,
  openSquads,
  selectedListId,
  onSearchChange,
  onToggleCarteira,
  onToggleSquad,
  onContactSelection,
  onSelectAllCarteira,
  onSelectAllSquad,
  isCarteiraAllSelected,
  isSquadAllSelected,
  onSelectList,
  onConfirm,
  onCancel
}: ContactsSelectionContentProps) {
  return (
    <DialogContent className="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Selecionar Contatos</DialogTitle>
      </DialogHeader>
      
      <Tabs defaultValue="lists">
        <TabsList className="w-full">
          <TabsTrigger value="lists" className="flex-1">Listas Predefinidas</TabsTrigger>
          <TabsTrigger value="contacts" className="flex-1">Contatos</TabsTrigger>
          <TabsTrigger value="carteiras" className="flex-1">Carteiras</TabsTrigger>
          <TabsTrigger value="squads" className="flex-1">Squads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lists">
          <PredefinedListsTab 
            contactLists={contactLists}
            selectedListId={selectedListId}
            onSelectList={onSelectList}
          />
        </TabsContent>
        
        <TabsContent value="contacts">
          <ContactsListTab 
            contacts={contacts}
            selectedContacts={selectedContacts}
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onContactSelection={onContactSelection}
          />
        </TabsContent>
        
        <TabsContent value="carteiras">
          <CarteirasTab 
            carteiras={carteiras}
            openCarteiras={openCarteiras}
            selectedContacts={selectedContacts}
            onToggleCarteira={onToggleCarteira}
            onSelectAllCarteira={onSelectAllCarteira}
            onContactSelection={onContactSelection}
            isCarteiraAllSelected={isCarteiraAllSelected}
          />
        </TabsContent>
        
        <TabsContent value="squads">
          <SquadsTab 
            squads={squads}
            openSquads={openSquads}
            selectedContacts={selectedContacts}
            onToggleSquad={onToggleSquad}
            onSelectAllSquad={onSelectAllSquad}
            onContactSelection={onContactSelection}
            isSquadAllSelected={isSquadAllSelected}
          />
        </TabsContent>
      </Tabs>
      
      <DialogFooter className="flex justify-between items-center">
        <div className="text-sm">
          {selectedContacts.length} contatos selecionados
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onConfirm} disabled={selectedContacts.length === 0}>
            <UserPlus className="mr-2 h-4 w-4" />
            Confirmar Seleção
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}
