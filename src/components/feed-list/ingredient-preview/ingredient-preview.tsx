import React, { FC } from 'react';
import styles from './ingredient-preview.module.css';
import { IIngredientPreviewProps } from '../../../utils/types';

const IngredientPreview: FC<IIngredientPreviewProps> = React.memo(
  ({ data, count }) => {
    return (
      <div className={styles.root}>
        <img src={data.image_mobile} alt={data.name} className={styles.image} />
        {count && (
          <div className={`${styles.cover} `}>
            <p className="text text_type_main-small">+{count}</p>
          </div>
        )}
      </div>
    );
  },
);

export default IngredientPreview;
