import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { consorcioResolver } from './resolvers/consorcio.resolver';

export const routes: Routes = [

  // Rota pública — qualquer um acessa
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [authGuard],       // Protege a rota pai
    canActivateChild: [authGuard],  // Protege todas as filhas automaticamente

    children: [
      {
        path: 'catalogo',
        component: CatalogoComponent,
        // O resolver busca o estoque ANTES de renderizar o componente
        resolve: { estoque: consorcioResolver }
      },
      {
        path: 'perfil',
        component: PerfilComponent
      }
    ]
  },

  // Qualquer URL desconhecida redireciona para o login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }

];