import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';

import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';

const theme = createTheme({});

const queryClient = new QueryClient()
function App() {

  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default App
