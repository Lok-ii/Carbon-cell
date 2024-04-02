
import Population from "./Population";
import { useSelector } from "react-redux";

const Home = () => {
  const { sidebarToggle } = useSelector((state) => state.population);
  return (
    <div
      className={`flex flex-col h-[100%] fixed top-0 right-0 transition-all duration-300 ease-in-out  ${
        sidebarToggle ? "w-[80%]" : "md:w-[98%] w-[92%]"
      } overflow-y-scroll`}
    >
      <Population />
    </div>
  );
};

export default Home;
