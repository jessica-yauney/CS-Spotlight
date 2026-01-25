
export type Field = 
  | 'Artificial Intelligence' 
  | 'Systems & Networking' 
  | 'Theory' 
  | 'Human-Computer Interaction' 
  | 'Security & Privacy' 
  | 'Software Engineering' 
  | 'Data Science' 
  | 'Bioinformatics';

export type IdentityTag = 
  | 'Woman' 
  | 'Person of Color' 
  | 'LGBTQ+' 
  | 'Pioneer' 
  | 'Contemporary' 
  | 'Immigrant' 
  | 'First-Gen';

export interface Scientist {
  id: string;
  name: string;
  fields: Field[];
  identity: IdentityTag[];
  shortBio: string;
  longBio: string;
  imageUrl: string;
  contribution: string;
  wikiUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
