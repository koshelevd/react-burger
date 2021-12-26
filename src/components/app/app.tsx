import { useCallback, useEffect, FC } from 'react';
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
import { useAppDispatch } from '../../services/store';

const App: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const backgroundLocation: Location = location.state?.backgroundLocation;
  const navigate = useNavigate();

  const handleModalClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

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
    </>
  );
};

export default App;
