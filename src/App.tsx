import React from 'react';
import Root from 'components/routes/Root';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>
    </div>
  );
}

export default App;
