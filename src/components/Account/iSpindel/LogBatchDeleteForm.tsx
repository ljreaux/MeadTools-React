import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";

import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { deleteLogsInRange } from "@/helpers/iSpindel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { format } from "date-fns";
import { de, enUS } from "date-fns/locale";

const FormSchema = z.object({
  start_date: z.date(),
  end_date: z.date(),
});
const DEFAULT_VALUE = {
  start_date: new Date(),
  end_date: new Date(),
};

const LogBatchDeleteForm = ({ deviceId }: { deviceId: string }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(FormSchema),
  });
  const { t, i18n } = useTranslation();
  const { token } = useiSpindelContext();

  async function onSubmit({
    start_date,
    end_date,
  }: z.infer<typeof FormSchema>) {
    console.log("In transaction");
    const deleted = await deleteLogsInRange(
      token,
      start_date,
      end_date,
      deviceId
    );

    if (deleted === "Logs deleted successfully.") {
      toast({ description: deleted });
    } else {
      toast({ variant: "destructive", description: deleted });
    }
    setOpen(false);
  }
  const locale = i18n.resolvedLanguage?.includes("de") ? de : enUS;

  const formattedDates = {
    start_date: format(form.getValues("start_date"), `PP h:mm b`, {
      locale,
    }),
    end_date: format(form.getValues("end_date"), `PP h:mm b`, {
      locale,
    }),
  };
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col row-span-2 row-start-1 mt-4 space-y-4 sm:col-start-2 sm:mt-0"
      >
        <h1>{t("iSpindelDashboard.logDeleteRange")}</h1>
        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-72">
              <FormLabel htmlFor="datetime">
                {t("iSpindelDashboard.brews.startDate")}
              </FormLabel>
              <FormControl>
                <DateTimePicker
                  value={field.value}
                  onChange={field.onChange}
                  hourCycle={12}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-72">
              <FormLabel htmlFor="datetime">
                {t("iSpindelDashboard.brews.endDate")}
              </FormLabel>
              <FormControl>
                <DateTimePicker
                  value={field.value}
                  onChange={field.onChange}
                  hourCycle={12}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger className="flex-1 w-full" asChild>
            <Button className="w-72" type="button">
              {t("SUBMIT")}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("desktop.confirm")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("deleteLogsDescription", formattedDates)}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel type="button">{t("cancel")}</AlertDialogCancel>
              <AlertDialogAction
                onClick={form.handleSubmit(onSubmit)}
                className={buttonVariants({ variant: "destructive" })}
              >
                {t("desktop.delete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
};
export default LogBatchDeleteForm;
