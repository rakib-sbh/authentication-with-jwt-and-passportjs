import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/register`, {
        username: userName,
        password,
      });
      setStatus(true);
      navigate("/login", { replace: true });
    } catch (error) {
      console.log("Error in request");
      navigate("/register", { replace: true });
    }

    setUserName("");
    setPassword("");
  };

  return (
    <div>
      <h1>User Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Enter Name : </label>
          <input
            type="text"
            id="username"
            placeholder="Enter Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Enter Password :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter Password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {status && <div>User registration successfull</div>}
    </div>
  );
};

export default Register;
