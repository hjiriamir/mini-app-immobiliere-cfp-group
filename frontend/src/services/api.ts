import { Item } from '../types/Item';

const BASE_URL = 'http://localhost:3000';

export const getItems = async (): Promise<Item[]> => {
  const res = await fetch(`${BASE_URL}/items`);
  return res.json();
};

export const getItem = async (id: string): Promise<Item> => {
  const res = await fetch(`${BASE_URL}/items/${id}`);
  return res.json();
};

export const createItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
  const res = await fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return res.json();
};

export const updateItem = async (id: string, item: Omit<Item, 'id'>): Promise<Item> => {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return res.json();
};

export const deleteItem = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/items/${id}`, { method: 'DELETE' });
};
