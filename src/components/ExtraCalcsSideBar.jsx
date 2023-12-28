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
  true;
  return (
    <div className=" fixed left-2 right-0 top-2/4 -translate-y-2/4 bg-sidebar border-s-textColor border-2 h-fit w-12 rounded-full text-4xl">
      <nav className="flex flex-col space-y-2 my-2">
        <Logos link="/" logo={<TbBeer />} calc="ABV" />

        <Logos link="/brixCalc" logo={<FaPercent />} calc="Brix Conversion" />
        <Logos
          link="/estOG"
          logo={<FaBalanceScaleLeft />}
          calc="Estimated OG Without Reading"
        />
        <Logos link="/sulfite" logo={<SiOxygen />} calc="Sulfite Addition " />
        <Logos link="/sorbate" logo={<GiPowder />} calc="Sorbate Addition " />
        <Logos
          link="/RefractometerCorrection"
          logo={<PiRainbow />}
          calc="Refractometer Correction"
        />
        <Logos
          link="/tempCorrection"
          logo={<TiThermometer />}
          calc="Hydrometer Temperature Correction"
        />
        <Logos link="/blending" logo={<RxBlendingMode />} calc="Blending" />
      </nav>
    </div>
  );
}
export default ExtraCalcsSideBar;
