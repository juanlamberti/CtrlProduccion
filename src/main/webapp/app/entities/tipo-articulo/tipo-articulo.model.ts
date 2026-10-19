export interface ITipoArticulo {
  id: number;
  descTpArt?: string | null;
}

export type NewTipoArticulo = Omit<ITipoArticulo, 'id'> & { id: null };
