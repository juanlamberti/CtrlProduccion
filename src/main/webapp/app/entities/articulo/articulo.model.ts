import { ITipoArticulo } from 'app/entities/tipo-articulo/tipo-articulo.model';
import { IUnidad } from 'app/entities/unidad/unidad.model';

import { NaturalezaArticulo } from 'app/entities/enumerations/naturaleza-articulo.model';

export interface IArticulo {
  naturalezaArt?: NaturalezaArticulo | null;
  id: number;
  descArt?: string | null;
  recetaArt?: string | null;
  unidadGenerarArt?: number | null;
  mermaPreparacionArt?: number | null;
  pesoArt?: number | null;
  presentacionCompraArt?: number | null;
  valorPresentacionArt?: number | null;
  unidadPresentacionArt?: IUnidad | null;
  tipoArt?: ITipoArticulo | null;
}

export type NewArticulo = Omit<IArticulo, 'id'> & { id: null };
