import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Plus } from 'lucide-react';
import Button from "./Button";

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-gray-200 shadow-sm">
      <div className="container-padding mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-primary-700 hover:text-primary-800 transition-colors"
            >
              <Home className="w-6 h-6" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                ImmoFinder
              </h1>
            </Link>
          </div>
          
          <nav className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Accueil
            </Link>
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => navigate("/new")}
            >
              Ajouter un bien
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;