import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";

import ReservationItem from "./ReservationItem";
import "./myreservation.css";
const Myreservation = () => {
  const [myReservation, setMyReservation] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchReservations = async () => {
      console.log(user._id);
      try {
        const response = await axios.get(
          `http://localhost:8800/api/reservation/getreservationId/${user._id}`
        );
        console.log(response.data);
        setMyReservation(response.data); // assuming the data is the reservation
      } catch (error) {
        console.error("Failed to fetch reservations", error);
      }
    };
    fetchReservations();
  }, [user._id]);
  return (
    <div>
      <Navbar />
      <div className="container mt-4 mb-5">
        <h1>My Reservation</h1>
        {[...myReservation].reverse().map((item, index) => (
          <ReservationItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Myreservation;
