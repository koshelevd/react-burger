import { useEffect, useState, FC } from 'react';
// import { useParams } from 'react-router';
// import { useSelector } from 'react-redux';
import styles from './order-info.module.css';
import { TUser, TOrder } from '../../utils/types';
// import { TRootState } from '../../services/rootReducer';
// import { useAppDispatch } from '../../services/store';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderItem } from '..';
const ings = [
  {
    index: 0,
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
  },
  {
    index: 0,
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
  },
  {
    index: 0,
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
  },
  {
    index: 0,
    _id: '60d3b41abdacab0026a733c8',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0,
  },
  {
    index: 0,
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
  },
  {
    index: 0,
    _id: '60d3b41abdacab0026a733ca',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0,
  },
  {
    index: 0,
    _id: '60d3b41abdacab0026a733cb',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
  },
  {
    index: 0,
    _id: '60d3b41abdacab0026a733cc',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0,
  },
  {
    index: 0,
    _id: '60d3b41abdacab0026a733cd',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    __v: 0,
  },
];
const user: TUser = {
  name: 'asd',
  email: 'asd',
};

const statuses = {
  done: 'Выполнен',
};

const OrderInfo: FC = () => {
  // const { id } = useParams();
  // const dispatch = useAppDispatch();
  // const ingredients = useSelector((state: TRootState) => state.ingredients.all);
  const [data, setData] = useState<TOrder | null>(null);
  // const [uniqueIngredients, setUniqueIngredients] = useState(null);

  // useEffect(() => {
  //   console.log(data?.ingredients);
  //   data?.ingredients.reduce()
  // }, [data]);

  useEffect(() => {
    setData({
      _id: 'asdasdsad',
      number: 34535,
      price: 480,
      name: 'Death Star Starship Main бургер',
      createdAt: 'Сегодня, 16:20 i-GMT+3',
      updatedAt: 'Сегодня, 16:20 i-GMT+3',
      status: 'done',
      owner: user,
      ingredients: ings,
    });
  }, []);

  return (
    <main className={`${styles.main} pl-5 pr-5`}>
      <article className={styles.root}>
        <p className="text text_type_digits-default">#0{data?.number}</p>
        <h2 className={`${styles.name} text text_type_main-medium mt-10 mb-3`}>
          {data?.name}
        </h2>
        <p className={`${styles.status} text text_type_main-default`}>
          {statuses['done']}
        </p>
        <p className={`${styles.name} text text_type_main-medium mt-15 mb-6`}>
          Состав:
        </p>
        <ul className={styles.scrollArea}>
          {data?.ingredients.map((i, index) => (
            <li key={index}>
              <OrderItem data={i} key={i._id} />
            </li>
          ))}
        </ul>
        <div className={`${styles.bottom} mt-10`}>
          <p className="text text_type_main-default text_color_inactive">
            {data?.createdAt}
          </p>
          <p className={styles.price}>
            <span className="text text_type_digits-default text_color_primary mr-2">
              {data?.price}
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </article>
    </main>
  );
};

export default OrderInfo;
