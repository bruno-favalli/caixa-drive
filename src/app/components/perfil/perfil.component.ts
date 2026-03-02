import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Veiculo } from '../../models/veiculo.interface';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  private api = inject(ApiService);
  private router = inject(Router);

  nomeUsuario = signal('');
  role = signal('');

  estoque = signal<Veiculo[]>([]);
  idsReservados = signal<number[]>([]);

  veiculosReservados = computed(() => {
    return this.estoque().filter(v => this.idsReservados().includes(v.id));
  });

  totalReservado = computed(() => {
    return this.veiculosReservados().reduce((acc, v) => acc + v.preco, 0);
  });

  ngOnInit() {
    this.nomeUsuario.set(localStorage.getItem('nomeUsuario') ?? '');
    this.role.set(localStorage.getItem('role') ?? '');

    const salvo = localStorage.getItem('reservas');
    if (salvo) {
      this.idsReservados.set(JSON.parse(salvo));
    }

    this.api.getEstoque().subscribe({
      next: (dados) => this.estoque.set(dados),
      error: () => console.error('Erro ao carregar estoque no perfil')
    });
  }

  cancelarReserva(id: number) {
    const novaLista = this.idsReservados().filter(item => item !== id);
    this.idsReservados.set(novaLista);
    localStorage.setItem('reservas', JSON.stringify(novaLista));
  }

  irParaCatalogo() {
    this.router.navigate(['/dashboard/catalogo']);
  }
}