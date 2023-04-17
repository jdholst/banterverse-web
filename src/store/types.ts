export type ChatbotState = {
  outputMessages: ChatResponse[];
  isLoading: boolean;
  isResponding: boolean;
  chatbot1: ChatbotDTO;
  chatbot2: ChatbotDTO;
  chatbotsConfigured: boolean;
  currentConversationId: string;
};

export type ChatbotDTO = {
  name: string;
  description: string;
  avatarUrl?: string;
}

export type StartConversationRequestSettings = {
  enableAvatars?: boolean;
  randomize?: boolean;
};

export type StartConversationParams = {
  chatbot1: ChatbotDTO;
  chatbot2: ChatbotDTO;
}

export type StartConversationRequest = {
  chatbot1: ChatbotDTO;
  chatbot2: ChatbotDTO;
  settings?: StartConversationRequestSettings;
}

export type StartConversationResponse = {
  conversationId: string;
  chatbot1: ChatbotDTO;
  chatbot2: ChatbotDTO;
  sceneDescription: string;
}

export type ContinueConversationParams = {
  conversationId: string;
}

export type ChatResponse = {
  role: "chatbot" | "user";
  name?: string;
  response: string;
}

export type RandomPeopleResponse = {
  randomPeople: ChatbotDTO[];
}

export type GenerateDescriptionResponse = {
  description: string;
}

export type ConversationResponse = {
  conversationHistory: ChatResponse[];
}