import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './draggable-constructor-element.module.css';
import { REMOVE_INGREDIENT } from '../../../services/actions/ingredients';
import {
  REMOVE_COMPOSITION_ITEM,
  SWAP_ITEMS,
} from '../../../services/actions/composition';

const DraggableConstructorElement = React.memo(({ item, id, index }) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const swapItems = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: SWAP_ITEMS,
      dragIndex,
      hoverIndex,
    });
  }, [dispatch]);
  
  const [{ handlerId }, drop] = useDrop({
    accept: 'element',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      swapItems(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [, drag] = useDrag({
    type: 'element',
    item: () => {
      return { id, index };
    },
  });

  drag(drop(ref));

  function deleteIngredient(ingredient, index) {
    dispatch({
      type: REMOVE_INGREDIENT,
      ingredient,
    });
    dispatch({
      type: REMOVE_COMPOSITION_ITEM,
      index,
    });
  }

  return (
    <li
      className={`mb-4 ${styles.element}`}
      ref={ref}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => deleteIngredient(item, index)}
      />
    </li>
  );
});

export default DraggableConstructorElement;
