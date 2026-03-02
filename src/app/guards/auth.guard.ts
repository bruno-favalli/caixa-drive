import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  
  const logado = localStorage.getItem('logado') === 'true';
  const role = localStorage.getItem('role');
 
  if (!logado) {
    return router.parseUrl('/login');
  }

  const roleExigido = route.data['role'];

  if (roleExigido && roleExigido !== role) {
    alert('Acesso negado! Você não tem permissão para acessar essa área.');
    return router.parseUrl('/dashboard/perfil');
  }

  return true;
};