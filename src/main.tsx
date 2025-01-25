import { StrictMode, useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, Spinner, Box } from '@chakra-ui/react';
import theme from './theme';
import App from './App.tsx';
import './index.css';
import Header from './components/Header.tsx';
import client from './services/gqlApi.ts';

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bg="gray.100"
      >
        <Spinner size="xl" />
        <Box as="span" ml={4} fontSize="xl">
          Loading...
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box position="fixed" top="0" width="100%" zIndex="1">
      <Header />
      </Box>
      <Box mt="60px"> {/* Adjust the margin-top to match the height of the Header */}
      <App />
      </Box>
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <ChakraProvider theme={theme}>
      <Main />
    </ChakraProvider>
    </ApolloProvider>
  </StrictMode>
);