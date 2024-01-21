import { NavLink, Link } from "react-router-dom";
import logo from "../assets/full-logo.png";
import logoOnly from "../assets/logoOnly.png";
function Navbar() {
  return (
    <div className="h-20 sticky top-0 z-[51]">
      <div className="w-screen h-full bg-sidebar flex justify-space-between items-center text-textColor text-xl text-center relative">
        <Link
          className="bg-background w-[3rem] md:flex md:w-24 lg:w-52 h-full left-0 border-[1px] border-sidebar hover:opacity-80 transition-all"
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
        <nav className="flex items-center justify-center sm:text-[1rem] text-[.6rem] my-0 mx-auto">
          <NavLink
            className="hover:text-background transition-colors sm:mx-4 mx-[.125rem]"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="hover:text-background transition-colors sm:mx-4 mx-[.125rem] leading-[.9rem]"
            to="/NuteCalc/"
          >
            Nutrient Calculator
          </NavLink>
          <div className="extra_calc">
            <NavLink
              className="hover:text-background transition-colors sm:mx-4 mx-[.125rem]"
              to="/ExtraCalcs"
            >
              Extra Calculators
            </NavLink>
            <div className="extra_links">
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
                className="hover:text-background "
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
            className="hover:text-background transition-colors sm:mx-4 mx-[.125rem]"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className="hover:text-background transition-colors sm:mx-4 mx-[.125rem]"
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
