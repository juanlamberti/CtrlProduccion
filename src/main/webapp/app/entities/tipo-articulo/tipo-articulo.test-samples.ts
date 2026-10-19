import { ITipoArticulo, NewTipoArticulo } from './tipo-articulo.model';

export const sampleWithRequiredData: ITipoArticulo = {
  id: 19577,
  descTpArt: 'settler',
};

export const sampleWithPartialData: ITipoArticulo = {
  id: 25545,
  descTpArt: 'rusty weatherize',
};

export const sampleWithFullData: ITipoArticulo = {
  id: 17566,
  descTpArt: 'ack clean disposer',
};

export const sampleWithNewData: NewTipoArticulo = {
  descTpArt: 'march',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
