// react icons
import { TbBeer } from "react-icons/tb";
import { FaPercent } from "react-icons/fa";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { SiOxygen } from "react-icons/si";
import { GiPowder } from "react-icons/gi";
import { PiRainbow } from "react-icons/pi";
import { TiThermometer } from "react-icons/ti";
import { RxBlendingMode } from "react-icons/rx";

// Logos component
import Logos from "./Logos";

function ExtraCalcsSideBar() {
  return (
    <div
      className="fixed max-h-max sm:w-12 w-fit sm:left-2 sm:right-0 sm:top-2/4 bottom-0 sm:-translate-y-2/4 
    text-4xl bg-sidebar border-2 border-s-textColor rounded-full"
    >
      <nav className="flex  sm:flex-col text-center space-y-2 mx-1">
        <Logos link="/ExtraCalcs/" logo={<TbBeer />} calc="ABV" id="abvCalc" />
        <Logos
          link="/ExtraCalcs/brixCalc"
          logo={<FaPercent />}
          calc="Brix Conversion"
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
