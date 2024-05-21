import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(false);

  const checkedAuthentication = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    } else {
      const res = await axios.get(`http://localhost:5000/profile`, {
        headers: {
          Authorization: token,
        },
      });

      return res.data;
    }
  };
  useEffect(() => {
    checkedAuthentication().then((data) => {
      if (!data) {
        console.log("Authentication failed");
        console.log(data);
        navigate("/login", { replace: true });
      } else {
        console.log("Successfully authenticated");
        console.log(data);
        setUser(data.user.username);
      }
    });
  }, []);
  return (
    <div>
      <h1>Profile Page</h1>
      {user && <h1>{user}</h1>}
    </div>
  );
};

export default Profile;
