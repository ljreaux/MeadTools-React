import Title from "../Title";
import BlendingInputLine from "./BlendingInputLine";
import { useState } from "react";

function BlendingCalc() {
  function blend(obj) {
    const {val1, vol1, val2, vol2} = obj
    const input1 = val1*vol1
    const input2 = val2*vol2
    const totalVol = vol1+vol2
    return (input1+input2) / (totalVol);
  }

  const [valObj, setValObj] = useState(
    {
      val1: 1,
      vol1: 1,
      val2: 2,
      vol2: 2,
    },
  );

  const val1Change = (e) => {
    setValObj(
      {
        ...valObj,
        val1: e.target.value,
      },
    );
  };
  const vol1Change = (e) => {
     setValObj(
      {
        ...valObj,
        vol1: e.target.value,
      },
    );
  };

  const val2Change = (e) => {
   setValObj(
      {
        ...valObj,
        val2: e.target.value,
      },
    );
  };
  const vol2Change = (e) => {
    setValObj(
      {
        ...valObj,
        vol2: e.target.value,
      },
    );
  };

  return (
    <div className="component-div">
      <Title header="Blending Calculator" />
      <BlendingInputLine
        valObj={valObj}
        valChange={val1Change}
        volChange={vol1Change}
      />
      <br />
      <BlendingInputLine
        valObj={valObj}
        valChange={val2Change}
        volChange={vol2Change}
      />
      <p className="pt-4">
        Blended Value:{" "}
        {blend(valObj).toFixed(4)}
      </p>
      <p className="pb-4">
        Total Volume: {Number(valObj.vol1) + Number(valObj.vol2)}
      </p>
    </div>
  );
}

export default BlendingCalc;
