import { ITipoParametro } from 'app/entities/tipo-parametro/tipo-parametro.model';

export interface IParametro {
  id: number;
  codigoParam?: string | null;
  descParam?: string | null;
  valorParam?: string | null;
  archivoParam?: string | null;
  archivoParamContentType?: string | null;
  editCteSNParam?: string | null;
  tipo?: ITipoParametro | null;
}

export type NewParametro = Omit<IParametro, 'id'> & { id: null };
