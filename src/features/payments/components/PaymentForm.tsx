"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import {
  CreatePaymentDto,
  createPaymentSchema,
} from "../schemas/paymentSchema";

interface PaymentFormProps {
  onSubmit: (data: CreatePaymentDto) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  defaultValues?: CreatePaymentDto;
}

export function PaymentForm({
  onSubmit,
  onCancel,
  isSubmitting,
  defaultValues,
}: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePaymentDto>({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: defaultValues || {
      amount: 0,
      paidAt: new Date().toISOString().split("T")[0],
      paymentMethod: "BANK_TRANSFER",
      notes: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="入金額" error={errors.amount?.message} required>
        <input
          type="number"
          {...register("amount", { valueAsNumber: true })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </FormField>

      <FormField label="入金日" error={errors.paidAt?.message} required>
        <input
          type="date"
          {...register("paidAt")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </FormField>

      <FormField
        label="支払方法"
        error={errors.paymentMethod?.message}
        required
      >
        <select
          {...register("paymentMethod")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="BANK_TRANSFER">銀行振込</option>
          <option value="CREDIT_CARD">クレジットカード</option>
          <option value="CASH">現金</option>
          <option value="OTHER">その他</option>
        </select>
      </FormField>

      <FormField label="備考" error={errors.notes?.message}>
        <textarea
          {...register("notes")}
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </FormField>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            キャンセル
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "登録中..." : "登録"}
        </Button>
      </div>
    </form>
  );
}
