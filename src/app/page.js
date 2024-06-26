"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/components/Home";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Home />
  </QueryClientProvider>
);

export default App;
