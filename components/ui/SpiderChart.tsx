import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
);

const MyLineChart = () => {
  // X-axis labels
  const labels = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug"];

  // Sample datasets
  const dataset1 = [12, 45, 67, 43, 89, 34, 67, 43];
  const dataset2 = [20, 35, 50, 75, 60, 80, 55, 40];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dataset1,
        borderColor: "rgba(255, 99, 132, 1)", // Red
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: dataset2,
        borderColor: "rgba(54, 162, 235, 1)", // Blue
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Y-axis Label",
        },
        display: true,
        min: 10,
      },
      x: {
        title: {
          display: true,
          text: "X-axis Label",
        },
        display: true,
      },
    },
  };

  return (
    <div style={{ width: "1000px", margin: "0 auto" }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default MyLineChart;
