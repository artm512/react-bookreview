import App from "./../App.tsx";
import { Signup } from "./../pages/signup";
import { Login } from "./../pages/login";
import { PublicLayout } from "./../layouts/publicLayout";

import { BrowserRouter, Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
