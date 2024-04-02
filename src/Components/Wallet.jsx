import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setHasProvider,
  setIsConnecting,
  setWallet,
} from "../redux/walletSlice";
import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance, formatChainAsNum, formatAddress } from "../utils/index";

const Wallet = () => {
  const dispatch = useDispatch();
  const { sidebarToggle } = useSelector((store) => store.population);
  const { wallet, hasProvider, isConnecting, errorMessage } = useSelector(
    (store) => store.wallet
  );

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
  console.log(wallet);

  return (
    <div
      className={`fixed top-0 right-0 transition-all duration-300 ease-in-out  ${
        sidebarToggle ? "w-[80%]" : "md:w-[96%] w-[92%]"
      } overflow-y-scroll text-white bg-blackish transition-all duration-300 ease-in-out flex flex-col items-center gap-12`}
    >
      <div className="w-full flex flex-wrap gap-y-8 items-center justify-between bg-[#1D1F23] p-8">
        <h1 className="wallet-name font-bold text-[1rem] md:text-[2rem]">
          Wallet &#40;by MetaMask&#41;
        </h1>
        <div className="">
          {!hasProvider && (
            <a
              href="https://metamask.io"
              target="_blank"
              className="py-2 px-8 text-[#77ECF0] bg-blackish rounded-lg"
            >
              Install MetaMask
            </a>
          )}
          {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
            <button
              disabled={isConnecting}
              onClick={connectMetaMask}
              className="py-2 px-8 text-[#77ECF0] bg-blackish rounded-lg"
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
      <div className="w-[15rem] md:w-[35rem] flex flex-col justify-around gap-4 bg-darkGray p-4 rounded-xl m-4">
        <div
          className="w-[4rem] h-[4rem] p-3 rounded-[50%]"
          style={{ border: `1px solid white` }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
            className="w-full h-full"
            alt=""
          />
        </div>
        {wallet.accounts.length > 0 && (
          <div className="w-full flex flex-col items-center gap-4">
            <div className="w-full flex items-center justify-between flex-wrap  border-brightGreen border-b-[1px] py-2 overflow-hidden">
              <span className="text-brightGreen font-semibold text-lg w-[50%]">
                Wallet Accounts:{" "}
              </span>{" "}
              <span className="w-[50% ]">{wallet.accounts[0]}</span>
            </div>
            <div className="w-full flex items-center justify-between flex-wrap border-brightGreen border-b-[1px] py-2">
              <span className="text-brightGreen font-semibold text-lg">
                Wallet Balance:{" "}
              </span>{" "}
              <span className="">{wallet.balance}</span>
            </div>
            <div className="w-full flex items-center justify-between flex-wrap border-brightGreen border-b-[1px] py-2">
              <span className="text-brightGreen font-semibold text-lg">
                Hex ChainId:{" "}
              </span>{" "}
              <span className="">{wallet.chainId}</span>
            </div>
            <div className="w-full flex items-center justify-between flex-wrap border-brightGreen border-b-[1px] py-2">
              <span className="text-brightGreen font-semibold text-lg">
                Numeric ChainId:{" "}
              </span>{" "}
              <span className="">{formatChainAsNum(wallet.chainId)}</span>
            </div>
          </div>
        )}
        <div className={`py-2 px-4 rounded-lg font-semibold `} style={{}}>
          {errorMessage !== "" ? (
            <div onClick={() => dispatch(setError(""))}>
              <strong>Error:</strong> {errorMessage}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
