export interface IProducto {
  nombre: string;
  imgProducto: string;
  cantidad: number;
}

export interface IProductoConId extends IProducto {
  id: number;
}
