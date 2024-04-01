import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCrypto } from "../redux/cryptoSlice";
import axios from "axios";
import CryptoCard from "./Extras/CryptoCard";
import { Oval } from "react-loader-spinner";

const Crypto = () => {
  const disptach = useDispatch();
  const { cryptoData } = useSelector((store) => store.crypto);
  const { sidebarToggle } = useSelector((state) => state.population);

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coinranking.com/v2/coins"
        );
        disptach(setCrypto(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    getCryptoData();
  }, []);

  return (
    <div
      className={`fixed top-0 text-white right-0 ${
        sidebarToggle ? "w-[80%]" : "w-[96%]"
      } h-[100%] overflow-y-auto p-8 bg-blackish transition-all duration-300 ease-in-out flex flex-col gap-12`}
    >
      <div className="text-white">
        <h1 className="text-[2rem] font-semibold">
          Hello, <span className="gradient-text">Lokesh Kataria</span>
        </h1>
        <p>Welcome to Crypto Price Analysis</p>
      </div>
      <div className="flex flex-wrap justify-around gap-2 gap-y-4">
        {Object.keys(cryptoData).length != 0 &&
        cryptoData.data.coins.length != 0 ? (
          cryptoData.data.coins.map((crypto, idx) => {
            return <CryptoCard key={idx + "cryptoData"} Data={crypto} />;
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

export default Crypto;
