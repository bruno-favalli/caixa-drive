import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  
  role = signal('');
  nomeUsuario = signal('');

  private router = inject(Router);

  ngOnInit() {

    this.role.set(localStorage.getItem('role') ?? '');
    this.nomeUsuario.set(localStorage.getItem('nomeUsuario') ?? '');
  }

  sair() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}