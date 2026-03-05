import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from 'react-router-dom';
import "./index.css";
import App from "./App.tsx";
//*=============== context provider
import { UserDataProvider } from "./components/AppContext/AppContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
    <UserDataProvider>
      <App />
    </UserDataProvider>
      </HashRouter>
  </StrictMode>,
);
