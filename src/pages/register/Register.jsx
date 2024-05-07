import { useNavigate } from "react-router-dom";
import "./register.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(credentials);
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    console.log(credentials);
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/register",
        credentials
      );
      dispatch({ type: "Register_SUCCESS", payload: res.data.details });
      navigate("/login");

      toast.success(`Welcome ${credentials.username}`);
    } catch (err) {
      dispatch({ type: "register_FAILURE", payload: err.response.data });
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
                  <label htmlFor="username">Prenom</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    id="username"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group first">
                  <label htmlFor="username">e-Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="your-email@gmail.com"
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
                  type="submit"
                  disabled={loading}
                  onClick={handleClick}
                  value="s'inscrire"
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

export default Register;
