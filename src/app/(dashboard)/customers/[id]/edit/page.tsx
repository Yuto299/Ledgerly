"use client";

import { use } from "react";
import {
  useCustomer,
  useUpdateCustomer,
} from "@/features/customers/hooks/useCustomers";
import CustomerForm from "@/features/customers/components/CustomerForm";
import Card from "@/components/atoms/Card";
import { UpdateCustomerDto } from "@/features/customers/schemas/customerSchema";

export default function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, error: fetchError } = useCustomer(id);
  const { mutate, isPending, error: updateError } = useUpdateCustomer(id);

  const handleSubmit = (formData: UpdateCustomerDto) => {
    mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (fetchError || !data) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600">
          エラーが発生しました: {fetchError?.message || "顧客が見つかりません"}
        </p>
      </div>
    );
  }

  const { customer } = data;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">顧客編集</h1>

      {updateError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {updateError.message}
        </div>
      )}

      <Card>
        <CustomerForm
          defaultValues={{
            name: customer.name,
            contactName: customer.contactName || "",
            email: customer.email || "",
            phone: customer.phone || "",
            notes: customer.notes || "",
          }}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
      </Card>
    </div>
  );
}
