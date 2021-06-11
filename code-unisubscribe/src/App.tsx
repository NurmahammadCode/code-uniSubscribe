import React from "react";
import "./App.css";
import { HttpClient } from "./services/httpRequest";

function App() {
  const request = new HttpClient("http://172.28.0.48:8080/api/");
  const handleTest = () => {
    request.get("clients/1").then((response) => console.log(response));
  };
  return (
    <div className="App">
      <button onClick={handleTest}>Test</button>
    </div>
  );
}

export default App;
