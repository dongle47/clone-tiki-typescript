import React from "react";
import "./App.scss";

import { Header, Footer } from "components/Common";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "router/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />

        <Header />

        <AppRoutes />

        <Footer />

        <ToastContainer
          autoClose={1200}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover={false}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
