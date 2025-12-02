import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PropertyDetail from "./pages/PropertyDetail";
import PropertyEdit from "./pages/PropertyEdit";
import PropertyNew from "./pages/PropertyNew";
import Header from "./components/Header";
import "./App.css";

const App: React.FC = () => (
  <Router>
    <div className="App">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<PropertyNew />} />
          <Route path="/details/:id" element={<PropertyDetail />} />
          <Route path="/prop/:id/edit" element={<PropertyEdit />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;