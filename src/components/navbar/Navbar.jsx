import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
      <nav className="container navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            <span className="logo">lamabooking</span>
          </Link>{" "}
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                <span className="sr-only"></span>
              </a>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to={'/myreservation'} >
                My Reservation <span className="sr-only"></span>
              </Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" to={'/allreservation'} >
                All Hotel <span className="sr-only"></span>
              </Link>
            </li>
          </ul>
        </div>
        <form
          className="form-inline my-2 my-lg-0 ml-3"
          style={{ color: "black", textDecoration: "none" }}
        >
          {user ? (
            <div>

<img className="cellImg" src={user.img}  />
{user.username}
    <button className="navButton" onClick={handleLogout}>Logout</button>

<span>

</span>
            </div>
          ) : (
            <div>
              <Link to={"register"}>
                <button className="navButton">Register</button>
              </Link>
              <Link to={"login"}>
                <button className="navButton">Login</button>
              </Link>
            </div>
          )}{" "}
        </form>
      </nav>
   
  );
};

export default Navbar;
