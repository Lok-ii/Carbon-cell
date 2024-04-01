import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setToggle } from "../../redux/populationSlice";

const NavBarLinks = ({ text, link, component }) => {
  const dispatch = useDispatch();
  
  return (
    <NavLink
      to={link}
      className={({ isActive, isPending }) =>
        isPending
          ? ""
          : isActive
          ? "text-brightGreen text-[0.5rem] md:text-[1rem] font-semibold flex items-center gap-2"
          : "text-[0.5rem] md:text-[1rem] text-white flex items-center gap-2"
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
