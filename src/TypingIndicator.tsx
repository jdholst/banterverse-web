import React from 'react';
import { styled, keyframes } from '@mui/system';
import Box from '@mui/material/Box';

const bounce = keyframes`
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-6px);
  }
`;

const TypingDot = styled(Box)(({ theme }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  marginRight: theme.spacing(0.5),
  animation: `${bounce} 1s infinite`,
}));

const TypingIndicator: React.FC = () => {
  return (
    <Box display="flex" alignItems="center">
      <TypingDot />
      <TypingDot sx={{ animationDelay: '0.3s' }} />
      <TypingDot sx={{ animationDelay: '0.6s' }} />
    </Box>
  );
};

export default TypingIndicator;