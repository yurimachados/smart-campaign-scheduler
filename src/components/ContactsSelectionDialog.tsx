
import React, { useState } from "react";
import { Search, Check, Users, FolderOpen, UserPlus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ScrollArea } from "./ui/scroll-area";

// Tipos
interface Contact {
  id: string;
  name: string;
  phone: string;
  carteira?: string;
  squad?: string;
}

interface Carteira {
  id: string;
  name: string;
  contacts: Contact[];
}

interface Squad {
  id: string;
  name: string;
  contacts: Contact[];
}

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
  const contactLists = [
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

  // Filtrar contatos baseados no termo de busca
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

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
          
          {/* Listas predefinidas */}
          <TabsContent value="lists">
            <ScrollArea className="max-h-[400px] pr-4">
              <div className="space-y-2 pt-2">
                {contactLists.map(list => (
                  <div 
                    key={list.id} 
                    className={`flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-muted ${selectedListId === list.id ? 'bg-muted' : ''}`}
                    onClick={() => handleSelectList(list.id)}
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
          </TabsContent>
          
          {/* Contatos individuais */}
          <TabsContent value="contacts">
            <div className="mb-4 pt-2">
              <Input
                placeholder="Buscar contatos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={<Search className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            
            <ScrollArea className="max-h-[350px] pr-4">
              <div className="space-y-2">
                {filteredContacts.map(contact => (
                  <div 
                    key={contact.id} 
                    className="flex items-center justify-between p-3 rounded-md hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox 
                        id={`contact-${contact.id}`} 
                        checked={selectedContacts.some(c => c.id === contact.id)}
                        onCheckedChange={() => handleContactSelection(contact)}
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
                    
                    <div className="flex items-center gap-2">
                      {contact.carteira && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {carteiras.find(c => c.id === contact.carteira)?.name}
                        </span>
                      )}
                      {contact.squad && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {squads.find(s => s.id === contact.squad)?.name}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          {/* Carteiras */}
          <TabsContent value="carteiras">
            <ScrollArea className="max-h-[400px] pr-4">
              <div className="space-y-2 pt-2">
                {carteiras.map(carteira => (
                  <Collapsible 
                    key={carteira.id}
                    open={openCarteiras.includes(carteira.id)}
                    onOpenChange={() => toggleCarteira(carteira.id)}
                    className="border rounded-md mb-2"
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted rounded-md">
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          id={`carteira-${carteira.id}`}
                          checked={isCarteiraAllSelected(carteira.id)}
                          onCheckedChange={() => handleSelectAllCarteira(carteira.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex items-center">
                          <FolderOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{carteira.name} ({carteira.contacts.length} contatos)</span>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="pl-9 pr-3 pb-3 space-y-2">
                      {carteira.contacts.map(contact => (
                        <div 
                          key={contact.id} 
                          className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              id={`contact-${contact.id}`}
                              checked={selectedContacts.some(c => c.id === contact.id)}
                              onCheckedChange={() => handleContactSelection(contact)}
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
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          {/* Squads */}
          <TabsContent value="squads">
            <ScrollArea className="max-h-[400px] pr-4">
              <div className="space-y-2 pt-2">
                {squads.map(squad => (
                  <Collapsible 
                    key={squad.id}
                    open={openSquads.includes(squad.id)}
                    onOpenChange={() => toggleSquad(squad.id)}
                    className="border rounded-md mb-2"
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted rounded-md">
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          id={`squad-${squad.id}`}
                          checked={isSquadAllSelected(squad.id)}
                          onCheckedChange={() => handleSelectAllSquad(squad.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex items-center">
                          <FolderOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{squad.name} ({squad.contacts.length} contatos)</span>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="pl-9 pr-3 pb-3 space-y-2">
                      {squad.contacts.map(contact => (
                        <div 
                          key={contact.id} 
                          className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              id={`contact-${contact.id}`}
                              checked={selectedContacts.some(c => c.id === contact.id)}
                              onCheckedChange={() => handleContactSelection(contact)}
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
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-between items-center">
          <div className="text-sm">
            {selectedContacts.length} contatos selecionados
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm} disabled={selectedContacts.length === 0}>
              <UserPlus className="mr-2 h-4 w-4" />
              Confirmar Seleção
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
