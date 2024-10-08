import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Brews() {
  const { brews } = useiSpindelContext();
  const { i18n } = useTranslation();
  const formatter = new Intl.DateTimeFormat(i18n.resolvedLanguage, {
    dateStyle: "short",
    timeStyle: "short",
  });
  const formatDate = (date: Date) => formatter.format(new Date(date));

  if (!brews.length) return null;

  return (
    <>
      <h2 className="my-4 text-2xl">Brews</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Latest Gravity</TableHead>
            <TableHead>Recipe Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brews.map((brew) => (
            <TableRow key={brew.id}>
              <TableCell className="truncate max-w-24 text-[rgb(200_215_255)]">
                <Link to={`/account/ispindel/logs/${brew.id}`}>{brew.id}</Link>
              </TableCell>
              <TableCell>{formatDate(brew.start_date)}</TableCell>
              <TableCell>
                {brew.end_date ? formatDate(brew.end_date) : "Ongoing"}
              </TableCell>
              <TableCell>{brew.latest_gravity?.toFixed(3)}</TableCell>
              <TableCell>
                {brew.recipe_id ? (
                  <Link
                    to={`/recipes/${brew.recipe_id}`}
                    className={buttonVariants({ variant: "default" })}
                  >
                    Open Recipe
                  </Link>
                ) : (
                  <Link
                    to={`/account/ispindel/link/${brew.id}`}
                    className={buttonVariants({ variant: "default" })}
                  >
                    Link Recipe
                  </Link>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Brews;
