"use client";
import { useForm } from "react-hook-form";
import { Model } from "@/components/ui/model";
import { useStoreModal } from "@/hooks/use-store-modal";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
const formSchema = z.object({
  name: z.string().min(1),
});
export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [Loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/stores", values);
      window.location.assign(`/${res.data.id}`);
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Model
      title="Hello"
      description="This is a model"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={Loading} placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={Loading}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={Loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Model>
  );
};
