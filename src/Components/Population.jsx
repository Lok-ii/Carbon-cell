import axios from "axios";
import { useEffect, useCallback } from "react";
import { setPopulation } from "../redux/populationSlice";
import { useDispatch, useSelector } from "react-redux";
import Chart from "./Extras/Chart";
import { Oval } from "react-loader-spinner";
import { setBitCoinData } from "../redux/cryptoSlice";
import Bitcoin from "./Extras/Bitcoin";
import AlsoLike from "./AlsoLike";
import {
  setError,
  setHasProvider,
  setIsConnecting,
  setWallet,
} from "../redux/walletSlice";
import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance, formatAddress } from "../utils/index";

const Population = () => {
  const dispatch = useDispatch();
  const { populationData, chartData, labels } = useSelector(
    (state) => state.population
  );
  const { bitCoinData } = useSelector((store) => store.crypto);
  const { wallet, hasProvider, isConnecting } = useSelector(
    (store) => store.wallet
  );

  useEffect(() => {
    const getPouplationData = async () => {
      try {
        const response = await axios.get(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        );
        dispatch(setPopulation(response.data));
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPouplationData();

    const getCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        console.log(response.data);
        dispatch(
          setBitCoinData([
            { ...response.data.bpi.USD, color: "#1A9354" },
            { ...response.data.bpi.GBP, color: "#9FFE9C" },
            { ...response.data.bpi.EUR, color: "#77F435" },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };

    getCryptoData();
  }, [dispatch]);

  const _updateWallet = useCallback(async (providedAccounts) => {
    const accounts =
      providedAccounts ||
      (await window.ethereum.request({ method: "eth_accounts" }));

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      dispatch(setWallet({ type: "empty" }));
      return;
    }

    const balance = formatBalance(
      await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
    );
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    dispatch(setWallet({ accounts, balance, chainId }));
  }, []);

  const updateWalletAndAccounts = useCallback(
    () => _updateWallet(),
    [_updateWallet]
  );
  const updateWallet = useCallback(
    (accounts) => _updateWallet(accounts),
    [_updateWallet]
  );

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      dispatch(setHasProvider(Boolean(provider)));

      if (provider) {
        updateWalletAndAccounts();
        window.ethereum.on("accountsChanged", updateWallet);
        window.ethereum.on("chainChanged", updateWalletAndAccounts);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", updateWallet);
      window.ethereum?.removeListener("chainChanged", updateWalletAndAccounts);
    };
  }, [updateWallet, updateWalletAndAccounts]);

  const connectMetaMask = async () => {
    setIsConnecting(true);

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      dispatch(setError(""));
      console.log("connected");
      updateWallet(accounts);
    } catch (err) {
      console.log("couldn't connected");
      dispatch(setError(err.message));
    }
    dispatch(setIsConnecting(false));
  };

  return (
    <div
      className={` text-white p-8 bg-blackish transition-all duration-300 ease-in-out flex flex-col gap-12`}
    >
      <div className="text-white flex w-full justify-between items-center">
        <div>
          <h1 className="text-[2rem] font-semibold">
            Hello, <span className="gradient-text">Lokesh Kataria</span>
          </h1>
          <p>Welcome to Population Growth Rate Analysis!</p>
        </div>
        <div className="">
          {!hasProvider && (
            <a
              href="https://metamask.io"
              target="_blank"
              className="py-2 px-8 text-[#77ECF0] bg-darkGray rounded-lg"
            >
              Install MetaMask
            </a>
          )}
          {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
            <button
              disabled={isConnecting}
              onClick={connectMetaMask}
              className="py-2 px-8 text-[#77ECF0] bg-darkGray rounded-lg"
            >
              Connect MetaMask
            </button>
          )}
          {hasProvider && wallet.accounts.length > 0 && (
            <a
              className="text_link tooltip-bottom border-[1px] rounded-lg p-4"
              href={`https://etherscan.io/address/${wallet.accounts[0]}`}
              target="_blank"
              data-tooltip="Open in Block Explorer"
            >
              {formatAddress(wallet.accounts[0])}
            </a>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 flex-wrap justify-around w-full">
        {populationData ? (
          <>
            <Chart
              chartData={chartData}
              labels={labels}
              text={"Population Line Chart"}
              type={"line"}
              w={"60"}
            />
            <Chart
              chartData={chartData}
              labels={labels}
              text={"Population Bar Chart"}
              type={"doughnut"}
              w={"40"}
            />
          </>
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
      <div
        id="bitcoin"
        className={`text-white px-8 bg-blackish transition-all duration-300 ease-in-out flex flex-col gap-12`}
      >
        <p className="text-brightGreen text-[1.5rem] font-semibold">
          Bitcoin Prices
        </p>
        <div className="flex flex-wrap gap-8 gap-y-4">
          {bitCoinData ? (
            bitCoinData.map((crypto, idx) => {
              return <Bitcoin key={idx + "cryptoData"} item={crypto} />;
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
      <AlsoLike />
      
    </div>
  );
};

export default Population;
