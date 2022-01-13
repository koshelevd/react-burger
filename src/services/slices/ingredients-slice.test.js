import reducer, { fetchIngredients } from './ingredients-slice';
import {
  addCompositionItem,
  removeCompositionItem,
  selectActiveBun,
} from './composition-slice';
import { checkout } from './order-slice';
import { INGREDIENTS_TYPES } from '../../utils/data';

const initialState = {
  all: [],
  isRequestProcessing: false,
  isRequestFailed: false,
  isRequestSucceded: false,
  error: null,
  types: INGREDIENTS_TYPES,
};

const testBun = {
  _id: '60d3b41abdacab0026a733c6',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
};

const testBunSecond = {
  _id: '60d3b41abdacab0026a733c7',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  __v: 0,
};

const testIngredient = {
  _id: '60d3b41abdacab0026a733c9',
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
  __v: 0,
};

describe('Composition slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('sets isRequestProcessing true when fetchIngredients is pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isRequestProcessing: true,
    });
  });

  it('sets all ingredients when fetchIngredients is successfully fulfilled', () => {
    const previousState = {
      ...initialState,
      isRequestProcessing: true,
    };
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: { data: [testBun, testBunSecond, testIngredient] },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isRequestProcessing: false,
      all: [testBun, testBunSecond, testIngredient],
    });
  });

  it('sets error when fetchIngredients is rejected', () => {
    const previousState = {
      ...initialState,
      isRequestProcessing: true,
    };
    const action = {
      type: fetchIngredients.rejected.type,
      error: {
        message: 'error',
      },
    };
    const state = reducer(previousState, action);
    expect(state).toEqual({
      ...initialState,
      isRequestFailed: true,
      error: 'error',
    });
  });

  it('adds quantity count to ingredient', () => {
    const previousState = {
      ...initialState,
      all: [testBun, testBunSecond, testIngredient],
    };
    const state = reducer(previousState, addCompositionItem(testIngredient));
    expect(state).toEqual({
      ...previousState,
      all: [testBun, testBunSecond, { ...testIngredient, count: 1 }],
    });
  });

  it('adds quantity count to active bun', () => {
    const previousState = {
      ...initialState,
      all: [testBun, testBunSecond, testIngredient],
    };
    const state = reducer(previousState, selectActiveBun(testBun));
    expect(state).toEqual({
      ...previousState,
      all: [
        { ...testBun, count: 2 },
        { ...testBunSecond, count: 0 },
        testIngredient,
      ],
    });
  });

  it('changes ingredient counter while removing', () => {
    const previousState = {
      ...initialState,
      all: [testBun, testBunSecond, { ...testIngredient, count: 100 }],
    };
    const state = reducer(
      previousState,
      removeCompositionItem({ ingredient: testIngredient }),
    );
    expect(state).toEqual({
      ...previousState,
      all: [testBun, testBunSecond, { ...testIngredient, count: 99 }],
    });
  });

  it('clears ingredients counters after checkout', () => {
    const previousState = {
      ...initialState,
      all: [
        { ...testBun, count: 2 },
        testBunSecond,
        { ...testIngredient, count: 100 },
      ],
    };
    const state = reducer(previousState, checkout.fulfilled);
    expect(state).toEqual({
      ...previousState,
      all: [
        { ...testBun, count: 0 },
        { ...testBunSecond, count: 0 },
        { ...testIngredient, count: 0 },
      ],
    });
  });
});
