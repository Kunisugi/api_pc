export interface IProducto {
  nombre: string;
  img: string;
  cantidad: number;
}

export interface IProductoConId extends IProducto {
  id: number;
}
