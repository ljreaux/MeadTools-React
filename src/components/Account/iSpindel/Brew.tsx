import { getBrew } from "@/helpers/iSpindel";
import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Brew() {
  const { token } = useiSpindelContext();
  const { brewId } = useParams();
  const [brew, setBrew] = useState<any>(null);
  useEffect(() => {
    if (brewId) {
      (async () => {
        const brew = await getBrew(token, brewId);
        setBrew(brew);
      })();
    }
  }, []);

  return <div>{brewId}</div>;
}

export default Brew;
