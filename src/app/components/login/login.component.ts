import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario = signal('');
  senha = signal('');

  erroLogin = signal('');

  carregando = signal(false);

  private api = inject(ApiService);
  private router = inject(Router);

  entrar() {
    this.erroLogin.set('');
    this.carregando.set(true);

    this.api.getUsuarios().subscribe({

      next: (usuarios) => {
        const encontrado = usuarios.find(
          u => u.usuario === this.usuario() && u.senha === this.senha()
        );

        if (encontrado) {
        
          localStorage.setItem('logado', 'true');
          localStorage.setItem('role', encontrado.role);
          localStorage.setItem('nomeUsuario', encontrado.usuario);

          this.router.navigate(['/dashboard/catalogo']);
        } else {
          this.erroLogin.set('Usuário ou senha inválidos. Tente novamente.');
        }

        this.carregando.set(false);
      },

      error: () => {
        this.erroLogin.set('Erro ao conectar. Tente novamente mais tarde.');
        this.carregando.set(false);
      }
    });
  }
}