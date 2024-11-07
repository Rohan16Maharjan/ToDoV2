import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Todo from './ToDo/screens/Todo';
import { ChakraProvider } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Todo />
        <ToastContainer />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
