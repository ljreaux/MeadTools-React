import { SetStateAction, Dispatch } from "react";
import Title from "../Title";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";

export default function AdvancedInputForm({
  yanFromSource,
  setYanFromSource,
  yanContribution,
  setYanContribution,
}: {
  advanced: boolean;
  yanFromSource: null | number[];
  setYanFromSource: Dispatch<SetStateAction<null | number[]>>;
  yanContribution: number[];
  setYanContribution: Dispatch<SetStateAction<number[]>>;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center w-11/12 p-8 my-8 sm:w-9/12 rounded-xl bg-background ">
      <Title header={t("advancedNutrition.label")} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={3} className="text-center ">
              {t("advancedNutrition.yanContribution")}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className="mt-6 text-center">
              <span className="flex flex-col gap-2">
                {t("nutrients.fermO")}
                <Input
                  type="number"
                  value={yanContribution[0]}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) =>
                    setYanContribution((prev) => {
                      return prev.map((item, i) => {
                        return i === 0 ? Number(e.target.value) : item;
                      });
                    })
                  }
                />
              </span>
            </TableCell>
            <TableCell className="mt-6 text-center ">
              <span className="flex flex-col gap-2">
                {t("nutrients.fermK")}
                <Input
                  type="number"
                  value={yanContribution[1]}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) =>
                    setYanContribution((prev) => {
                      return prev.map((item, i) => {
                        return i === 1 ? Number(e.target.value) : item;
                      });
                    })
                  }
                />
              </span>
            </TableCell>
            <TableCell className="mt-6 text-center ">
              <span className="flex flex-col gap-2">
                {t("nutrients.dap")}
                <Input
                  type="number"
                  value={yanContribution[2]}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) =>
                    setYanContribution((prev) => {
                      return prev.map((item, i) => {
                        return i === 2 ? Number(e.target.value) : item;
                      });
                    })
                  }
                />
              </span>
            </TableCell>
          </TableRow>
        </TableBody>

        <TableHeader>
          <TableRow className="text-center">
            <TableHead colSpan={3} className="text-center ">
              {t("advancedNutrition.yanFromSource")}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody id="yanFromSource">
          <TableRow>
            <TableCell className="mt-6 text-center ">
              <span className="flex flex-col gap-2">
                {t("nutrients.fermO")}
                <Input
                  type="number"
                  value={yanFromSource ? yanFromSource[0] : 0}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
                    setYanFromSource((prev: null | number[]) => {
                      if (prev) {
                        return prev.map((item, i) => {
                          return i === 0 ? Number(e.target.value) : item;
                        });
                      } else return null;
                    });
                  }}
                />
              </span>
            </TableCell>
            <TableCell className="mt-6 text-center ">
              <span className="flex flex-col gap-2">
                {t("nutrients.fermK")}
                <Input
                  type="number"
                  value={yanFromSource ? yanFromSource[1] : 0}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
                    setYanFromSource((prev: null | number[]) => {
                      if (prev) {
                        return prev.map((item, i) => {
                          return i === 1 ? Number(e.target.value) : item;
                        });
                      } else return null;
                    });
                  }}
                />
              </span>
            </TableCell>
            <TableCell className="mt-6 text-center ">
              <span className="flex flex-col gap-2">
                {t("nutrients.dap")}
                <Input
                  type="number"
                  value={yanFromSource ? yanFromSource[2] : 0}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
                    setYanFromSource((prev: null | number[]) => {
                      if (prev) {
                        return prev.map((item, i) => {
                          return i === 2 ? Number(e.target.value) : item;
                        });
                      } else return null;
                    });
                  }}
                />
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
