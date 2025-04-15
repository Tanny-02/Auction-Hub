export interface Item {
  itemId: number;
  sellerId: number;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  endTime: string;
  status?: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  winnerId?: number;
  finalPrice?: number;
}

export interface Bid {
  bidId: number;
  itemId: number;
  buyerId: number;
  bidAmount: number;
  bidDate: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'buyer' | 'seller';
  created_at?: string;
}