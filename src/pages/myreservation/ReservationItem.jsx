import React from "react";

const ReservationItem = ({ item, availableRooms }) => {
  // Vérifier si le nombre de chambres demandées est disponible
  const isAvailable = item.reservation.numberOfRooms <= availableRooms;

  return (
    <div className={`searchItem ${isAvailable ? '' : 'notAvailable'}`}>
      <img
        src={`${item.hotel.photos && item.hotel.photos[0]}`}
        alt={`${item.hotel.name}`}
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.hotel.name}</h1>
        <span className="siDistance">{item.hotel.desc}</span>
        <span className="siSubtitle">{item.room.title}</span>
        <span className="siFeatures">
          From {new Date(item.reservation.checkInDate).toLocaleDateString()} To{" "}
          {new Date(item.reservation.checkOutDate).toLocaleDateString()}{" "}
        </span>
        <span className="siCancelOp">
          {isAvailable ? 'Confirmation: Chambres disponibles pour ces dates' : 'Erreur: Chambres non disponibles pour ces dates'}
        </span>
        <span className="siCancelOpSubtitle">
          Reserved in {new Date(item.reservation.createdAt).toLocaleDateString()}
          {item.user && (
            <>
              <span > by {item.user.username} {' '}</span>
              <br />
              <span>email: {item.user.email}</span>
            </>
          )}
          <br />
          {item.hotel.city}
          {item.hotel.address}
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <div></div>
          <span>{item.hotel.type}</span>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${item.reservation.totalPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
        </div>
      </div>
    </div>
  );
};

export default ReservationItem;
