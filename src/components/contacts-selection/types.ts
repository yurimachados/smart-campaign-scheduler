
export interface Contact {
  id: string;
  name: string;
  phone: string;
  carteira?: string;
  squad?: string;
}

export interface Carteira {
  id: string;
  name: string;
  contacts: Contact[];
}

export interface Squad {
  id: string;
  name: string;
  contacts: Contact[];
}

export interface ContactList {
  id: string;
  name: string;
}

export interface CampaignImage {
  id: string;
  file: File;
  previewUrl: string;
}
