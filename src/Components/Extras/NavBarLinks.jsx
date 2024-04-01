import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../../redux/populationSlice";

const NavBarLinks = ({ text, link, component }) => {
  const dispatch = useDispatch();
  const { sidebarToggle } = useSelector(store => store.population)
  
  return (
    <NavLink
      to={link}
      className={({ isActive, isPending }) =>
        isPending
          ? ""
          : isActive
          ? `text-brightGreen text-[0.5rem] sm:text-[0.7rem] md:text-[1rem] font-semibold items-center gap-2 ${sidebarToggle ? "flex" : "hidden"}`
          : `text-[0.5rem] md:text-[1rem] sm:[0.7rem] text-white flex items-center gap-2 ${sidebarToggle ? "flex" : "hidden"}`
      }
      onClick={() => dispatch(setToggle(false))}
    >
      {component} {text}
    </NavLink>
  );
};

NavBarLinks.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
};

export default NavBarLinks;
