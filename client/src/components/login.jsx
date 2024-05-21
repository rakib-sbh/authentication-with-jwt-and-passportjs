import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:5000/login`, {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);

      console.log(localStorage.getItem("token"));
      navigate("/profile", { replace: true });
    } catch (error) {
      console.log(error.message);
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Enter Your Username : </label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            required
            onChange={(e) => setUserName(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">Enter Your Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
