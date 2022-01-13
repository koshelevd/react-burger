import reducer, {
  addCompositionItem,
  removeCompositionItem,
  selectActiveBun,
  swapItems,
} from './composition-slice';
import { checkout } from './order-slice';

const initialState = {
  components: [],
  activeBun: null,
};

const testIngredient = {
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

const testIngredientSecond = {
  _id: '60d3b41abdacab0026a733c6_',
  name: 'Краторная булка N-200i_',
  type: 'sauce',
  proteins: 801,
  fat: 241,
  carbohydrates: 531,
  calories: 4201,
  price: 12551,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png_',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png_',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png_',
  __v: 0,
};

describe('Composition slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('adds ingredient with uuid', () => {
    const previousState = {
      ...initialState,
    };
    const state = reducer(previousState, addCompositionItem(testIngredient));
    expect(state).toEqual({
      ...initialState,
      components: [
        ...initialState.components,
        { ...testIngredient, uuid: expect.any(String) },
      ],
    });
  });

  it('removes ingredient from composition at index', () => {
    const previousState = {
      ...initialState,
    };
    let state = reducer(previousState, addCompositionItem(testIngredient));
    state = reducer(state, addCompositionItem(testIngredientSecond));
    state = reducer(state, removeCompositionItem({ index: 1 }));
    expect(state).toEqual({
      ...initialState,
      components: [
        ...initialState.components,
        { ...testIngredient, uuid: expect.any(String) },
      ],
    });
  });

  it('selects active bun', () => {
    const previousState = {
      ...initialState,
    };
    let state = reducer(previousState, selectActiveBun(testIngredient));

    expect(state).toEqual({
      ...initialState,
      activeBun: testIngredient,
    });
  });

  it('swaps ingredients', () => {
    const previousState = {
      ...initialState,
    };
    let state = reducer(previousState, addCompositionItem(testIngredient));
    state = reducer(state, addCompositionItem(testIngredientSecond));
    state = reducer(state, swapItems({ hoverIndex: 0, dragIndex: 1 }));
    expect(state).toEqual({
      ...initialState,
      components: [
        ...initialState.components,
        { ...testIngredientSecond, uuid: expect.any(String) },
        { ...testIngredient, uuid: expect.any(String) },
      ],
    });
  });

  it('clears composition after checkout', () => {
    const previousState = {
      activeBun: testIngredient,
      components: [
        testIngredientSecond,
        testIngredientSecond,
        testIngredientSecond,
      ],
    };
    const action = {
      type: checkout.fulfilled.type,
    };
    const state = reducer(previousState, action);
    expect(state).toEqual(initialState);
  });
});
