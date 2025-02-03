import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockGraph = ({ stockData }) => {
  if (!stockData || stockData.length === 0) {
    return (
      <p className="no-data-message">
        No data available for the selected stock and duration.
      </p>
    );
  }

  const labels = stockData.map((data) =>
    new Date(data.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  );

  const prices = stockData.map((data) => data.price);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: prices,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Stock Price Over Time",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Price: $${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5,
        },
      },
    },
  };

  return (
    <div className="graph-container">
      <div style={{ height: "400px", width: "100%" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StockGraph;
