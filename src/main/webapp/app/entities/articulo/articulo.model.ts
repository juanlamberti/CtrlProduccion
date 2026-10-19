import { ITipoArticulo } from 'app/entities/tipo-articulo/tipo-articulo.model';
import { IUnidad } from 'app/entities/unidad/unidad.model';

export interface IArticulo {
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
