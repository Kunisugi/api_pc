export interface Icarro {
  idUser: number;
  carrito: Array<Carrito>
}

export type Carrito = {
  idUser: number;
  carrito:
  {
    nombreProducto: string,
    precio: number,
    idProducto: string
  }
}

export interface IcarroConId extends Icarro {
  id : number;
}

export interface IcarroParcial extends Partial<Icarro>{}

