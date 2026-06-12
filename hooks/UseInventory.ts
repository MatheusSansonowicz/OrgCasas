
import { ProductService } from '../services/api';
import {useState} from 'react';
export const useBarcodeScanner = () => {
  const [loading, setLoading] = useState(false);

  const fetchProduct = async (barcode: string) => {
    setLoading(true);
    try {
      const product = await ProductService.searchByBarcode(barcode);
      return product;
    } catch (err) {
      console.error("Erro ao buscar produto", err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchProduct, loading };
};