import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { setDirection, setXAxis, setYAxis } from "../../redux/populationSlice";

// Register the components you will use
ChartJS.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ Data }) => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const { xAxis, yAxis, direction } = useSelector((store) => store.population);

  const chartData = Data.populationCounts
    .filter((data, idx) => {
      return idx > 20;
    })
    .map((data) => data.value);
  console.log(chartData);

  const labels = Data.populationCounts
    .filter((data, idx) => {
      return idx > 20;
    })
    .map((data) => data.year);
  console.log(labels);

  window.onresize = () => {
    window.innerWidth <= 500
      ? dispatch(setXAxis("Population"))
      : dispatch(setXAxis("Year"));
    window.innerWidth <= 500
      ? dispatch(setYAxis("Year"))
      : dispatch(setYAxis("Population"));
      window.innerWidth <= 500
        ? dispatch(setDirection("y"))
        : dispatch(setDirection("x"));
  };


  useEffect(() => {
    let localChartInstance = null;
    if (canvasRef.current && chartData && labels) {
      const ctx = canvasRef.current.getContext("2d");

      //   if (window.myLineChart instanceof ChartJS) {
      //     window.myLineChart.destroy();
      //   }

      localChartInstance = new ChartJS(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: `Population Size of ${Data.country}`,
              data: chartData,
              fill: true,
              backgroundColor: "rgb(43, 181, 42, 0.2)", // Fill color under the line
              borderColor: "#D6D9D7", // Line color
              borderWidth: 1, // Creates a dashed line [dashLength, spaceLength]
              pointStyle: "rectRounded",
              pointBackgroundColor: "#2BB52A", // Color of the points
              pointBorderColor: "#fff", // Border color of the points
              pointHoverBackgroundColor: "#fff", // Background color of points upon hover
              pointHoverBorderColor: "#2BB52A", // Border color of points upon hover
              pointRadius: 3, // Radius of the point
              pointHoverRadius: 8, // Radius of the point on hover
              tension: 2, // Bezier curve tension of the line. Set to 0 for straight lines.
            },
          ],
        },
        options: {
          indexAxis: direction,
          scales: {
            y: {
              beginAtZero: true, // Ensures the scale starts from zero
              grid: {
                color: "#D6D9D7", // Color of the grid lines
                borderColor: "#D6D9D7", // Color of the axis line
              },
              ticks: {
                color: "#D6D9D7", // Color of the axis labels
                callback: function (value) {
                  // Custom formatting of the axis labels
                  if(direction === "x") {
                    return value / 1000000 + " M";
                  }else{
                    return value + 1981;
                  }
                },
              },
              title: {
                display: true,
                text: yAxis,
              },
            },
            x: {
              grid: {
                display: false, // Hides the grid lines for this axis
              },
              ticks: {
                color: "#D6D9D7", // Color of the axis labels
              },
              title: {
                display: true,
                text: xAxis,
              },
            },
          },
          tooltips: {
            enabled: true, // Enable or disable tooltips
            mode: "index", // Show tooltips for all items in the dataset at the current index
            intersect: false, // Show tooltips even when not exactly hovering over an item
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Background color of tooltips
            titleFontColor: "#ffffff", // Color of the tooltip title
            bodyFontColor: "#ffffff", // Color of the tooltip body
            borderColor: "#ffffff", // Border color of the tooltip
            borderWidth: 1, // Border width of the tooltip
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
          maintainAspectRatio: false, // Add this to maintain the aspect ratio
          responsive: true,
          animation: {
            duration: 1000, // General animation time
            easing: "easeOutBounce", // Easing function to use
          },
          plugins: {
            filler: true,
            legend: {
              display: true, // Toggle display of the legend
              position: "top", // Position the legend on the top
              labels: {
                color: "#D6D9D7", // Color of the legend text
                font: {
                  size: 14, // Font size of the legend text
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
  }, [chartData, labels]);
  return (
    <div className="md:w-[550px] 0:w-[280px] 475:w-[425px] h-[550px] sm:[450px] md:h-[350px] flex flex-col flex-grow gap-4 bg-darkGray p-4 rounded-xl">
      <div className="flex justify-between">
        <p className="text-[1.25rem] font-medium">{Data.country}</p>
      </div>
      <div className="w-full h-full">
        <canvas className="" ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

Chart.propTypes = {
  Data: PropTypes.shape({
    country: PropTypes.string.isRequired,
    populationCounts: PropTypes.arrayOf(
      PropTypes.shape({
        year: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Chart;
