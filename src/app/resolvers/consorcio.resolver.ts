import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Veiculo } from '../models/veiculo.interface';

export const consorcioResolver: ResolveFn<Veiculo[]> = () => {
  const service = inject(ApiService);
  return service.getEstoque();
};