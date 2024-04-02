import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCryptoLiked } from "../redux/cryptoSlice";
import axios from "axios";
import { IoTrendingDown } from "react-icons/io5";
import { IoTrendingUp } from "react-icons/io5";

const AlsoLike = () => {
  const dispatch = useDispatch();
  const { cryptoLiked } = useSelector((store) => store.crypto);

  useEffect(() => {
    const getLiked = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=CG-wmqpxHhewcBB9CQYF7kCY6Ji"
        );
        console.log(response.data.coins);
        dispatch(setCryptoLiked(response.data.coins));
      } catch (error) {
        console.log(error);
      }
    };
    getLiked();
  }, []);
  return (
    <div className="flex flex-col gap-8 px-2 md:px-8">
      <h1 className="text-2xl font-bold">You may also like</h1>
      <div className="w-full flex flex-wrap items-center justify-around gap-4">
        {cryptoLiked &&
          cryptoLiked.map((item) => {
            const value = item.item;
            const change = value.data.price_change_percentage_24h.usd;
            return (
              <div
                key={value.id}
                className="w-[20rem] bg-darkGray p-4 rounded-lg flex flex-col gap-4 flex-grow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="">
                      <img src={value.thumb} alt={value.name} />
                    </div>
                    <h1 className="">{value.symbol}</h1>
                  </div>
                  <div className="flex items-center justify-center bg-[#323332] p-2 rounded-lg font-semibold">
                    <p
                      className={`flex items-center gap-2 ${
                        change < 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {change < 0 ? <IoTrendingDown /> : <IoTrendingUp />}
                      {change.toFixed(2)} %
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <p className="text-lightGray">Market Cap</p>
                  <p className="text-xl font-medium">{value.data.market_cap}</p>
                  <div className="self-center py-4">
                    <img src={value.data.sparkline} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AlsoLike;
