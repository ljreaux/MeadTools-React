import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
import LogBatchDeleteForm from "./LogBatchDeleteForm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useState } from "react";
function LogTable({
  logs,
  removeLog,
  deviceId,
}: {
  logs: any[];
  removeLog: (id: string) => void;
  deviceId: string;
}) {
  const {
    handlePageClick,
    currentItems,
    pageCount,
    options,
    setNumberPerPage,
  } = usePagination(5, logs);
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

  const [isOpen, setIsOpen] = useState(false);

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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <div className="flex items-center justify-center">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <h3>{t("iSpindelDashboard.logDeleteRange")}</h3>
                      <CaretSortIcon className="w-4 h-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="max-w-full">
                  <LogBatchDeleteForm deviceId={deviceId} />
                </CollapsibleContent>
              </Collapsible>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default LogTable;
