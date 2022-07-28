import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Root from 'components/routes/Root';
import './App.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Root />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
