export interface ITipoParametro {
  id: number;
  codigoTpParam?: string | null;
  descTpParam?: string | null;
}

export type NewTipoParametro = Omit<ITipoParametro, 'id'> & { id: null };
