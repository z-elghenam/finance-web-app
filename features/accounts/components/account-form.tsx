import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";

import { accountInsertSchema } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useCreateAccount } from "../api/use-create-account";

const formSchema = accountInsertSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  onDelete?: () => void;
  onClose: () => void;
};

export const AccountForm = ({ id, onDelete, onClose }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const { mutate, isPending } = useCreateAccount();

  const handleSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4 px-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="e.g. Cash, Bank, Credit Card"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={isPending}>
          {id ? "Save changes" : "Create account"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={isPending}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="size-4 mr-2" />
            Delete account
          </Button>
        )}
      </form>
    </Form>
  );
};
