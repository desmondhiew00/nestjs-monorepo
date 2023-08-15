export interface AuthData {
  id: number;
  type: 'ADMIN' | 'STAFF' | 'CUSTOMER';
  storeId?: number;
}
