import { Routes, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import {
  ForgotPasswordPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  RegisterPage,
  ProfilePage,
  ResetPasswordPage,
  IngredientPage,
} from '../../pages';

function App() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ingredients" element={<IngredientPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
