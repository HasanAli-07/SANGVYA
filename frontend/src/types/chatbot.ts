export type ChatSender = 'USER' | 'ASSISTANT_AI' | 'SYSTEM';

export interface VectorContextChunk {
  chunkId: string;
  sourceDocument: 'Model Bye-Laws for PACS' | 'PACS HR Policy Framework' | 'NCCT Course Catalog' | 'Dairy Cooperative SOP';
  contentSnippet: string;
  cosineSimilarity: number;
}

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  text: string;
  audioUrl?: string;
  language: string;
  retrievedContext?: VectorContextChunk[];
  isVoiceQuery?: boolean;
  disclaimerAppended?: boolean;
  timestamp: string;
}
