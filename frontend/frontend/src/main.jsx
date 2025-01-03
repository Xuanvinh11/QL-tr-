import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { UserProvider } from "./contexts/UserProvider.jsx";
import { LoadingProvider } from "./contexts/LoadingProvider.jsx";
import "quill/dist/quill.snow.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </UserProvider>
  </BrowserRouter>
);
