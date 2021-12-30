import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from './src/context/auth-context';
import Main from './src/Main';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </QueryClientProvider>
  );
}
