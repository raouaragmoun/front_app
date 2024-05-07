import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div>
      {/* <div className="breadcrumb-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb-text">
                        <h2>Our Rooms</h2>
                        <div className="bt-option">
                            <a href="./home.html">Home</a>
                            <span>Rooms</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> */}

      <section className="rooms-section spad">
        <div className="container">
          <div className="row">
            <div className="item">
              <div className="room-item">
                <img src={item.photos[0]} alt=""></img>
                <div className="ri-text">
                  <h4>{item.name}</h4>
                  <h3>
                    {item.cheapestPrice}DNT<span>/Par nuit</span>
                  </h3>
                  <table>
                    <tbody>
                      <tr>
                        <td className="r-o">Distance:</td>
                        <td>{item.distance}m from center</td>
                      </tr>
                      <br></br>
                      <tr>
                        <td className="r-o">Adresse:</td>
                        <td>{item.address}</td>
                      </tr>
                      <br></br>
                      <tr>
                        <td className="r-o">ville:</td>
                        <td>{item.city}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Link to={`/hotels/${item._id}`}>
                    <a className="primary-btn">Plus de détails</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchItem;

/**************
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 
import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem; 




********* */
