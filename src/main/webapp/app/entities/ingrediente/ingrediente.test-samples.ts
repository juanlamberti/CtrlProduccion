import { IIngrediente, NewIngrediente } from './ingrediente.model';

export const sampleWithRequiredData: IIngrediente = {
  id: 21611,
  cantidadIng: 24713.5,
};

export const sampleWithPartialData: IIngrediente = {
  id: 16483,
  cantidadIng: 5291.94,
};

export const sampleWithFullData: IIngrediente = {
  id: 13691,
  cantidadIng: 23685.04,
};

export const sampleWithNewData: NewIngrediente = {
  cantidadIng: 10248.7,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
