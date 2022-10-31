export interface IProducto {
  nombre: string;
  img: string;
  cantidad: number;
  ram: string;
  procesador: string;
  precio: number;
  discoDuro: string;
  placaMadre: string;
  gabinete: string;
  tarjetaGrafica: string;
  gama: string;

}

export interface IProductoConId extends IProducto {
  id: number;
}
