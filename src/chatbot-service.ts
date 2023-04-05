import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/chatbot-coordinator/v1';

export interface ChatbotDTO {
  name: string;
  description: string;
  avatarUrl?: string;
}

export interface StartConversationRequest {
  chatbot1: ChatbotDTO;
  chatbot2: ChatbotDTO;
}

export interface StartConversationResponse {
  chatbot1: ChatbotDTO;
  chatbot2: ChatbotDTO;
  sceneDescription: string;
}

export interface ContinueConversationRequest {
  name: string;
}

export interface ChatResponse {
  role: "chatbot" | "user";
  name: string;
  response: string;
}

export interface RandomPeopleResponse {
  randomPeople: ChatbotDTO[];
}

export interface GenerateDescriptionResponse {
  description: string;
}

export interface ConversationResponse {
  conversationHistory: ChatResponse[];
}

export async function startConversation(chatbot1: ChatbotDTO, chatbot2: ChatbotDTO, enableAvatars?: boolean): Promise<StartConversationResponse> {
  try {
    const response = await axios.post<StartConversationResponse>(`${API_BASE_URL}/start-conversation`, {
      chatbot1,
      chatbot2,
    }, { params: { enableAvatars }, });

    return response.data;
  } catch (error: any) {
    throw new Error('Error starting conversation: ' + error.response.data.error);
  }
}

export async function continueConversation(): Promise<ChatResponse[]> {
  try {
    const response = await axios.post<ConversationResponse>(`${API_BASE_URL}/continue-conversation`);
    return response.data.conversationHistory.map((response): ChatResponse => ({ ...response, role: "chatbot" }));
  } catch (error: any) {
    throw new Error('Error continuing conversation: ' + error.response.error);
  }
}

export async function endConversation(): Promise<void> {
  try {
    await axios.post(`${API_BASE_URL}/end-conversation`);
  } catch (error: any) {
    throw new Error('Error ending conversation: ' + error.response.data.error);
  }
}

export async function getRandomPeople(): Promise<RandomPeopleResponse> {
  try {
    const response = await axios.get(`${API_BASE_URL}/generate-random-people`);
    return response.data;
  } catch (error: any) {
    throw new Error('Error ending conversation: ' + error.response.data.error);
  }
}

export async function generateDescription(name: string): Promise<string> {
  try {
    const response = await axios.post<GenerateDescriptionResponse>(`${API_BASE_URL}/generate-person-description`, { name });
    return response.data.description.trim();
  } catch (error: any) {
    throw new Error('Error ending conversation: ' + error.response.data.error);
  }
}

