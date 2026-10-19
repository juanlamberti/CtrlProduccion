import { ITipoParametro, NewTipoParametro } from './tipo-parametro.model';

export const sampleWithRequiredData: ITipoParametro = {
  id: 18305,
  codigoTpParam: 'hm politely',
  descTpParam: 'vista unless pfft',
};

export const sampleWithPartialData: ITipoParametro = {
  id: 20285,
  codigoTpParam: 'immediately',
  descTpParam: 'emergent',
};

export const sampleWithFullData: ITipoParametro = {
  id: 9070,
  codigoTpParam: 'mmm thankfully aband',
  descTpParam: 'thorough',
};

export const sampleWithNewData: NewTipoParametro = {
  codigoTpParam: 'ribbon of excepting',
  descTpParam: 'definite lazily wombat',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
