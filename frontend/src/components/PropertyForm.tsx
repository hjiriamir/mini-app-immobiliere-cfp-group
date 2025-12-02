import { Item } from "../types/Item";
import React, { useState } from "react";
import { Building2, MapPin, Euro, Maximize2 } from 'lucide-react';
import Button from "./Button";

interface Props {
  initialItem?: Omit<Item, "id">;
  onSubmit: (item: Omit<Item, "id">) => void;
  loading?: boolean;
}

const PropertyForm: React.FC<Props> = ({ initialItem, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    title: initialItem?.title || "",
    city: initialItem?.city || "",
    price: initialItem?.price || 0,
    surface: initialItem?.surface || 0,
  });

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto animate-slide-up">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="space-y-6">
          {/* Titre */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Building2 className="w-4 h-4" />
              Titre du bien
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={e => handleChange('title', e.target.value)}
              placeholder="Ex: Belle maison avec jardin"
              className={inputClasses}
              required
            />
          </div>

          {/* Ville */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4" />
              Ville
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={e => handleChange('city', e.target.value)}
              placeholder="Ex: Paris"
              className={inputClasses}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prix */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Euro className="w-4 h-4" />
                Prix (€)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.price}
                  onChange={e => handleChange('price', Number(e.target.value))}
                  min="0"
                  step="1000"
                  className={`${inputClasses} pl-10`}
                  required
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  €
                </span>
              </div>
            </div>

            {/* Surface */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Maximize2 className="w-4 h-4" />
                Surface (m²)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.surface}
                  onChange={e => handleChange('surface', Number(e.target.value))}
                  min="0"
                  step="1"
                  className={`${inputClasses} pr-10`}
                  required
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  m²
                </span>
              </div>
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              {initialItem ? "Mettre à jour" : "Ajouter le bien"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PropertyForm;