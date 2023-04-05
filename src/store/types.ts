export type ChatbotState = {
  outputMessages: ChatResponse[];
  isLoading: boolean;
  isResponding: boolean;
  chatbot1: ChatbotDTO;
  chatbot2: ChatbotDTO;
  chatbotsConfigured: boolean;
};

export type ChatbotDTO = {
  name: string;
  description: string;
  avatarUrl?: string;
}

export type StartConversationRequest = {
  chatbot1: ChatbotDTO;
  chatbot2: ChatbotDTO;
}

export type StartConversationResponse = {
  chatbot1: ChatbotDTO;
  chatbot2: ChatbotDTO;
  sceneDescription: string;
}

export type ContinueConversationRequest = {
  name: string;
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