import React, { useCallback, FC } from 'react';
import { useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './draggable-constructor-element.module.css';
import {
  removeCompositionItem,
  swapItems,
} from '../../../services/slices/composition-slice';
import { IDraggableConstructorElementProps, TIngredient } from '../../../utils/types';
import { useAppDispatch } from '../../../services/store';


const DraggableConstructorElement: FC<IDraggableConstructorElementProps> = React.memo(({ item, index }) => {
  const id = item.id;
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLLIElement>(null);

  const swapIngredients = useCallback(
    (dragIndex: number, hoverIndex: number) => {
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
    hover(item: TIngredient, monitor: DropTargetMonitor) {
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
      const hoverClientY = (clientOffset as XYCoord).y  - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
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

  function deleteIngredient(ingredient: TIngredient, index: number) {
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
