
import React, { useState } from "react";
import { Users } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
} from "./ui/dialog";
import { ContactsSelectionContent } from "./contacts-selection/ContactsSelectionContent";
import { Contact, Carteira, Squad, ContactList } from "./contacts-selection/types";

interface ContactsSelectionDialogProps {
  onSelectionChange: (selectedContacts: Contact[]) => void;
  selectedListId?: string;
  onListSelect: (listId: string, listName: string) => void;
}

export function ContactsSelectionDialog({
  onSelectionChange,
  selectedListId,
  onListSelect,
}: ContactsSelectionDialogProps) {
  // Estado local
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCarteiras, setOpenCarteiras] = useState<string[]>([]);
  const [openSquads, setOpenSquads] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  
  // Dados mockados para demonstração
  const contacts: Contact[] = [
    { id: "c1", name: "Carlos Silva", phone: "+5511987654321", carteira: "premium" },
    { id: "c2", name: "Ana Oliveira", phone: "+5511912345678", carteira: "premium" },
    { id: "c3", name: "Marcelo Santos", phone: "+5511955443322", carteira: "standard" },
    { id: "c4", name: "Juliana Costa", phone: "+5511933221100", carteira: "standard" },
    { id: "c5", name: "Bruno Ferreira", phone: "+5511944332211", squad: "tech" },
    { id: "c6", name: "Patrícia Lima", phone: "+5511922113344", squad: "vendas" },
    { id: "c7", name: "Eduardo Martins", phone: "+5511911224433", squad: "vendas" },
    { id: "c8", name: "Luciana Alves", phone: "+5511977665544", squad: "tech" },
    { id: "c9", name: "Roberto Gomes", phone: "+5511988776655", carteira: "premium" },
    { id: "c10", name: "Camila Dias", phone: "+5511966554433", squad: "suporte" },
  ];

  // Lista de contatos
  const contactLists: ContactList[] = [
    { id: "list1", name: "Clientes Ativos (542 contatos)" },
    { id: "list2", name: "Leads Novos (238 contatos)" },
    { id: "list3", name: "Clientes Inativos (890 contatos)" },
    { id: "list4", name: "Aniversariantes do Mês (45 contatos)" },
  ];

  // Agrupar contatos por carteira
  const carteiras: Carteira[] = [
    { 
      id: "premium", 
      name: "Premium", 
      contacts: contacts.filter(c => c.carteira === "premium") 
    },
    { 
      id: "standard", 
      name: "Standard", 
      contacts: contacts.filter(c => c.carteira === "standard") 
    }
  ];

  // Agrupar contatos por squad
  const squads: Squad[] = [
    { 
      id: "tech", 
      name: "Tecnologia", 
      contacts: contacts.filter(c => c.squad === "tech") 
    },
    { 
      id: "vendas", 
      name: "Vendas", 
      contacts: contacts.filter(c => c.squad === "vendas") 
    },
    { 
      id: "suporte", 
      name: "Suporte", 
      contacts: contacts.filter(c => c.squad === "suporte") 
    }
  ];

  // Alternar a abertura/fechamento de uma carteira
  const toggleCarteira = (carteiraId: string) => {
    setOpenCarteiras(prev => 
      prev.includes(carteiraId) 
        ? prev.filter(id => id !== carteiraId)
        : [...prev, carteiraId]
    );
  };

  // Alternar a abertura/fechamento de um squad
  const toggleSquad = (squadId: string) => {
    setOpenSquads(prev => 
      prev.includes(squadId) 
        ? prev.filter(id => id !== squadId)
        : [...prev, squadId]
    );
  };

  // Manipular a seleção de um contato
  const handleContactSelection = (contact: Contact) => {
    setSelectedContacts(prev => {
      const isSelected = prev.some(c => c.id === contact.id);
      if (isSelected) {
        return prev.filter(c => c.id !== contact.id);
      } else {
        return [...prev, contact];
      }
    });
  };

  // Manipular a seleção de todos os contatos de uma carteira
  const handleSelectAllCarteira = (carteiraId: string) => {
    const carteira = carteiras.find(c => c.id === carteiraId);
    if (!carteira) return;

    const allSelected = carteira.contacts.every(contact => 
      selectedContacts.some(c => c.id === contact.id)
    );

    if (allSelected) {
      // Remover todos os contatos da carteira
      setSelectedContacts(prev => 
        prev.filter(c => !carteira.contacts.some(contact => contact.id === c.id))
      );
    } else {
      // Adicionar todos os contatos da carteira que ainda não estão selecionados
      const contactsToAdd = carteira.contacts.filter(contact => 
        !selectedContacts.some(c => c.id === contact.id)
      );
      setSelectedContacts(prev => [...prev, ...contactsToAdd]);
    }
  };

  // Manipular a seleção de todos os contatos de um squad
  const handleSelectAllSquad = (squadId: string) => {
    const squad = squads.find(s => s.id === squadId);
    if (!squad) return;

    const allSelected = squad.contacts.every(contact => 
      selectedContacts.some(c => c.id === contact.id)
    );

    if (allSelected) {
      // Remover todos os contatos do squad
      setSelectedContacts(prev => 
        prev.filter(c => !squad.contacts.some(contact => contact.id === c.id))
      );
    } else {
      // Adicionar todos os contatos do squad que ainda não estão selecionados
      const contactsToAdd = squad.contacts.filter(contact => 
        !selectedContacts.some(c => c.id === contact.id)
      );
      setSelectedContacts(prev => [...prev, ...contactsToAdd]);
    }
  };

  // Verificar se todos os contatos de uma carteira estão selecionados
  const isCarteiraAllSelected = (carteiraId: string) => {
    const carteira = carteiras.find(c => c.id === carteiraId);
    if (!carteira || carteira.contacts.length === 0) return false;
    
    return carteira.contacts.every(contact => 
      selectedContacts.some(c => c.id === contact.id)
    );
  };

  // Verificar se todos os contatos de um squad estão selecionados
  const isSquadAllSelected = (squadId: string) => {
    const squad = squads.find(s => s.id === squadId);
    if (!squad || squad.contacts.length === 0) return false;
    
    return squad.contacts.every(contact => 
      selectedContacts.some(c => c.id === contact.id)
    );
  };

  // Confirmar a seleção
  const handleConfirm = () => {
    onSelectionChange(selectedContacts);
    setOpen(false);
  };

  // Selecionar uma lista predefinida
  const handleSelectList = (listId: string) => {
    const list = contactLists.find(list => list.id === listId);
    if (list) {
      onListSelect(listId, list.name);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          {selectedListId ? 
            contactLists.find(list => list.id === selectedListId)?.name : 
            "Selecione uma lista de contatos"}
        </Button>
      </DialogTrigger>
      <ContactsSelectionContent
        contacts={contacts}
        carteiras={carteiras}
        squads={squads}
        contactLists={contactLists}
        selectedContacts={selectedContacts}
        searchTerm={searchTerm}
        openCarteiras={openCarteiras}
        openSquads={openSquads}
        selectedListId={selectedListId}
        onSearchChange={setSearchTerm}
        onToggleCarteira={toggleCarteira}
        onToggleSquad={toggleSquad}
        onContactSelection={handleContactSelection}
        onSelectAllCarteira={handleSelectAllCarteira}
        onSelectAllSquad={handleSelectAllSquad}
        isCarteiraAllSelected={isCarteiraAllSelected}
        isSquadAllSelected={isSquadAllSelected}
        onSelectList={handleSelectList}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </Dialog>
  );
}
