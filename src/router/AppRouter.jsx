import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { FavoritesPage } from "../pages/FavoritesPage.jsx/FavoritesPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { FeaturedPage } from "../pages/FeaturedPage/FeaturedPage";
import { UserPage } from "../pages/UserPage/UserPage";

export const AppRouter = () => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <>
      {isAuth ? (
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/featured" element={<FeaturedPage />} />
          <Route path="/perfil" element={<UserPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage setIsAuth={setIsAuth} />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      )}
    </>
  );
};
