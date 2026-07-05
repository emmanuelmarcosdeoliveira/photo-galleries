import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import AppRoutes from "./routes/routes.tsx";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root Element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-center" />
        <NuqsAdapter>
          <AppRoutes />
        </NuqsAdapter>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
