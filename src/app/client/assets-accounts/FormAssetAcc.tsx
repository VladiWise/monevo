"use client";
import { Input, Select } from "@/components/form-elements";
import { FormProvider } from "@/components/FormContext";
import { Button } from "@/components/Button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useNotification } from "@/store/useNotification";

export function FormAssetAcc({
  createAcc,
  userId,
  isIIS,
}: {
  createAcc: any;
  userId: string | undefined;
  isIIS?: boolean;
}) {
  const router = useRouter();
  const notification = useNotification();
  const form = useForm({});

  async function handleOnSubmit(data: any) {
    try {
      form.reset();
      await createAcc(data, userId);
      router.refresh();
    } catch (error) {
      console.error(`Error creating ${userId}:`, error);
    }
  }

  return (
    <FormProvider
      form={form}
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-3"
    >
      <Input name="shortName" type="text" placeholder="Short name" required />
      <Input name="fullName" type="text" placeholder="Full name" required />
{      isIIS && <Select name="isIIS" required>
        <option value="false">Not IIS</option>
        <option value="true">IIS</option>
      </Select>}
      <Button type="submit">Create</Button>
    </FormProvider>
  );

  async function onSubmit(data: any) {
    notification
      .promise(handleOnSubmit(data), {
        loading: "Creating...",
        success: "Successfully created!",
        error: "Failed to create.",
      })
      .catch(() => {});
  }
}
