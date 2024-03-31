import React from "react";
import Card from "./Components/Cards/Card";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardItems from "./Components/TotalItems/TotalItems";

import TotalItems from "./Components/TotalItems/TotalItems";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/totalitems" element={<TotalItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
