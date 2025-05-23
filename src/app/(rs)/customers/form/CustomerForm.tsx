"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType,
} from "@/zod-schemas/customer";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { Button } from "@/components/ui/button";
import { TextareaWithLabel } from "@/components/inputs/TextareaWithLabel";

import { CheckBoxWithLabel } from "@/components/inputs/CheckBoxWithLabel";

import { useAction } from "next-safe-action/hooks";

import { saveCustomerAction } from "@/app/actions/saveCustomerAction";
import { toast } from "sonner";

import { LoaderCircle } from "lucide-react";
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
type Props = {
  customer?: selectCustomerSchemaType;
  isManager?: boolean | undefined;
};

export default function CustomerForm({ customer, isManager = false }: Props) {
  const searchParams = useSearchParams();
  const hasCustomerId = searchParams.has("customerId");

  const emptyValues: insertCustomerSchemaType = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    notes: "",
    active: true,
  };

  const defaultValues: insertCustomerSchemaType = hasCustomerId
    ? {
        id: customer?.id ?? 0,
        firstName: customer?.firstName ?? "",
        lastName: customer?.lastName ?? "",
        email: customer?.email ?? "",
        phone: customer?.phone ?? "",
        address1: customer?.address1 ?? "",
        address2: customer?.address2 ?? "",
        city: customer?.city ?? "",
        zip: customer?.zip ?? "",
        notes: customer?.notes ?? "",
        active: customer?.active ?? true,
      }
    : emptyValues;

  const form = useForm<insertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(hasCustomerId ? defaultValues : emptyValues);
  }, [searchParams.get("customerId")]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    execute: excuteSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction,
  } = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      toast("Success 🎉", {
        description: data?.message,
      });
    },
    onError() {
      toast.error("Error", {
        description: "Save Failed",
      });
    },
  });

  async function submitForm(data: insertCustomerSchemaType) {
    excuteSave(data);
  }
  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />

      <div>
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "New"} Customer
          {customer?.id ? `#${customer?.id}` : "Form"}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col md:flex-row gap-4 sm:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Last Name"
              nameInSchema="lastName"
            />

            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Adress 1"
              nameInSchema="address1"
            />

            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Adress 2"
              nameInSchema="address2"
            />

            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="City"
              nameInSchema="city"
            />

            {isManager && customer?.id ? (
              <div className="mt-4">
                <CheckBoxWithLabel<insertCustomerSchemaType>
                  fieldTitle="Active"
                  nameInSchema="active"
                  message="Yes"
                />
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Zip"
              nameInSchema="zip"
            />

            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Email"
              nameInSchema="email"
            />

            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Phone"
              nameInSchema="phone"
            />

            <TextareaWithLabel<insertCustomerSchemaType>
              fieldTitle="Notes"
              nameInSchema="notes"
              className="h-30 resize-none"
            />

            <div className="flex gap-4 mt-8">
              <Button
                type="submit"
                className="w-3/4 gap-2"
                variant="default"
                title="Save"
                disabled={isSaving}
              >
                {isSaving && <LoaderCircle className="animate-spin" />}
                Save
              </Button>

              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={() => {
                  form.reset(defaultValues);
                  resetSaveAction();
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
