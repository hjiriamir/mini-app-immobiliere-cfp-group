import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropertyForm from "../components/PropertyForm";
import { getItem, updateItem } from "../services/api";
import { Item } from "../types/Item";
import { ArrowLeft, Save } from 'lucide-react';
import Button from "../components/Button";

const PropertyEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Omit<Item, "id"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getItem(id);
        setItem({ 
          title: data.title, 
          city: data.city, 
          price: data.price, 
          surface: data.surface 
        });
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, navigate]);

  const handleSubmit = async (updatedItem: Omit<Item, "id">) => {
    if (!id) return;
    setSubmitting(true);
    try {
      await updateItem(id, updatedItem);
      navigate(`/details/${id}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container-padding mx-auto max-w-4xl py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(`/details/${id}`)}
            icon={<ArrowLeft className="w-4 h-4" />}
            className="mb-6"
          >
            Retour
          </Button>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Save className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Modifier le bien
                </h1>
                <p className="text-gray-600">
                  Mettez à jour les informations de votre propriété
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        {item && (
          <PropertyForm
            initialItem={item}
            onSubmit={handleSubmit}
            loading={submitting}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyEdit;