import { IUnidad, NewUnidad } from './unidad.model';

export const sampleWithRequiredData: IUnidad = {
  id: 21778,
  descUni: 'whenever ouch kooky',
};

export const sampleWithPartialData: IUnidad = {
  id: 32157,
  descUni: 'than',
};

export const sampleWithFullData: IUnidad = {
  id: 10318,
  descUni: 'reasoning yowza',
};

export const sampleWithNewData: NewUnidad = {
  descUni: 'while siege',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
