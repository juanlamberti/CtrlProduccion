export interface IUnidad {
  id: number;
  descUni?: string | null;
}

export type NewUnidad = Omit<IUnidad, 'id'> & { id: null };
