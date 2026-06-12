export interface Product {
  id?: string;
  barcode: string;
  name: string;
  brand: string;
  imageUrl: string;
  category: string;
  quantity: number;
  lastUpdated: Date;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}