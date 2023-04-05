import { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  InputAdornment,
  Tooltip,
  Fab,
} from '@mui/material';
import { TextSnippet, Chat } from '@mui/icons-material';
import { ChatbotDTO } from './chatbot-service';
import { getRandomPeople, generateDescription } from './chatbot-service';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { startChatbotConversation } from './store/chatbotSlice';

const Heading = styled(Typography)(({ theme }) => ({
  letterSpacing: '0.05em',
  color: theme.palette.primary.main,
  textAlign: 'center',
  margin: theme.spacing(4, 0),
}));

const renderGenerateDescriptionAdornment = (name: string, onClick: (name: string) => void) => {
  return (
    <InputAdornment position="end">
      <Tooltip title="Generate description">
        <span>
          <IconButton
            disabled={!name || name === ''}
            aria-label="generate person description"
            onClick={() => onClick(name)}
          >
            <TextSnippet />
          </IconButton>
        </span>
      </Tooltip>
    </InputAdornment>
  );
};

export function ChatbotConfigurationForm() {
  const [chatbot1, setChatbot1] = useState<ChatbotDTO>({ name: '', description: '' });
  const [chatbot2, setChatbot2] = useState<ChatbotDTO>({ name: '', description: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(startChatbotConversation({ chatbot1, chatbot2 }));
  };

  // Randomizes chatbots
  const handleRandomize = async () => {
    setIsLoading(true);

    const response = await getRandomPeople();

    const chatbot1 = response.randomPeople[0];
    const chatbot2 = response.randomPeople[1];

    setChatbot1(chatbot1);
    setChatbot2(chatbot2);
    setIsLoading(false);
  }

  // Randmizes a chatbot description
  const handleRandomizeDescription = async (name: string) => {
    setIsLoading(true);
    const description = await generateDescription(name);

    if (chatbot1.name === name) {
      setChatbot1({ ...chatbot1, description });
    } else {
      setChatbot2({ ...chatbot2, description });
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12}>
          <Heading variant="h2">Configure Chatbots</Heading>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Chatbot 1 Name"
            value={chatbot1.name}
            onChange={(e) => setChatbot1({ ...chatbot1, name: e.target.value })}
            fullWidth
            required
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Chatbot 2 Name"
            value={chatbot2.name}
            onChange={(e) => setChatbot2({ ...chatbot2, name: e.target.value })}
            fullWidth
            required
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Chatbot 1 Description"
            value={chatbot1.description}
            onChange={(e) => setChatbot1({ ...chatbot1, description: e.target.value })}
            fullWidth
            multiline
            required
            disabled={isLoading}
            InputProps={{
              endAdornment: renderGenerateDescriptionAdornment(chatbot1.name, handleRandomizeDescription),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Chatbot 2 Description"
            value={chatbot2.description}
            onChange={(e) => setChatbot2({ ...chatbot2, description: e.target.value })}
            fullWidth
            multiline
            required
            disabled={isLoading}
            InputProps={{
              endAdornment: renderGenerateDescriptionAdornment(chatbot2.name, handleRandomizeDescription),
            }}
          />
        </Grid>
        <Grid item xs={12} container justifyContent="center" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: '300px', fontSize: '1.1rem', fontWeight: 500 }}
              disabled={isLoading}
            >
              <Chat sx={{ mr: 1 }} />
              Start Conversation
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRandomize}
              sx={{ width: '300px', fontSize: '1.1rem', fontWeight: 500 }}
              disabled={isLoading}
            >
              Randomize
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}