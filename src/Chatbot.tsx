import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { styled } from '@mui/system';
import {
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import TypingIndicator from './TypingIndicator';
import { Save, ArrowBack } from '@mui/icons-material';
import { ChatbotConfigurationForm } from './ChatbotConfigurationForm';
import { grey } from '@mui/material/colors';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { continueChatbotConversation, reset } from './store/chatbotSlice';

// const flyAnimation = keyframes`
//   0% {
//     transform: translateX(0);
//   }
//   50% {
//     transform: translateX(50px);
//   }
//   100% {
//     transform: translateX(0);
//   }
// `;

const ChatbotPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 10,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '90%',
  // maxWidth: '90%',
  marginLeft: 'auto',
  marginRight: 'auto',
  minHeight: '75vh',
  display: 'flex', 
  flexDirection: 'column',
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: theme.spacing(2),
}));

// const SaveButton = styled(IconButton)(({ theme }) => ({
//   // padding: theme.spacing(1),
//   color: theme.palette.primary.main,
//   '&:hover': {
//     background: theme.palette.primary.light,
//   },
// }));

// const InputContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   marginTop: theme.spacing(2),
// }));

// const InputTextField = styled(TextField)(({ theme }) => ({
//   flexGrow: 1,
//   marginRight: theme.spacing(2),
//   borderRadius: 25,
// }));


// const SubmitButton = styled(IconButton)<IconButtonProps & { isSubmitClicked: boolean;}>((
//   { 
//     isSubmitClicked 
//   } ) => ({
//     background: '#A9A9A9',
//     color: 'white',
//     borderRadius: '50%',
//     minWidth: 50,
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     '&:hover': {
//       background: '#808080',
//     },
//     '& .send-icon': {
//       animationName: isSubmitClicked ? 'flyAnimation' : 'none',
//       animationDuration: '1s',
//       animationIterationCount: isSubmitClicked ? '1' : '0',
//     },
// }));

// const SendIcon = styled(Send)(({ theme }) => ({
//   animation: `${flyAnimation} 1s ease-out`,
//   '@keyframes flyAnimation': {
//     '0%': {
//       transform: 'translateX(0)',
//     },
//     '50%': {
//       transform: 'translateX(50px)',
//     },
//     '100%': {
//       transform: 'translateX(0)',
//     },
//   },
// }));

const OutputBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  background: theme.palette.background.default,
  borderRadius: 5,
  height: '300px',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: 8,
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 10,
    backgroundColor: '#8f8f8f',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '65%',
  },
}));

const ChatBubble = styled('span')(({ theme }) => ({
  padding: theme.spacing(2, 2),
  display: 'inline-block',
  wordBreak: 'break-word',
  width: 'fit-content',
}));

const UserBubble = styled(ChatBubble)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '0 20px 20px 20px',
}));

const ChatbotBubble = styled(ChatBubble)(({ theme }) => ({
  background: theme.palette.mode === 'light' ? grey[50] : grey[800],
  borderRadius: '20px 0 20px 20px',
  marginRight: '10px',
  marginLeft: theme.spacing(1),
  overflow: 'hidden',
  maxHeight: '100%',
  opacity: 1,
}));

const ContinueConversationButton = styled(Button)(({ theme }) => ({
  // background: theme.palette.secondary.main,
  // color: theme.palette.secondary.contrastText,
  borderRadius: 50,
  fontSize: '0.8rem',
  padding: theme.spacing(0.5, 2),
  alignSelf: 'center',
  marginTop: theme.spacing(1),
  textTransform: 'none',
}));

const Chatbot: React.FC = () => {
  // const [inputText, setInputText] = useState('');
  // const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const outputRef = useRef<HTMLLIElement>(null);

  const {
    outputMessages,
    isLoading,
    isResponding,
    chatbot1,
    chatbot2,
    chatbotsConfigured,
    currentConversationId,
  } = useSelector((state: RootState) => state.chatbot);
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
      outputRef.current.scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }
  }, [outputMessages, outputRef]);

  useEffect(() => {
    if (chatbotsConfigured && !isLoading) {
      (async () => await handleConversation())();
    }
  }, [chatbot1, chatbot2, chatbotsConfigured]);

  const handleSendMessage = async () => {
    // setIsSubmitClicked(true);
    // setTimeout(() => {
    //   setIsSubmitClicked(false);
    // }, 1000); // The same duration as the animation

    await handleConversation();
  };

  const handleConversation = async () => {
    // setInputText('');
    await dispatch(continueChatbotConversation({ conversationId: currentConversationId }));
  };

  // const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     await handleSendMessage();
  //   }
  // };

  const handleSaveConversation = () => {
    // Implement your save functionality here
    console.log('Save conversation');
  };

  const handleBackPress = () => {
    dispatch(reset());
  };

  return (
    <ChatbotPaper>
      {
        chatbotsConfigured && (
          <Header>
            <Tooltip title="Back">
              <IconButton onClick={handleBackPress}>
                <ArrowBack />
              </IconButton>
            </Tooltip>
            <Typography variant="h5">
              {isLoading ? 'Loading Conversation...' : `${chatbot1.name} & ${chatbot2.name}`}
            </Typography>
            <IconButton onClick={handleSaveConversation}>
              <Save />
            </IconButton>
          </Header>
        )
      }
      <OutputBox>
        <List>
          {
            chatbotsConfigured ? (
              outputMessages.map(({ name, response, role }, index) => (
                <StyledListItem 
                ref={outputRef}
                key={`${name}-${index}`}
                sx={{
                  flexDirection: role === 'chatbot' ? 'row' : null,
                  marginLeft: role === 'chatbot' ? 'auto' : null,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: role === 'chatbot' ? 'flex-end' : 'flex-start',
                    maxWidth: '90%',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      marginLeft: role === 'chatbot' ? 'auto' : null,
                      marginRight: role === 'chatbot' ? 1 : null,
                    }}
                    color="text.secondary"
                  >
                    {name}
                  </Typography>
                  <ListItemText
                    sx={{ flex: 'none' }}
                    primary={
                      role === 'user' ? (
                        <UserBubble>{response}</UserBubble>
                      ) : (
                        <ChatbotBubble>
                          {isResponding && index === outputMessages.length - 1 ? (
                            <TypingIndicator />
                          ) : (
                            response
                          )}
                        </ChatbotBubble>
                      )
                    }
                  />
                  {role === 'chatbot' && index === outputMessages.length - 1 && !isResponding && (
                    <ContinueConversationButton 
                      onClick={handleSendMessage} 
                      variant="contained"
                      color="secondary"
                      disableElevation
                    >
                      Continue Conversation
                    </ContinueConversationButton>
                  )}
                </Box>
                {role === 'chatbot' && (
                  <Avatar
                    sx={{ width: 50, height: 50, alignSelf: 'start' }}
                    src={chatbot1.name === name ? chatbot1.avatarUrl : chatbot2.avatarUrl}
                    alt="ChatGPT logo"
                  />
                )}
              </StyledListItem>
              ))
            ) : (
              <ChatbotConfigurationForm />
            )
          }
        </List>
      </OutputBox>
      {/* <InputContainer>
      <InputTextField
        variant="outlined"
        placeholder="Type here..."
        value={inputText}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputText(event.target.value)}
        onKeyPress={handleKeyPress}
      />
      <SubmitButton onClick={handleSendMessage} isSubmitClicked={isSubmitClicked}>
        <SendIcon className="send-icon" />
      </SubmitButton>
    </InputContainer> */}
    </ChatbotPaper>
  );
};

export default Chatbot;
