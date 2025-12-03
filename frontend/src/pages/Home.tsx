import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItems } from "../services/api";
import { Item } from "../types/Item";
import PropertyCard from "../components/PropertyCard";
import { Search, Filter, Home as HomeIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 6; // Nombre d'items par page

const Home: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        console.error("Erreur lors du chargement des biens:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcul de la pagination
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handleView = (id: string) => {
    navigate(`/details/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/prop/${id}/edit`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll vers le haut de la liste
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Générer les numéros de page
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Afficher toutes les pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Afficher avec des ellipses
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container-padding mx-auto max-w-7xl py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <HomeIcon className="w-8 h-8 text-primary-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Nos biens immobiliers
            </h2>
          </div>
          <p className="text-gray-600">
            Découvrez notre sélection de propriétés exceptionnelles
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un bien ou une ville..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Réinitialiser à la première page lors de la recherche
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button className="px-6 py-3 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5" />
              Filtres
            </button>
          </div>
          
          {/* Stats */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <p className="text-gray-600">
              Affichage <span className="font-semibold text-primary-600">
                {totalItems > 0 ? `${startIndex + 1}-${Math.min(endIndex, totalItems)}` : '0'}
              </span> sur <span className="font-semibold text-primary-600">{totalItems}</span> biens
            </p>
            
            {/* Sélecteur d'items par page */}
            {totalItems > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Affichage par page:</span>
                <select 
                  value={ITEMS_PER_PAGE}
                  onChange={(e) => {
                  }}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                >
                  <option value="6">6</option>
                  <option value="12">12</option>
                  <option value="24">24</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Liste des biens */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow">
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun bien trouvé
              </h3>
              <p className="text-gray-600">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Grille des biens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentItems.map((item, index) => (
                <PropertyCard
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onView={handleView}
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-2" aria-label="Pagination">
                  {/* Bouton précédent */}
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Page précédente"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Numéros de page */}
                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page as number)}
                        className={`
                          w-10 h-10 rounded-lg flex items-center justify-center
                          transition-all duration-200 font-medium
                          ${currentPage === page 
                            ? 'bg-primary-600 text-white shadow-md' 
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-primary-300'
                          }
                        `}
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </button>
                    )
                  ))}

                  {/* Bouton suivant */}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Page suivante"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </nav>
              </div>
            )}

            {/* Résumé de pagination mobile */}
            <div className="flex justify-center mt-6 md:hidden">
              <div className="text-center text-sm text-gray-600">
                <p>
                  Page <span className="font-semibold text-primary-600">{currentPage}</span> 
                  sur <span className="font-semibold text-primary-600">{totalPages}</span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
