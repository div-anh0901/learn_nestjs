export interface TableData {
    id: number;
    name: string;
    email: string;
    age: number;
    status: 'Active' | 'Pending' | 'Banned';
  }