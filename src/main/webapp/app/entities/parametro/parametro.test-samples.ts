import { IParametro, NewParametro } from './parametro.model';

export const sampleWithRequiredData: IParametro = {
  id: 4387,
  codigoParam: 'pry yawningly',
  descParam: 'obesity',
  editCteSNParam: 'br',
};

export const sampleWithPartialData: IParametro = {
  id: 17202,
  codigoParam: 'pack aha',
  descParam: 'dimly snoop longingly',
  archivoParam: '../fake-data/blob/hipster.png',
  archivoParamContentType: 'unknown',
  editCteSNParam: 'th',
};

export const sampleWithFullData: IParametro = {
  id: 21682,
  codigoParam: 'baritone',
  descParam: 'duh intelligent especially',
  valorParam: 'hutch psst',
  archivoParam: '../fake-data/blob/hipster.png',
  archivoParamContentType: 'unknown',
  editCteSNParam: 'mo',
};

export const sampleWithNewData: NewParametro = {
  codigoParam: 'woot reprimand hm',
  descParam: 'down',
  editCteSNParam: 'ty',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
