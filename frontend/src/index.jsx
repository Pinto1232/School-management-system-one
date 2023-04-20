import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import theme from "./utils/theme";
import { Provider } from 'react-redux';
import store from './reducers/store';

const root = document.getElementById('root');

createRoot(root).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      <Provider store={store}>
         <App />
      </Provider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
