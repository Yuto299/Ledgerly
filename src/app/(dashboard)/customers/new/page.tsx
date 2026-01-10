"use client";

import { useRouter } from "next/navigation";
import { useCreateCustomer } from "@/features/customers/hooks/useCustomers";
import CustomerForm from "@/features/customers/components/CustomerForm";
import Card from "@/components/atoms/Card";
import { CreateCustomerDto } from "@/features/customers/schemas/customerSchema";

export default function NewCustomerPage() {
  const router = useRouter();
  const { mutate, isPending, error } = useCreateCustomer();

  const handleSubmit = (data: CreateCustomerDto) => {
    mutate(data);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">新規顧客登録</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {error.message}
        </div>
      )}

      <Card>
        <CustomerForm onSubmit={handleSubmit} isSubmitting={isPending} />
      </Card>
    </div>
  );
}
