import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Veiculo } from '../../models/veiculo.interface';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {

  private route = inject(ActivatedRoute);

  estoque = signal<Veiculo[]>([]);
  reservas = signal<number[]>([]);

  ngOnInit() {
    const dados = this.route.snapshot.data['estoque'];
    if (dados) {
      this.estoque.set(dados);
    }

    this.carregarReservas();
  }

  carregarReservas() {
    const salvo = localStorage.getItem('reservas');
    if (salvo) {
      this.reservas.set(JSON.parse(salvo));
    }
  }

  reservar(veiculo: Veiculo) {
    const lista = this.reservas();

    if (lista.includes(veiculo.id)) {
      alert(`"${veiculo.modelo}" já está na sua lista de reservas!`);
      return;
    }

    const novaLista = [...lista, veiculo.id];
    this.reservas.set(novaLista);

  
    localStorage.setItem('reservas', JSON.stringify(novaLista));

    alert(`✅ "${veiculo.modelo}" reservado com sucesso!`);
  }

  jaReservado(id: number): boolean {
    return this.reservas().includes(id);
  }
}