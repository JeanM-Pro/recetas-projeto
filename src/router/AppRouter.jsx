import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { FavoritesPage } from "../pages/FavoritesPage.jsx/FavoritesPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { FeaturedPage } from "../pages/FeaturedPage/FeaturedPage";
import { UserPage } from "../pages/UserPage/UserPage";
import { auth } from "../firebaseConfig/firebase";
import UserProfile from "../components/UserProfile/UserProfile";

export const AppRouter = () => {
  const [user, setUser] = useState(null);
  console.log(process.env.REACT_APP_API_URL);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {user ? (
        <Routes>
          <Route path="/home" element={<HomePage setUser={setUser} />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/featured" element={<FeaturedPage />} />
          <Route path="/perfil" element={<UserPage />} />
          <Route path="/user-profile/:userId" element={<UserProfile />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<LoginPage setUser={setUser} user={user} />}
          />
          <Route
            path="/register"
            element={<RegisterPage setUser={setUser} user={user} />}
          />
        </Routes>
      )}
    </>
  );
};
