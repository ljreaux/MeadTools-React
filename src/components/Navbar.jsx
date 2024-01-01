import { NavLink, Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logo from "../assets/ljreaux-01.png";
function Navbar() {
  return (
    <div className="h-20 sticky top-0">
      <div className="w-screen h-full bg-sidebar flex justify-center items-center text-textColor text-xl">
        <Link
          className="bg-background hidden md:flex md:w-32 lg:w-52 h-full md:absolute md:left-0 border-b-[1px] border-b-sidebar hover:opacity-80 transition-all"
          to="/"
        >
          <span className="w-full h-full flex flex-col justify-center items-center">
            <img src={logo} alt="MeadTools logo" />
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
          <div className="flex flex-col group">
            <NavLink
              className="hover:text-background transition-colors sm:mx-4 mx-1 translate-y-44"
              to="/ExtraCalcs"
            >
              Extra Calculators
            </NavLink>
            <div className="mt-48 h-fit w-full bg-sidebar grid rounded-xl opacity-0 group-hover:opacity-100 transition-all">
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
                className="hover:text-background "
              >
                Blending
              </Link>
            </div>
          </div>
          <NavLink
            className="hover:text-background transition-colors sm:mx-4 mx-1 pr-12"
            to="/about"
          >
            About
          </NavLink>
          <span className="lg:text-3xl medium:text-xl absolute right-2">
            <div className="flex">
              <a
                className="mx-0.5 hover:text-background hover:scale-105 transition-all"
                href="https://github.com/ljreaux/MeadTools-React/tree/main"
                target="to_blank"
              >
                <FaGithub />
              </a>
              <a
                href=""
                className="hover:text-background hover:scale-105 transition-all"
              >
                <MdEmail />
              </a>
            </div>
          </span>
        </nav>
      </div>
    </div>
  );
}
export default Navbar;
