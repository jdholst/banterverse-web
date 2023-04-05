import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import store from './store';
import Chatbot from './Chatbot';
import theme from './theme';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ padding: '24px', margin: '0 auto' }}>
          <Chatbot />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
