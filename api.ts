import { Product } from './models/Product';
import axios from "axios";

const api = axios.create({ baseURL: 'SUA_API_URL' });

export const ProductService = {
  searchByBarcode: async (barcode: string): Promise<Product> => {
    const response = await api.get(`/products/scan/${barcode}`);
    return response.data;
  },

  saveToInventory: async (product: Product) => {
    return await api.post('/inventory', product);
  }
};