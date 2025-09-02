import { ToastContainer } from "react-toastify";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AllRoutes from "./AllRoutes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AllRoutes />
    <ToastContainer autoClose={1200} />
  </StrictMode>
);
