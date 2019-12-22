import React from "react";
import { Comparison } from "./pages/Comparison";
import "./App.css";
import { Route } from "react-router";

const App: React.FC = () => {
  return (
    <div className="App">
      <Route path="/:id?" component={Comparison} />
    </div>
  );
};

export default App;
