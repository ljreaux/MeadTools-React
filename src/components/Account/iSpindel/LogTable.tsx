import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LogRow from "./LogRow";
import { usePagination } from "@/hooks/usePagination";
import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
function LogTable({
  logs,
  removeLog,
}: {
  logs: any[];
  removeLog: (id: string) => void;
}) {
  const {
    handlePageClick,
    currentItems,
    pageCount,
    options,
    setNumberPerPage,
  } = usePagination(10, logs);
  const { t } = useTranslation();

  const headerKeys = [
    "date",
    "gravity",
    "iSpindelDashboard.calculatedGravity",
    "temperature",
    "iSpindelDashboard.angle",
    "iSpindelDashboard.batteryLevel",
    "desktop.editOrDelete",
  ];

  return (
    <div className="max-w-full my-4 border-2 rounded-sm border-input">
      <Table className="max-w-full ">
        <TableHeader>
          {options.length > 0 && (
            <TableRow>
              {headerKeys.map((key) => (
                <TableHead key={key}>{t(key)}</TableHead>
              ))}
            </TableRow>
          )}
          {options.length > 0 && (
            <TableRow>
              <TableCell colSpan={7}>
                <Label htmlFor="itemCount" className="flex flex-col gap-4">
                  {t("iSpindelDashboard.pagination")}
                  <Select
                    defaultValue={options[0].label}
                    onValueChange={(val) => {
                      setNumberPerPage(parseInt(val));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value.toString()}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Label>
              </TableCell>
            </TableRow>
          )}
        </TableHeader>
        <TableBody>
          {logs.length === 0 && (
            <TableRow>
              <TableCell colSpan={8}>{t("noLogs")}</TableCell>
            </TableRow>
          )}
          {currentItems.map((log) => {
            return (
              <LogRow key={log.id} log={log} remove={() => removeLog(log.id)} />
            );
          })}
          {pageCount > 1 && (
            <TableRow>
              <TableCell colSpan={5}>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={<FaAngleRight />}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel={<FaAngleLeft />}
                  renderOnZeroPageCount={null}
                  className="react-paginate"
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default LogTable;
