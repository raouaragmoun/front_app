import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./header.css";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [dateError, setDateError] = useState("");
  const [destinationError, setDestinationError] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(SearchContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    }));
  };

  const handleSearch = () => {
    // Vérifier si tous les champs sont remplis
    if (!destination.trim()) {
      setDestinationError("Veuillez entrer une destination.");
      return;
    } else {
      setDestinationError("");
    }

    if (!dates[0].startDate || !dates[0].endDate || dates[0].endDate <= dates[0].startDate) {
      setDateError("Veuillez sélectionner des dates valides.");
      return;
    } else {
      setDateError("");
    }

    // Si tous les champs sont remplis, continuer avec la soumission des données
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, options },
    });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <section className="hero-section" style={{ position: "relative" }}>
      <img
        src="https://lp-cms-production.imgix.net/2019-06/c32f29efd9f1e16d0732dc4ce06918fd-sidi-bou-said.jpg"
        alt="Responsive image"
      />
      <div
        className="container"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-80%, -50%)",
        }}
      >
        <div className="row">
          <div className="col-lg-6">
            <div className="hero-text">
              <h1>Une réservation de luxe</h1>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5 offset-xl-2 offset-lg-1">
            <br></br>
            <div className="booking-form">
              <h3>Booking Your Hotel</h3>
              <form action="#">
                <div className="check-date">
                  <label htmlFor="destination">Destination:</label>
                  <input
                    type="text"
                    id="destination"
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  {destinationError && (
                    <p style={{ color: "red", fontSize: "14px" }}>{destinationError}</p>
                  )}
                </div>
                <div className="check-date">
                  <label htmlFor="date-in">Enregistrement:</label>
                  <input
                    type="date"
                    className="date-input"
                    id="date-in"
                    onChange={(e) =>
                      setDates([
                        { ...dates[0], startDate: new Date(e.target.value) },
                      ])
                    }
                  />
                  <i className="icon_calendar"></i>
                </div>
                
                <div className="check-date">
                  <label htmlFor="date-out">Vérifier:</label>
                  <input
                    type="date"
                    className="date-input"
                    id="date-out"
                    onChange={(e) =>
                      setDates([
                        { ...dates[0], endDate: new Date(e.target.value) },
                      ])
                    }
                  />
                  <i className="icon_calendar"></i>
                </div>
                {dateError && (
                  <p style={{ color: "red", fontSize: "14px" }}>{dateError}</p>
                )}

                <div className="select-option">
                  <label htmlFor="guest">nombre des personnes</label>
                  <input
                    type="number"
                    id="guest"
                    placeholder="Number of Adults"
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        adult: parseInt(e.target.value, 10),
                      })
                    }
                  />
                </div>
                {/* <div className="select-option">
                  <label htmlFor="room">Room:</label>
                  <input
                    type="text"
                    id="room"
                    placeholder="Number of Rooms"
                    onChange={(e) => setOptions({ ...options, room: parseInt(e.target.value, 10) })}
                  />
                </div>
                */}
                <button type="button" onClick={handleSearch}>
                Voir les disponibilités
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
