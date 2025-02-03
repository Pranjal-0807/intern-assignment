import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks } from "./store/slices/stockSlice";
import { fetchStockMetadata } from "./store/slices/stockMetadataSlice";
import Dropdown from "./components/Dropdown";
import StockGraph from "./components/StockGraph";
import "./styles.css";

const App = () => {
  const dispatch = useDispatch();
  const { stocks, loading, error } = useSelector((state) => state.stock);
  const { stockMetadata } = useSelector((state) => state.stockMetadata);
  const [selectedStockId, setSelectedStockId] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("1y");

  useEffect(() => {
    dispatch(fetchStockMetadata());
  }, [dispatch]);

  useEffect(() => {
    if (stockMetadata.length > 0) {
      const defaultStock = stockMetadata[0];
      setSelectedStockId(defaultStock.id);
      setSelectedDuration(defaultStock.available[0]);
    }
  }, [stockMetadata]);

  useEffect(() => {
    if (selectedStockId && selectedDuration) {
      dispatch(
        fetchStocks({ id: selectedStockId, duration: selectedDuration })
      );
    }
  }, [dispatch, selectedStockId, selectedDuration]);

  const handleStockChange = (event) => {
    const stockId = event.target.value;
    setSelectedStockId(stockId);

    const stock = stockMetadata.find((stock) => stock.id === stockId);
    if (stock) {
      setSelectedDuration(stock.available[0]);
    }
  };

  const handleDurationChange = (event) => {
    const duration = event.target.value;
    const stock = stockMetadata.find((stock) => stock.id === selectedStockId);

    if (stock?.available.includes(duration)) {
      setSelectedDuration(duration);
    }
  };

  return (
    <div className="app-container">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <Dropdown stocks={stockMetadata} onStockChange={handleStockChange} />

      <div className="dropdown-container">
        <select
          className="dropdown"
          onChange={handleDurationChange}
          value={selectedDuration}
        >
          {stockMetadata
            .find((stock) => stock.id === selectedStockId)
            ?.available.map((duration) => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
        </select>
      </div>

      <StockGraph stockData={stocks} />
    </div>
  );
};

export default App;
