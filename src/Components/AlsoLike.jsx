import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCrypto, setCryptoLiked } from "../redux/cryptoSlice";
import axios from "axios";
import { IoTrendingDown } from "react-icons/io5";
import { IoTrendingUp } from "react-icons/io5";

const AlsoLike = () => {
  const baseUSDINR = 83.39;
  const baseUSDPound = 0.79;
  const baseUSDCNY = 7.23;
  const baseUSDJPN = 151.38;
  const dispatch = useDispatch();
  const { cryptoData } = useSelector((store) => store.crypto);

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coinranking.com/v2/coins"
        );
        dispatch(setCrypto(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    getCryptoData();
  }, []);
  return (
    <div className="flex flex-col gap-8 px-2 md:px-8">
      <h1 className="text-2xl font-bold">You may also like</h1>
      <div className="w-full flex flex-wrap items-center justify-around gap-4">
        {cryptoData &&
          cryptoData?.data?.coins?.map((Data, idx) => {
            const INR = Number(Data.price * baseUSDINR).toFixed(2);
            const Pound = Number(Data.price * baseUSDPound).toFixed(2);
            const CNY = Number(Data.price * baseUSDCNY).toFixed(2);
            const JPN = Number(Data.price * baseUSDJPN).toFixed(2);
            return (
              <div
                key={idx + "cryptoData"}
                className="w-[15rem] flex flex-col justify-around flex-grow gap-4 bg-darkGray p-4 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-[4rem] h-[4rem] p-3 rounded-[50%]"
                    style={{ border: `1px solid ${Data.color}` }}
                  >
                    <img src={Data.iconUrl} className="w-full h-full" alt="" />
                  </div>
                  <p className="font-bold text-xl">{Data.symbol}</p>
                </div>
                <p className="font-semibold text-lg">{Data.name}</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-2xl">
                    {Number(Data.price).toFixed(2)} $
                  </p>
                  <div className="flex items-center gap-2">
                    <p>{Data.change}</p>
                    {Data.change.substr(0, 1) === "-" ? (
                      <IoTrendingDown />
                    ) : (
                      <IoTrendingUp />
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full flex items-center justify-between">
                    <span>INR</span>
                    <span>{INR}</span>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <span>GBP</span>
                    <span>{Pound}</span>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <span>CNY</span>
                    <span>{CNY}</span>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <span>JPY</span>
                    <span>{JPN}</span>
                  </div>
                </div>
                <button
                  className={`py-2 px-4 rounded-lg font-semibold `}
                  style={{ backgroundColor: Data.color }}
                >
                  Details
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AlsoLike;
