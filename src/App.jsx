import { useState, useEffect } from "react";
import "./App.css";
import axios, { axiosError } from "axios";
import Cards from "./components/Cards";

function App() {
  return (
    <>
      <Cards />
    </>
  );
}

export default App;
