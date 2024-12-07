import { Home } from "../pages/home";
import { Signup } from "./../pages/signup";
import { Login } from "./../pages/login";
import { Profile } from "./../pages/profile";
import { New } from "./../pages/new";
import { Detail } from "./../pages/detail";
import { Edit } from "./../pages/edit";
import { PublicLayout } from "./../layouts/publicLayout";
import { ProtectedLayout } from "./../layouts/protectedLayout";

import { BrowserRouter, Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new" element={<New />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
