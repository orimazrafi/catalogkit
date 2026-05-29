export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  stock: number;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
