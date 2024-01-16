import { NavLink, Link } from "react-router-dom";
import logo from "../assets/full-logo.png";
import logoOnly from "../assets/logoOnly.png";
function Navbar() {
  return (
    <div className="h-20 sticky top-0">
      <div className="w-screen h-full bg-sidebar flex justify-center items-center text-textColor text-xl">
        <Link
          className="bg-background w-[3rem] md:flex md:w-24 lg:w-52 h-full md:absolute md:left-0 border-[1px] border-sidebar hover:opacity-80 transition-all"
          to="/"
        >
          <span className="w-full h-full flex flex-col justify-center items-center">
            <img src={logo} alt="MeadTools logo" className="hidden lg:flex" />
            <img
              src={logoOnly}
              alt="MeadTools logo"
              className="lg:hidden w-[50%]"
            />
          </span>
        </Link>{" "}
        <nav className="flex items-center justify-center text-sm text-center">
          <NavLink
            className="hover:text-background transition-colors sm:mx-4 mx-1"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="hover:text-background transition-colors sm:mx-4 mx-1"
            to="/NuteCalc/"
          >
            Nutrient Calculator
          </NavLink>
          <div className="relative group flex flex-col">
            <NavLink
              className="hover:text-background transition-colors sm:mx-4 mx-1"
              to="/ExtraCalcs"
            >
              Extra Calculators
            </NavLink>
            <div className="absolute grid translate-y-[29%] md:translate-y-[25%] h-fit w-full bg-sidebar rounded-xl opacity-0 group-hover:opacity-100 transition-all text-[10px] md:text-[1rem] border-[1px]  border-s-textColor">
              <Link to="/ExtraCalcs/" className="hover:text-background ">
                ABV Calculator
              </Link>{" "}
              <Link
                to="/ExtraCalcs/brixCalc"
                className="hover:text-background "
              >
                Brix Conversion
              </Link>
              <Link to="/ExtraCalcs/estOG" className="hover:text-background ">
                Estimated OG
              </Link>
              <Link to="/ExtraCalcs/sulfite" className="hover:text-background ">
                Sulfite Addition
              </Link>
              <Link to="/ExtraCalcs/sorbate" className="hover:text-background ">
                Sorbate Addition
              </Link>
              <Link
                to="/ExtraCalcs/RefractometerCorrection"
                className="px-2 hover:text-background "
              >
                Refractometer Correction
              </Link>
              <Link
                to="/ExtraCalcs/tempCorrection"
                className="hover:text-background "
              >
                Temperature Correction
              </Link>
              <Link
                to="/ExtraCalcs/blending"
                className="hover:text-background pb-2"
              >
                Blending
              </Link>
            </div>
          </div>
          <NavLink
            className="hover:text-background transition-colors sm:mx-4 mx-1"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className="hover:text-background transition-colors sm:mx-4 mx-1"
            to="/contact"
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
export default Navbar;
