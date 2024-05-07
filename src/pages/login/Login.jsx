import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import toast from "react-hot-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      toast.success("Login success");
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      toast.error(error.message);
    }
  };

  return (
    <div className="d-lg-flex half">
      <div className="bg order-1 order-md-2"></div>
      <div className="contents order-2 order-md-1">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
              <h3>
                Login to <strong>lamabooking</strong>
              </h3>
              <p className="mb-4">
                
              </p>
              <form action="#" method="post">
                <div className="form-group first">
                  <label htmlFor="username">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    id="email"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group last mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    id="password"
                    onChange={handleChange}
                  />
                </div>

                <input
                  type="button"
                  value=" se connecter"
                  disabled={loading}
                  onClick={handleClick}
                  className="btn btn-block btn-login"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
