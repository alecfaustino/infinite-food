import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Cards from "./components/Cards";
import Filters from "./components/Filters";
import RightColumn from "./components/RightColumn";

function App() {
  return (
    <div className="app-container">
      <Filters className="left-column" />
      <Cards />
      <RightColumn className="right-column" />
    </div>
  );
}

export default App;
