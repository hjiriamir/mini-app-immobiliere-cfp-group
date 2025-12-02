export interface Item {
    id: string;
    title: string;
    city: string;
    price: number;
    surface: number;
  }
  
  // Données stockées en mémoire
  export const items: Item[] = [];
  