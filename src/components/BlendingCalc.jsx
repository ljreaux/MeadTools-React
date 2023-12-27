import Title from "./Title";
import BlendingInputLine from "./BlendingInputLine";
import { useState } from "react";
function BlendingCalc() {
  function blend(val1, vol1, val2, vol2) {
    return (val1 * vol1 + val2 * vol2) / (vol1 + vol2);
  }
  const [val, setVal] = useState([
    {
      val1: 1,
      vol1: 1,
      val2: 2,
      vol2: 2,
    },
  ]);
  const valObj = val[0];
  const val1Change = (e) => {
    setVal([
      {
        val1: e.target.value,
        vol1: valObj.vol1,
        val2: valObj.val2,
        vol2: valObj.vol2,
      },
    ]);
  };
  const vol1Change = (e) => {
    setVal([
      {
        val1: valObj.val1,
        vol1: e.target.value,
        val2: valObj.val2,
        vol2: valObj.vol2,
      },
    ]);
  };
  const val2Change = (e) => {
    setVal([
      {
        val2: e.target.value,
        vol2: valObj.vol2,
        val1: valObj.val1,
        vol1: valObj.vol1,
      },
    ]);
  };
  const vol2Change = (e) => {
    setVal([
      {
        val2: valObj.val2,
        vol2: e.target.value,
        val1: valObj.val1,
        vol1: valObj.vol1,
      },
    ]);
  };
  return (
    <>
      <Title header="Blending Calculator" />
      <BlendingInputLine
        number={1}
        valChange={val1Change}
        volChange={vol1Change}
      />
      <br />
      <BlendingInputLine
        number={2}
        valChange={val2Change}
        volChange={vol2Change}
      />
      <p>
        Blended Value:{" "}
        {blend(valObj.val1, valObj.vol1, valObj.val2, valObj.vol2).toFixed(4)}
      </p>
      <p>Total Volume: {Number(valObj.vol1) + Number(valObj.vol2)}</p>
    </>
  );
}
export default BlendingCalc;
