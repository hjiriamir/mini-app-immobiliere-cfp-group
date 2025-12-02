import { items } from "../models/item.model.js";
import type { Item } from "../models/item.model.js";

import type { ItemCreateDTO } from "../schemas/item.schema.js";


import { randomUUID } from "crypto";

export const getAllItems = () => {
  return items;
};

export const getItemById = (id: string) => {
  return items.find(item => item.id === id);
};

export const createItem = (data: ItemCreateDTO): Item => {
  const newItem: Item = { id: randomUUID(), ...data };
  items.push(newItem);
  return newItem;
};

export const updateItem = (
    id: string,
    data: ItemCreateDTO
  ): Item | null => {
    const currentItem = items.find(item => item.id === id);
    if (!currentItem) return null;
  
    const updated: Item = {
      id: currentItem.id,
      ...data
    };
  
    const index = items.findIndex(item => item.id === id);
    items[index] = updated;
  
    return updated;
  };
  
  

export const deleteItem = (id: string) => {
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return false;

  items.splice(index, 1);
  return true;
};
