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
import { Button } from "@/components/ui/button";

import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { deleteLogsInRange } from "@/helpers/iSpindel";

const FormSchema = z.object({
  start_date: z.date(),
  end_date: z.date(),
});
const DEFAULT_VALUE = {
  start_date: new Date(),
  end_date: new Date(),
};

const LogBatchDeleteForm = ({ deviceId }: { deviceId: string }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(FormSchema),
  });
  const { t } = useTranslation();
  const { token } = useiSpindelContext();

  async function onSubmit({
    start_date,
    end_date,
  }: z.infer<typeof FormSchema>) {
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
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
                <DateTimePicker value={field.value} onChange={field.onChange} />
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
                <DateTimePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-72">
          {t("SUBMIT")}
        </Button>
      </form>
    </Form>
  );
};
export default LogBatchDeleteForm;
