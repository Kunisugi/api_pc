export interface User {
  user: string;
  password: string;
  rol: string;

}
export interface UsuarioConId extends User{
  id: number;
}
