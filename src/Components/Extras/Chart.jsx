import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  PieController,
  DoughnutController,
  
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  LineController,
  BarController,
  PieController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ chartData, labels, text, type }) => {
  const canvasRef = useRef(null);
  const { direction } = useSelector((store) => store.population);

  useEffect(() => {
    let localChartInstance = null;
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      localChartInstance = new ChartJS(ctx, {
        type: type,
        data: {
          labels: labels,
          datasets: [
            {
              label: `Population Size`,
              data: chartData,
              fill: false,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              borderColor: "#2BB52A",
              borderWidth: 3,
              pointStyle: "rectRounded",
              pointBackgroundColor: "#2BB52A",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "#2BB52A",
              pointRadius: 7,
              pointHoverRadius: 10,
              tension: 0.2,
            },
          ],
        },
        options: {
          indexAxis: "x",
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                color: "rgba(0, 0, 0, 0.3)",
                borderColor: "#D6D9D7",
              },
              ticks: {
                color: "#D6D9D7",
                callback: function (value) {
                  return value / 1000000 + " M";
                },
              },
              title: {
                display: true,
                text: "Population",
              },
            },
            x: {
              grid: {
                display: true,
                color: "rgba(0, 0, 0, 0.3)",
              },
              ticks: {
                color: "#D6D9D7",
              },
              title: {
                display: true,
                text: "Year",
              },
            },
          },
          tooltips: {
            enabled: true,
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleFontColor: "#ffffff",
            bodyFontColor: "#ffffff",
            borderColor: "#ffffff",
            borderWidth: 1,
            callbacks: {
              label: function (tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || "";
                if (label) {
                  label += ": ";
                }
                label += Math.round(tooltipItem.yLabel * 100) / 100;
                return label + " people";
              },
            },
          },
          maintainAspectRatio: false,
          responsive: true,
          animation: {
            duration: 1000,
            easing: "easeOutBounce",
          },
          plugins: {
            filler: false,
            legend: {
              display: true,
              position: "top",
              labels: {
                color: "#D6D9D7",
                font: {
                  size: 14,
                },
              },
            },
          },
        },
      });
    }
    return () => {
      localChartInstance.destroy();
    };
  }, [chartData, direction, labels, type]);
  return (
    <div className="md:w-[48%] 0:w-[280px] 475:w-[425px] h-[550px] sm:[450px] md:h-[400px] flex flex-col gap-4 bg-darkGray p-4 rounded-xl">
      <div className="flex justify-between">
        <p className="text-[1.25rem] font-medium">{text}</p>
        <p className="text-lightGray">United States</p>
      </div>
      <div className="w-full h-full">
        <canvas className="" ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

Chart.propTypes = {
  Data: PropTypes.any,
  chartData: PropTypes.array.isRequired,
  labels: PropTypes.array,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Chart;
