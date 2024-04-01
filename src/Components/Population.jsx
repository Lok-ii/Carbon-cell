import axios from "axios";
import { useEffect } from "react";
import { setPopulation } from "../redux/populationSlice";
import { useDispatch, useSelector } from "react-redux";
import Chart from "./Extras/Chart";
import { Oval } from "react-loader-spinner";

const Population = () => {
  const dispatch = useDispatch();
  const { sidebarToggle, populationData } = useSelector(
    (state) => state.population
  );

  useEffect(() => {
    const countries = ["india", "north america", "italy", "japan"];
    let populationArray = [];
    const getPouplationData = async (country) => {
      try {
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/population",
          { country: country }
        );
        populationArray = [...populationArray, response.data];
        dispatch(setPopulation(populationArray));
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    countries.forEach(async (country) => await getPouplationData(country));
  }, [dispatch]);

  return (
    <div
      className={`fixed top-0 text-white right-0 ${ 
        sidebarToggle ? "w-[80%]" : "md:w-[96%] w-[92%]"
      } h-[100%] overflow-y-auto p-8 bg-blackish transition-all duration-300 ease-in-out flex flex-col gap-12`}
    >
      <div className="text-white">
        <h1 className="text-[2rem] font-semibold">
          Hello, <span className="gradient-text">Lokesh Kataria</span>
        </h1>
        <p>Welcome to Population Growth Rate Analysis!</p>
      </div>
      <div className="flex flex-wrap justify-around gap-8">
        {populationData.length >= 4 ? (
          populationData.map((population, idx) => {
            return <Chart key={idx + "chartData"} Data={population.data} />;
          })
        ) : (
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
      </div>
    </div>
  );
};

export default Population;
