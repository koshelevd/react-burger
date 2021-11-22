import PropTypes from 'prop-types';

const ingredient = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
};

export const ingredientPropType = PropTypes.shape(ingredient);
export const ingredientItemPropType = PropTypes.shape({
  ...ingredient,
  id: PropTypes.string,
});

export const arrayOfIngredientsPropType = PropTypes.arrayOf(ingredientPropType);

export const typePropType = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});

export const arrayOfTypesPropType = PropTypes.arrayOf(typePropType);
