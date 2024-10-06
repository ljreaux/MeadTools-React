import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "./lib/i18n.ts";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";

export const API_URL = "http://localhost:8080/api";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
