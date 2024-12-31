import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Hello from "./components/hello";
import './index.css';

const App = () => {
  return (
      <div className="container mt-4">
        <Routes>
        <Route path="/" element={<Hello />} />
        </Routes>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
