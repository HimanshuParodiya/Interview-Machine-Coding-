import React from "react";

const Card = ({ id, name, age, gender, image }) => {
  return (
    <div className="card-container">
      <div className="image-section">
        <img src={image} alt={`${name}`} />
      </div>
      <div className="card-details">
        <div className="text user-name">
          Name: <span>{id}</span>
          Name: <span>{name}</span>
        </div>
        <div className="text user-age">
          Age: <span>{age}</span>
        </div>
        <div className="text user-gender">
          Gender: <span> {gender}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
