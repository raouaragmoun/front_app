import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/room/${hotelId}`);
  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  let daysDifference = 0;
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    console.log(startDate);
    console.log(endDate);

    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    // Calculate the difference in milliseconds
    const timeDifference = date2 - date1;

    // Convert milliseconds to days
    daysDifference = (timeDifference / (1000 * 60 * 60 * 24));

    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];

    console.log(end);
    console.log(date);
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();
  const userId = localStorage.getItem("user") || {};

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios
            .put(`http://localhost:8800/api/rooms/availability/${roomId}`, {
              userId: user._id,
              checkInDate: alldates[0],
              checkOutDate: alldates[1],
              peopleNumber: options.adult,
              dates: alldates.length,
              daysDifference: daysDifference,
              hotelId: hotelId,
            })
            .then((data) => {
              toast.success("reservation completed");
              console.log(data);
            })
            .catch(() => toast.error("reservation "));
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rMax">
                Nombre de personnes : <b>{item.maxPeople}</b>
              </div>
              Prix:
              <div className="rPrice">{item.price}</div>
            </div>

            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
        Réservez maintenant !
        </button>
      </div>
    </div>
  );
};

export default Reserve;
