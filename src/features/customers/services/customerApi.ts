import { Customer } from "@prisma/client";
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from "@/features/customers/schemas/customerSchema";

const API_BASE = "/api";

/**
 * APIクライアント
 */
async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Network error" }));
    throw new Error(error.error?.message || error.message || "API Error");
  }

  return response.json();
}

/**
 * 顧客一覧取得
 */
export async function getCustomers(params?: { page?: number; limit?: number }) {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", params.page.toString());
  if (params?.limit) query.set("limit", params.limit.toString());

  return fetchApi<{
    customers: Customer[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>(`/customers?${query}`);
}

/**
 * 顧客詳細取得
 */
export async function getCustomer(id: string) {
  return fetchApi<{
    customer: Customer;
    salesSummary: {
      totalInvoiced: number;
      totalPaid: number;
      unpaid: number;
    };
    projectCount: number;
  }>(`/customers/${id}`);
}

/**
 * 顧客作成
 */
export async function createCustomer(data: CreateCustomerDto) {
  return fetchApi<Customer>("/customers", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * 顧客更新
 */
export async function updateCustomer(id: string, data: UpdateCustomerDto) {
  return fetchApi<Customer>(`/customers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * 顧客削除
 */
export async function deleteCustomer(id: string) {
  return fetchApi<Customer>(`/customers/${id}`, {
    method: "DELETE",
  });
}
