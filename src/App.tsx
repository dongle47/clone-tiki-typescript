import React from "react";
import "./App.scss";

import { Header, Footer } from "components/Common";
import Home from "pages/Home";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Home />

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
