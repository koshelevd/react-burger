import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './draggable-constructor-element.module.css';
import {
  removeCompositionItem,
  swapItems,
} from '../../../services/slices/composition-slice';

const DraggableConstructorElement = React.memo(({ item, id, index }) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const swapIngredients = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(swapItems({ dragIndex, hoverIndex }));
    },
    [dispatch],
  );

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
      swapIngredients(dragIndex, hoverIndex);
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
    dispatch(removeCompositionItem({ index, ingredient }));
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
