import { GiHamburgerMenu } from "react-icons/gi";
import NavBarLinks from "./Extras/NavBarLinks";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../redux/populationSlice";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdCurrencyBitcoin } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";

const Sidebar = () => {

  const dispatch = useDispatch();
  const { sidebarToggle } = useSelector((state) => state.population);

  return (
    <div className={`w-[10rem] md:w-[20%] bg-darkGray h-[100vh] fixed top-0 ${sidebarToggle ? "left-0" : "left-[-8rem] md:left-[-16%]"} z-[5] transition-all duration-300 ease-in-out`}>
      <div className="flex justify-between items-center py-4 px-2 md:p-4">
        <div className="w-[50%] h-[12]">
          <img className="w-full h-full" src="https://carboncell.io/assets/img/logo2.png" alt="" />
        </div> 
        <GiHamburgerMenu className="md:text-[2rem] text-[1rem] text-white cursor-pointer" onClick={() => dispatch(setToggle())} />
      </div>
      <div className="flex flex-col p-4 gap-4">
        <NavBarLinks text={"Pouplation Chart"} link={"/"} component={<FaPeopleGroup />} />
        <NavBarLinks text={"Crypto Currency Data"} link={"/crypto"} component={<MdCurrencyBitcoin />} />
        <NavBarLinks text={"Wallet"} link={"/wallet"} component={<IoWalletOutline />} />
      </div>
    </div>
  );
};

export default Sidebar;
