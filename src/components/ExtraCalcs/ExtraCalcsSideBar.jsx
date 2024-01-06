import { TbBeer } from "react-icons/tb";
import { FaPercent } from "react-icons/fa";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { SiOxygen } from "react-icons/si";
import { GiPowder } from "react-icons/gi";
import { PiRainbow } from "react-icons/pi";
import { TiThermometer } from "react-icons/ti";
import { RxBlendingMode } from "react-icons/rx";
import Logos from "./Logos";

function ExtraCalcsSideBar() {
  return (
    <div className="fixed sm:left-2 sm:right-0 sm:top-2/4 sm:-translate-y-2/4 bg-sidebar border-s-textColor border-2 sm:h-fit sm:w-12 rounded-full text-4xl w-fit bottom-0">
      <nav className="flex sm:flex-col space-y-2 mx-1 justify-center text-center">
        <Logos link="/ExtraCalcs/" logo={<TbBeer />} calc="ABV" />

        <Logos
          link="/ExtraCalcs/brixCalc"
          logo={<FaPercent />}
          calc="Brix Conversion"
          id="abvCalc"
        />
        <Logos
          link="/ExtraCalcs/estOG"
          logo={<FaBalanceScaleLeft />}
          calc="Estimated OG Without Reading"
        />
        <Logos
          link="/ExtraCalcs/sulfite"
          logo={<SiOxygen />}
          calc="Sulfite Addition "
        />
        <Logos
          link="/ExtraCalcs/sorbate"
          logo={<GiPowder />}
          calc="Sorbate Addition "
        />
        <Logos
          link="/ExtraCalcs/RefractometerCorrection"
          logo={<PiRainbow />}
          calc="Refractometer Correction"
        />
        <Logos
          link="/ExtraCalcs/tempCorrection"
          logo={<TiThermometer />}
          calc="Hydrometer Temperature Correction"
        />
        <Logos
          link="/ExtraCalcs/blending"
          logo={<RxBlendingMode />}
          calc="Blending"
        />
      </nav>
    </div>
  );
}
export default ExtraCalcsSideBar;
