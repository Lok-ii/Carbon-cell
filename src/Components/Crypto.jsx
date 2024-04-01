import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCrypto } from "../redux/cryptoSlice";
import axios from "axios";
import CryptoCard from "./Extras/CryptoCard";

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
      <div className="flex flex-wrap justify-around gap-2 gap-y-4">
        {Object.keys(cryptoData).length != 0 &&
          cryptoData.data.coins.length != 0 &&
          cryptoData.data.coins.map((crypto, idx) => {
            return <CryptoCard key={idx + "cryptoData"} Data={crypto} />;
          })}
      </div>
    </div>
  );
};

export default Crypto;
