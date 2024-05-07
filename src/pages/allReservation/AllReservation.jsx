import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import "./searchItem.css";

const AllReservation = () => {
  const [allHotels, setAllHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/hotels`
        );
        console.log(response.data);
        setAllHotels(response.data); // assuming the data contains all hotels
      } catch (error) {
        console.error("Failed to fetch hotels", error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="all-hotels">
      <Navbar />
      <div className="container mt-4 mb-5">
        <h1 className="text-center mb-4">All Hotels</h1>
        <div className="row">
          {allHotels.map((hotel, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="searchItem">
                <img src={hotel.photos[0]} alt="" className="siImg" />
                
            </div>
            <div className="siDesc">
                  <h1 className="siTitle">{hotel.name}</h1>
                  <span className="siDistance">distance:{hotel.distance}m from center</span>
                  <span className="siDestination">city: {hotel.city}</span>
                  {/* Add more details here if needed */}
                </div>
                <div className="siDetails">
                  {hotel.rating && (
                    <div className="siRating">
                      <span>Excellent</span>
                      <button>{hotel.rating}</button>
                    </div>
                  )}
                  <div className="siDetailTexts">
                    <span className="siPrice">{hotel.cheapestPrice}DNT</span>
                    {/* Add more details here if needed */}
                    
                  </div>
                  <Link to={`/hotels/${hotel._id}`}>
                      <button className="siCheckButton">See availability</button>
                    </Link>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllReservation;
