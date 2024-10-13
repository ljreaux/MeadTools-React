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
import { DatePickerWithRange } from "@/components/ui/daterange-picker";
import { getLogs } from "@/helpers/iSpindel";
import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

const FormSchema = z
  .object({
    // other fields
    dateRange: z.object(
      {
        from: z.date(),
        to: z.date(),
      },
      {
        required_error: "Please select a date range",
      }
    ),
  })
  .refine((data) => data.dateRange.from <= data.dateRange.to, {
    path: ["dateRange"],
    message: "From date must be before to date",
  });
const DEFAULT_VALUE = {
  dateRange: {
    from: new Date(),
    to: new Date(),
  },
};

const RecentLogsForm = ({ deviceId }: { deviceId: string }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(FormSchema),
  });
  const { t } = useTranslation();
  const { token, setLogs } = useiSpindelContext();

  async function onSubmit({
    dateRange: { from, to },
  }: z.infer<typeof FormSchema>) {
    const start_date = new Date(from.setUTCHours(0, 0, 0, 0)).toISOString();
    const end_date = new Date(to.setUTCHours(23, 59, 59, 999)).toISOString();
    try {
      const logs = await getLogs(token, start_date, end_date, deviceId);
      if (!logs.length) throw new Error("No logs to display");
      setLogs(logs);
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", description: (err as Error).message });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center col-start-2 row-span-2 row-start-1 space-y-4 "
      >
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-72">
              <FormLabel htmlFor="datetime">
                {t("iSpindelDashboard.brews.startDate")}
              </FormLabel>
              <FormControl>
                <DatePickerWithRange
                  date={field.value}
                  setDate={field.onChange}
                ></DatePickerWithRange>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default RecentLogsForm;
