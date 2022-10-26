import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: ()=> import ('./usuario/login/login.module').then(m => m.LoginPageModule)

},
{
  path:'registrar',
  loadChildren: ()=> import ('./usuario/register/register.module').then(m => m.RegisterPageModule)
}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
