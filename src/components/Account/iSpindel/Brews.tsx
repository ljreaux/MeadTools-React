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
import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { usePagination } from "@/hooks/usePagination";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
function Brews() {
  const { brews } = useiSpindelContext();
  const { t } = useTranslation();

  const {
    currentItems,
    handlePageClick,
    pageCount,
    options,
    setNumberPerPage,
  } = usePagination(5, brews);

  return (
    <>
      {brews.length > 0 ? (
        <>
          {" "}
          <h2 className="my-4 text-2xl">
            {t("iSpindelDashboard.brews.label")}
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("iSpindelDashboard.nameOrId")}</TableHead>
                <TableHead>{t("iSpindelDashboard.brews.startDate")}</TableHead>
                <TableHead>{t("iSpindelDashboard.brews.endDate")}</TableHead>
                <TableHead>{t("iSpindelDashboard.brews.latestGrav")}</TableHead>
                <TableHead>{t("iSpindelDashboard.brews.recipeLink")}</TableHead>
              </TableRow>
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
              <BrewRow currentItems={currentItems} />
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
        </>
      ) : (
        <p>No brews yet.</p>
      )}
    </>
  );
}

export default Brews;

const BrewRow = ({ currentItems }: { currentItems: any[] }) => {
  const { i18n, t } = useTranslation();
  const formatter = new Intl.DateTimeFormat(i18n.resolvedLanguage, {
    dateStyle: "short",
    timeStyle: "short",
  });
  const formatDate = (date: Date) => formatter.format(new Date(date));

  return (
    <>
      {currentItems &&
        currentItems.map((brew) => (
          <TableRow key={brew.id}>
            <TableCell className="truncate max-w-24 text-[rgb(200_215_255)]">
              <Link to={`/account/ispindel/logs/${brew.id}`}>
                {brew.name || brew.id}
              </Link>
            </TableCell>
            <TableCell>{formatDate(brew.start_date)}</TableCell>
            <TableCell>
              {brew.end_date ? formatDate(brew.end_date) : "Ongoing"}
            </TableCell>
            <TableCell>{brew.latest_gravity?.toFixed(3) || "NA"}</TableCell>
            <TableCell>
              {brew.recipe_id ? (
                <Link
                  to={`/recipes/${brew.recipe_id}`}
                  className={buttonVariants({ variant: "default" })}
                >
                  {t("iSpindelDashboard.brews.open")}
                </Link>
              ) : (
                <Link
                  to={`/account/ispindel/link/${brew.id}`}
                  className={buttonVariants({ variant: "default" })}
                >
                  {t("iSpindelDashboard.brews.link")}
                </Link>
              )}
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};
