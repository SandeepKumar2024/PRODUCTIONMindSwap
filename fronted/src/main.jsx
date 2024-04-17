import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { DarkModeProvider } from "./Components/Dark Mode/DarkModeContext";
import HeartBeatComponent from "./Components/haertbeatComponent/HeartBeatComponent.jsx";
import AppWrapper from "./App.jsx";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <HeartBeatComponent />

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
        bodyClassName="toastBody"
      />

      <App />
    </DarkModeProvider>
  </React.StrictMode>
);
