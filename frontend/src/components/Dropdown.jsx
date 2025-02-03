import React from "react";
import "../styles.css"; 

const Dropdown = ({ stocks, onStockChange }) => {
  return (
    <div className="dropdown-container">
      <select className="dropdown" onChange={onStockChange}>
        {stocks.length === 0 ? (
          <option>No stocks available</option>
        ) : (
          stocks.map((stock) => (
            <option key={stock.id} value={stock.id}>
              {stock.name} ({stock.symbol})
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default Dropdown;
