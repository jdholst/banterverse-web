import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BANTERVERSE_API_URL ?? 'http://localhost:3000';
const CONVERSATION_COORDINATOR_BASE_URL = `${API_BASE_URL}/conversation-coordinator/v1`;

import { 
  ChatResponse,
  ChatbotDTO, 
  ConversationResponse, 
  GenerateDescriptionResponse, 
  RandomPeopleResponse, 
  StartConversationRequestSettings, 
  StartConversationResponse 
} from './types';

export async function startConversation(
  chatbot1: ChatbotDTO, 
  chatbot2: ChatbotDTO, 
  settings?: StartConversationRequestSettings,
): Promise<StartConversationResponse> {
  try {
    const response = await axios.post<StartConversationResponse>(`${CONVERSATION_COORDINATOR_BASE_URL}/conversations/create-new`, {
      chatbot1,
      chatbot2,
      settings,
    });

    return response.data;
  } catch (error: any) {
    throw new Error('Error starting conversation: ' + error.response.data.error);
  }
}

export async function continueConversation(conversationId: string): Promise<ChatResponse[]> {
  try {
    const response = await axios.post<ConversationResponse>(`${CONVERSATION_COORDINATOR_BASE_URL}/conversations/${conversationId}/continue`);
    return response.data.conversationHistory.map((response): ChatResponse => ({ ...response, role: "chatbot" }));
  } catch (error: any) {
    throw new Error('Error continuing conversation: ' + error.response.error);
  }
}

export async function endConversation(conversationId: string): Promise<void> {
  try {
    await axios.delete(`${CONVERSATION_COORDINATOR_BASE_URL}/conversations/${conversationId}`);
  } catch (error: any) {
    throw new Error('Error ending conversation: ' + error.response.data.error);
  }
}

export async function getRandomPeople(): Promise<RandomPeopleResponse> {
  try {
    const response = await axios.post(`${CONVERSATION_COORDINATOR_BASE_URL}/utility/generate-random-people`);
    return response.data;
  } catch (error: any) {
    throw new Error('Error ending conversation: ' + error.response.data.error);
  }
}

export async function generateDescription(name: string): Promise<string> {
  try {
    const response = await axios.post<GenerateDescriptionResponse>(`${CONVERSATION_COORDINATOR_BASE_URL}/utility/generate-person-description`, { name });
    return response.data.description.trim();
  } catch (error: any) {
    throw new Error('Error ending conversation: ' + error.response.data.error);
  }
}

