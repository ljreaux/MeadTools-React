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
function LogTable({
  logs,
  removeLog,
}: {
  logs: any[];
  removeLog: (id: string) => void;
}) {
  const { handlePageClick, currentItems, pageCount } = usePagination(10, logs);
  return (
    <div className="max-h-[500px] overflow-y-scroll border-2 border-input my-4 rounded-sm max-w-full">
      <Table className="max-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Gravity</TableHead>
            <TableHead>Calculated Gravity</TableHead>
            <TableHead>Temperature</TableHead>
            <TableHead>Angle</TableHead>
            <TableHead>Battery</TableHead>
            <TableHead>Edit/Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No logs to display for this date range
              </TableCell>
            </TableRow>
          )}
          {currentItems.map((log) => {
            return (
              <LogRow key={log.id} log={log} remove={() => removeLog(log.id)} />
            );
          })}
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
        </TableBody>
      </Table>
    </div>
  );
}

export default LogTable;
