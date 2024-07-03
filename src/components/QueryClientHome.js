"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/components/Home";

const queryClient = new QueryClient();

const ClientHome = ({ session }) => (
  <QueryClientProvider client={queryClient}>
    <Home session={session} />
  </QueryClientProvider>
);

export default ClientHome;
