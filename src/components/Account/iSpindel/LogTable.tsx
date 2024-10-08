import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LogRow from "./LogRow";
function LogTable({
  logs,
  removeLog,
}: {
  logs: any[];
  removeLog: (id: string) => void;
}) {
  return (
    <div className="max-h-[500px] overflow-y-scroll border-2 border-input my-4 rounded-sm max-w-full">
      <Table className="max-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead> <TableHead>Date</TableHead>
            <TableHead>Gravity</TableHead>
            <TableHead>Calculated Gravity</TableHead>
            <TableHead>Temperature</TableHead>
            <TableHead>Interval</TableHead>
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
          {logs.map((log) => {
            return (
              <LogRow key={log.id} log={log} remove={() => removeLog(log.id)} />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default LogTable;
