export interface IArchivo {
  id: number;
  nombreArc?: string | null;
  estadoArc?: string | null;
  tipoArc?: string | null;
  archivoArc?: string | null;
  archivoArcContentType?: string | null;
}

export type NewArchivo = Omit<IArchivo, 'id'> & { id: null };
