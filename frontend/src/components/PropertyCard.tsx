import { Item } from "../types/Item";
import React from "react";
import { MapPin, Maximize2, Euro, Edit, Eye } from 'lucide-react';
import Button from "./Button";

interface Props {
  item: Item;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  style?: React.CSSProperties; 
}

const PropertyCard: React.FC<Props> = ({ item, onEdit, onView }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  return (
    <div className="card-hover bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fade-in">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {item.title}
          </h3>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
            À vendre
          </span>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{item.city}</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Euro className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Prix</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatPrice(item.price)} €
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Surface</p>
                <p className="text-lg font-bold text-gray-900">
                  {item.surface} m²
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onView(item.id)}
            icon={<Eye className="w-4 h-4" />}
          >
            Voir
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(item.id)}
            icon={<Edit className="w-4 h-4" />}
          >
            Modifier
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;