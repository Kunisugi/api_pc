import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RefreshGuard } from './Admin/guard-refresh/refresh.guard';
import { GAdmGuard } from './Admin/guard/g-adm.guard';
import { GUsuarioGuard } from './usuario/guard/g-usuario.guard';

const routes: Routes = [{
  path: '',
  loadChildren: ()=> import ('./usuario/login/login.module').then(m => m.LoginPageModule), //sin protección
  canActivate: [RefreshGuard] //si esta registrado lo redireccionamos al HOME

},
{
  path:'registrar',
  loadChildren: ()=> import ('./usuario/register/register.module').then(m => m.RegisterPageModule), //sin protección
  canActivate: [RefreshGuard] //si esta registrado lo redireccionamos al HOME
},
  {
    path: 'home',
    loadChildren: () => import('./producto/listar/listar.module').then( m => m.ListarPageModule),//Usuario normal LOGUEADO
     canActivate: [ GUsuarioGuard]
  },
  {
    path: 'home/verProducto/:nombre',
    loadChildren: () => import('./producto/ver-producto/ver-producto.module').then( m => m.VerProductoPageModule), // usuario normal LOGUEADO
    canActivate: [ GUsuarioGuard]
  },
  {
    path: 'listar-producto',
    loadChildren: () => import('./Admin/listar-producto/listar-producto.module').then( m => m.ListarProductoPageModule), // solamente ADMIN
    canActivate: [GAdmGuard]
  },
  {
    path: 'listar-producto/modificar-producto/:nombre',
    loadChildren: () => import('./Admin/modificar-producto/modificar-producto.module').then( m => m.ModificarProductoPageModule), // solamente ADMIN
    canActivate: [GAdmGuard]
  },
  {
    path: 'listar-producto/agregar-producto',
    loadChildren: () => import('./Admin/agregar-producto/agregar-producto.module').then( m => m.AgregarProductoPageModule), // solamente ADMIN
    canActivate: [GAdmGuard]
  },
  {
    path: 'home/ver-carrito',
    loadChildren: () => import('./cart/ver-carrito/ver-carrito.module').then( m => m.VerCarritoPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
