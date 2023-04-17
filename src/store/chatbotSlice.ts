import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { startConversation, continueConversation } from './chatbot-service';
import { ChatbotState, ContinueConversationParams, StartConversationParams, StartConversationRequest } from './types';

export const startChatbotConversation = createAsyncThunk(
  'chatbot/startConversation',
  async (payload: StartConversationParams, { rejectWithValue }) => {
    try {
      const response = await startConversation(payload.chatbot1, payload.chatbot2);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const continueChatbotConversation = createAsyncThunk(
  'chatbot/continueConversation',
  async ({ conversationId }: ContinueConversationParams, { rejectWithValue }) => {
    try {
      const response = await continueConversation(conversationId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: ChatbotState = {
  outputMessages: [],
  isLoading: false,
  isResponding: false,
  chatbot1: { name: '', description: '' },
  chatbot2: { name: '', description: '' },
  currentConversationId: '',
  chatbotsConfigured: false,
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(startChatbotConversation.pending, (state) => {
        state.isLoading = true;
        state.chatbotsConfigured = true;
      })
      .addCase(startChatbotConversation.fulfilled, (state, action) => {
        state.chatbot1 = action.payload.chatbot1;
        state.chatbot2 = action.payload.chatbot2;
        state.currentConversationId = action.payload.conversationId;
        state.isLoading = false;
      })
      .addCase(continueChatbotConversation.pending, (state) => {
        state.isResponding = true;

        const shouldStartConversation = state.outputMessages.length === 0;
        let respondingChatbot = state.chatbot1;
  
        if (!shouldStartConversation) {
          const lastMessage = state.outputMessages[state.outputMessages.length - 1];
          respondingChatbot = lastMessage.name === state.chatbot1.name ? state.chatbot2 : state.chatbot1;
        }

        state.outputMessages = [...state.outputMessages, { role: "chatbot", name: respondingChatbot.name, response: 'Loading...' }];
      })
      .addCase(continueChatbotConversation.fulfilled, (state, action) => {
        state.outputMessages = action.payload;
        state.isResponding = false;
      })
      .addCase(continueChatbotConversation.rejected, (state, action) => {
        state.isResponding = false;
        const newOutput = state.outputMessages.slice(0, -1); 
        state.outputMessages = [...newOutput, { role: "chatbot", response: `Error: ${action.payload}` }];
      });
  },
});

export const { reset } = chatbotSlice.actions;

export default chatbotSlice.reducer;
