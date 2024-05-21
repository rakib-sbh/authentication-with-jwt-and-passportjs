import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
      <NavLink to={"/"} className={"nav-link"}>
        Home
      </NavLink>
      <NavLink to={"/login"} className={"nav-link"}>
        Login
      </NavLink>
      <NavLink to={"/register"} className={"nav-link"}>
        Register
      </NavLink>
      <NavLink to={"/profile"} className={"nav-link"}>
        Profile
      </NavLink>
    </nav>
  );
};

export default Navbar;
