import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Reserve from "../../components/reserve/Reserve";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./hotel.css";
const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/id/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    date1 = new Date(date1);
    date2 = new Date(date2);
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  let days;
  const endDate = dates?.[0]?.endDate;
  const startDate = dates?.[0]?.startDate;

  if (endDate && startDate) {
    days = dayDifference(endDate, startDate);
    // rest of your code
  } else {
    // handle the case when endDate or startDate is undefined
  }

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  console.log(`{days} * {data.cheapestPrice} * {options.room} `);
  console.log(`${days} * ${data.cheapestPrice} * ${options.room} `);
  return (
    <div>
      <Navbar />
      <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>Our Rooms</h2>
                <div className="bt-option">
                  <span>Rooms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hotelDetailsPrice">
        <h1>Perfect for a {days}-night stay!</h1>
        <span></span>
        <h2>
          <b>${days * data.cheapestPrice * options.room*options.adult}</b> ({days} nights)
        </h2>

        <button onClick={handleClick}>Reserve or Book Now!</button>
      </div>
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}

          <div className="hotelWrapper">
            <h2>{data.name}</h2>

            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>
                <h5>{data.address}</h5>
              </span>
            </div>

            <div>
              <span className="hotelDistance">
                <FontAwesomeIcon icon={faLocationDot} />{" "}
                {/* Change this icon as needed */}
                <h5>Excellent location – {data.distance}m from center</h5>
              </span>
            </div>

            <span className="hotelPriceHighlight">
              {/* Change this icon as needed */}
              <h4>
                <b>$ </b>Book a stay over <b>{data.cheapestPrice}DNT</b> at this
                property
              </h4>
            </span>

            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">More Information:</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
            </div>
          </div>
          <div></div>
          <ul className="nav justify-content-center border-bottom pb-3 mb-3"></ul>
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
