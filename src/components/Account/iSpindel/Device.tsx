import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Device() {
  const [showTable, setShowTable] = useState(false);

  const { deviceList, startBrew, endBrew, updateCoeff } = useiSpindelContext();
  const { deviceId } = useParams();
  const [device, setDevice] = useState<any>(null);

  const [coefficients, setCoefficients] = useState<string[]>([]);

  const updateCoefficients = (index: number, value: string) => {
    const newCoefficients = [...coefficients];

    newCoefficients[index] = value;
    setCoefficients(newCoefficients);
  };

  function validateCoefficients(arr: any[]) {
    if (arr.length < 4 || arr.includes(undefined)) return false;

    const found = arr.filter((item) => item === 0 || isNaN(Number(item)));

    return !found.length;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateCoefficients(coefficients);

    if (!isValid)
      return toast({
        description:
          "Please fill in all coefficients with valid number values.",
        variant: "destructive",
      });
    updateCoeff(
      device.id,
      coefficients.map((c) => Number(c))
    );
  };

  useEffect(() => {
    setDevice(deviceList.find((device) => device.id === deviceId));
  }, [deviceId, deviceList]);

  useEffect(() => {
    if (device?.coefficients?.length === 4)
      setCoefficients(device.coefficients);
  }, [device]);

  if (!device) return null;

  return (
    <div>
      <p>{device.device_name}</p>
      {!device.brew_id ? (
        <Button variant={"secondary"} onClick={() => startBrew(device.id)}>
          Start Brew
        </Button>
      ) : (
        <>
          <p>Brew ID: {device.brew_id}</p>
          <Button
            variant={"destructive"}
            onClick={() => endBrew(device.id, device.brew_id)}
          >
            End Brew
          </Button>
        </>
      )}
      {showTable ? (
        <form onSubmit={handleSubmit}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coefficient</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Input
                    value={coefficients[0]}
                    onChange={(e) => updateCoefficients(0, e.target.value)}
                  ></Input>
                </TableCell>
                <TableCell>
                  &#215; angle<sup>3</sup> +
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Input
                    value={coefficients[1]}
                    onChange={(e) => updateCoefficients(1, e.target.value)}
                  ></Input>
                </TableCell>
                <TableCell>
                  &#215; angle<sup>2</sup> +
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Input
                    value={coefficients[2]}
                    onChange={(e) => updateCoefficients(2, e.target.value)}
                  ></Input>
                </TableCell>
                <TableCell>&#215; angle +</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Input
                    value={coefficients[3]}
                    onChange={(e) => updateCoefficients(3, e.target.value)}
                  ></Input>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button type="submit">Submit</Button>
          <Button
            type="button"
            onClick={() => {
              if (device?.coefficients?.length === 4)
                setCoefficients(device.coefficients);
              setShowTable(false);
            }}
            variant={"destructive"}
          >
            Cancel
          </Button>
        </form>
      ) : (
        <Button onClick={() => setShowTable(true)}>Update Coefficients</Button>
      )}
    </div>
  );
}

export default Device;
