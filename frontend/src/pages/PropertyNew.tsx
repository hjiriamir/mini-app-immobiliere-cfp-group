import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyForm from "../components/PropertyForm";
import { createItem } from "../services/api";
import { PlusCircle, ArrowLeft } from 'lucide-react';
import Button from "../components/Button";

const PropertyNew: React.FC = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (item: any) => {
    setSubmitting(true);
    try {
      await createItem(item);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la création:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container-padding mx-auto max-w-4xl py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            icon={<ArrowLeft className="w-4 h-4" />}
            className="mb-6"
          >
            Retour
          </Button>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <PlusCircle className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Ajouter un nouveau bien
                </h1>
                <p className="text-gray-600">
                  Remplissez les informations de votre propriété
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <PropertyForm
          onSubmit={handleSubmit}
          loading={submitting}
        />
      </div>
    </div>
  );
};

export default PropertyNew;