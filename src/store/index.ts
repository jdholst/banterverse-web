import { configureStore } from '@reduxjs/toolkit';
import chatbotReducer from './chatbotSlice';

const store = configureStore({
  reducer: {
    chatbot: chatbotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
