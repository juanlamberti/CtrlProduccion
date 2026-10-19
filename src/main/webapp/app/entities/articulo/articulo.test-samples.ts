import { IArticulo, NewArticulo } from './articulo.model';

export const sampleWithRequiredData: IArticulo = {
  id: 17019,
  descArt: 'furthermore agile',
  presentacionCompraArt: 25708.75,
  valorPresentacionArt: 32721.3,
};

export const sampleWithPartialData: IArticulo = {
  id: 24092,
  descArt: 'lazily',
  unidadGenerarArt: 28594.8,
  presentacionCompraArt: 27570.65,
  valorPresentacionArt: 19241.97,
};

export const sampleWithFullData: IArticulo = {
  id: 31590,
  descArt: 'voluntarily',
  recetaArt: 'boo which scare',
  unidadGenerarArt: 18256.28,
  mermaPreparacionArt: 21188.78,
  pesoArt: 9735.54,
  presentacionCompraArt: 7269.56,
  valorPresentacionArt: 11194.77,
};

export const sampleWithNewData: NewArticulo = {
  descArt: 'better',
  presentacionCompraArt: 18432,
  valorPresentacionArt: 10550.64,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
