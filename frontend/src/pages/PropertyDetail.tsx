import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItem, deleteItem } from "../services/api";
import { Item } from "../types/Item";
import Modal from "react-modal";
import { ArrowLeft, MapPin, Euro, Maximize2, Edit, Trash2, Calendar } from 'lucide-react';
import Button from "../components/Button";

Modal.setAppElement('#root');

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getItem(id);
        setItem(data);
      } catch (error) {
        console.error("Erreur lors du chargement du bien:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteItem(id);
      setIsModalOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bien non trouvé</h2>
          <Button onClick={() => navigate("/")}>
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container-padding mx-auto max-w-4xl py-8">
        {/* Header avec bouton retour */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            icon={<ArrowLeft className="w-4 h-4" />}
            className="mb-4"
          >
            Retour
          </Button>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{item.city}</span>
                </div>
              </div>
              <span className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full font-semibold">
                {formatPrice(item.price)} €
              </span>
            </div>
          </div>
        </div>

        {/* Détails */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations principales */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Informations du bien
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <Euro className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Prix</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatPrice(item.price)} €
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Maximize2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Surface</p>
                      <p className="text-xl font-bold text-gray-900">
                        {item.surface} m²
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">
                        Prix au m²
                      </p>
                      <p className="text-lg font-bold text-yellow-900">
                        {Math.round(item.price / item.surface)} €/m²
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Actions
              </h3>
              
              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => navigate(`/prop/${id}/edit`)}
                  icon={<Edit className="w-4 h-4" />}
                >
                  Modifier le bien
                </Button>
                
                <Button
                  variant="danger"
                  className="w-full"
                  onClick={() => setIsModalOpen(true)}
                  icon={<Trash2 className="w-4 h-4" />}
                >
                  Supprimer le bien
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmation de suppression"
        className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto mt-20 animate-slide-up"
        overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Supprimer ce bien ?
          </h3>
          
          <p className="text-gray-600 mb-6">
            Cette action est irréversible. Voulez-vous vraiment supprimer "{item.title}" ?
          </p>
          
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setIsModalOpen(false)}
            >
              Annuler
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PropertyDetail;