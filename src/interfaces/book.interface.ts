export interface IAddBook {
  code: string;
  title: string;
  author: string;
  stock: number;
}

export interface IUpdateBook {
  id: number;
  code: string;
  title: string;
  author: string;
  stock: number;
}
