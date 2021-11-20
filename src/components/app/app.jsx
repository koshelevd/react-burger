import { useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Layout, IngredientDetails, Modal, ProfileLayout } from '../.';
import {
  ForgotPasswordPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  RegisterPage,
  ProfilePage,
  ResetPasswordPage,
} from '../../pages';
import { RequireAuth } from '../.';

function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const navigate = useNavigate();

  const handleModalClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />
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
            <Route path="orders" element={<>To develop</>} />
          </Route>
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
        </Routes>
      )}
    </>
  );
}

export default App;
