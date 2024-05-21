import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../components/login";
import Register from "../components/register";
import Home from "../components/home";
import Navbar from "../layout/navbar";
import Error from "../components/error";
import Profile from "../components/profile";

const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"*"} element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
