import { IArchivo, NewArchivo } from './archivo.model';

export const sampleWithRequiredData: IArchivo = {
  id: 12214,
  nombreArc: 'from',
  estadoArc: 'bruised but utterly',
  tipoArc: 'affect',
  archivoArc: '../fake-data/blob/hipster.png',
  archivoArcContentType: 'unknown',
};

export const sampleWithPartialData: IArchivo = {
  id: 882,
  nombreArc: 'uh-huh against',
  estadoArc: 'midst',
  tipoArc: 'seemingly aha meanwhile',
  archivoArc: '../fake-data/blob/hipster.png',
  archivoArcContentType: 'unknown',
};

export const sampleWithFullData: IArchivo = {
  id: 25332,
  nombreArc: 'slather sheepishly',
  estadoArc: 'anticodon terribly',
  tipoArc: 'sparkling excitable animated',
  archivoArc: '../fake-data/blob/hipster.png',
  archivoArcContentType: 'unknown',
};

export const sampleWithNewData: NewArchivo = {
  nombreArc: 'behind fiercely behind',
  estadoArc: 'compete uh-huh',
  tipoArc: 'sweatshop er',
  archivoArc: '../fake-data/blob/hipster.png',
  archivoArcContentType: 'unknown',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
