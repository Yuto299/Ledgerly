"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCustomerSchema,
  CreateCustomerDto,
} from "../schemas/customerSchema";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";

interface CustomerFormProps {
  defaultValues?: Partial<CreateCustomerDto>;
  onSubmit: (data: CreateCustomerDto) => void;
  isSubmitting?: boolean;
}

export default function CustomerForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomerDto>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label="顧客名"
        required
        error={errors.name?.message}
        {...register("name")}
      />

      <FormField
        label="担当者名"
        error={errors.contactName?.message}
        {...register("contactName")}
      />

      <FormField
        label="メールアドレス"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <FormField
        label="電話番号"
        type="tel"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <div className="space-y-1">
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          メモ
        </label>
        <textarea
          id="notes"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          {...register("notes")}
        />
        {errors.notes && (
          <p className="text-sm text-red-600">{errors.notes.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "保存中..." : "保存"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
}
