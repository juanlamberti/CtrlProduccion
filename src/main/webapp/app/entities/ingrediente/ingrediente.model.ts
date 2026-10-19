import { IArticulo } from 'app/entities/articulo/articulo.model';

export interface IIngrediente {
  id: number;
  cantidadIng?: number | null;
  articulo?: IArticulo | null;
  insumo?: IArticulo | null;
}

export type NewIngrediente = Omit<IIngrediente, 'id'> & { id: null };
