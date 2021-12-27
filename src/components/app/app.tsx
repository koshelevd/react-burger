import { useCallback, useEffect, FC, useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Location,
} from 'react-router-dom';
import { Layout, IngredientDetails, Modal, ProfileLayout, OrderInfo } from '..';
import {
  ForgotPasswordPage,
  LoginPage,
  MainPage,
  FeedPage,
  OrdersPage,
  NotFoundPage,
  RegisterPage,
  ProfilePage,
  ResetPasswordPage,
} from '../../pages';
import { RequireAuth } from '..';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { css } from '@emotion/react';
import HashLoader from 'react-spinners/HashLoader';
import ModalOverlay from '../../components/modal/modal-overlay/modal-overlay';
import { TRootState } from '../../services/rootReducer';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: '#0cc';
  z-index: 100;
`;

const App: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const backgroundLocation: Location = location.state?.backgroundLocation;
  const navigate = useNavigate();
  const { isIngredientsLoading, isOrderLoading, isFeedLoading } = useAppSelector(
    (state: TRootState) => ({
      isIngredientsLoading: state.ingredients.isRequestProcessing,
      isOrderLoading: state.order.isRequestProcessing,
      isFeedLoading: state.feed.isRequestProcessing,
    }),
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleModalClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(isIngredientsLoading || isOrderLoading || isFeedLoading);
  }, [isIngredientsLoading, isOrderLoading, isFeedLoading]);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="feed">
            <Route index element={<FeedPage />} />
            <Route path=":id" element={<OrderInfo />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <ProfileLayout />
              </RequireAuth>
            }
          >
            <Route index element={<ProfilePage />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>
          <Route path="/profile/orders/:id" element={<OrderInfo />} />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                header="Детали ингредиента"
                closeHandler={handleModalClose}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal closeHandler={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal closeHandler={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
      {isLoading && (
        <ModalOverlay>
          <HashLoader
            color="#0cc"
            loading={isLoading}
            css={override}
            size={150}
          />
        </ModalOverlay>
      )}
    </>
  );
};

export default App;
