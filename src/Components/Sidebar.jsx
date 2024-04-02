import { GiHamburgerMenu } from "react-icons/gi";
import NavBarLinks from "./Extras/NavBarLinks";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../redux/populationSlice";
import { MdCurrencyBitcoin } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";



const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarToggle } = useSelector((state) => state.population);

  return (
    <div
      className={`w-[10rem] md:w-[23%] lg:w-[20%] bg-darkGray h-[100vh] fixed top-0 ${
        sidebarToggle ? "left-0" : "left-[-8rem] md:left-[-17%]"
      } z-[5] transition-all duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center py-4 px-2 md:p-4">
        <div className="w-[50%] h-[12]">
          <img
            className="w-full h-full"
            src="https://carboncell.io/assets/img/logo2.png"
            alt=""
          />
        </div>
        <GiHamburgerMenu
          className="md:text-[1.5rem] text-[1rem] text-white cursor-pointer"
          onClick={() => dispatch(setToggle())}
        />
      </div>
      <div className="h-[90%] flex flex-col p-4 gap-4 justify-between">
        <div className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Search"
            className="text-darkGray bg-lightGray py-2 px-4 rounded-lg"
          />
          <div className="flex flex-col gap-4">
            <NavBarLinks text={"Home"} link={"/"} component={<IoIosHome />} />
            <NavBarLinks
              text={"CryptoCurrencies"}
              link={"/crypto"}
              component={<MdCurrencyBitcoin />}
            />
            <NavBarLinks
              text={"Wallet"}
              link={"/wallet"}
              component={<IoWalletOutline />}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <NavBarLinks text={"Notifications"} link={"/"} component={<IoMdNotifications />} />
          <NavBarLinks text={"Support"} link={"/"} component={<MdContactSupport />} />
          <NavBarLinks text={"Settings"} link={"/"} component={<IoIosSettings />} />
          <div className="flex justify-between p-4 bg-lightGray rounded-lg text-white">
            <div>
              <p>Lokesh Kataria</p>
              <p className="font-extralight">lokesh@kataria.com</p>
            </div>
            <CiMenuKebab />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
