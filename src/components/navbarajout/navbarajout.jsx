import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbarajout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div > 
<img
    style={{ height: '500px', width: '100%' }}
    src="https://lp-cms-production.imgix.net/2019-06/c32f29efd9f1e16d0732dc4ce06918fd-sidi-bou-said.jpg"
    className="img-fluid"
    alt="Responsive image"
  />      </div>



  );
};

export default Navbarajout;
