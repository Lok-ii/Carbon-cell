import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCrypto, setCryptoLiked } from "../redux/cryptoSlice";
import axios from "axios";
import CryptoCard from "./Extras/CryptoCard";
import { Oval } from "react-loader-spinner";

const Crypto = () => {
  const dispatch = useDispatch();
  const { cryptoLiked} = useSelector((store) => store.crypto);
  const { sidebarToggle } = useSelector((state) => state.population);

  useEffect(() => {const getLiked = async () => {
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
        {Object.keys(cryptoLiked).length != 0 &&
        cryptoLiked.length != 0 ? (
          cryptoLiked.map((crypto, idx) => {
            return <CryptoCard key={idx + "cryptoLiked"} item={crypto} />;
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
