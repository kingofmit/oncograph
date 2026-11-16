import React from "react";
import { createRoot } from "react-dom/client";
import "@picocss/pico";
import { OncoGraphProvider } from "@oncograph/react";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OncoGraphProvider apiBaseUrl="http://localhost:3737">
      <App />
    </OncoGraphProvider>
  </React.StrictMode>,
);
