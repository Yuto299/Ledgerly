import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customerApi";
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from "../schemas/customerSchema";

/**
 * 顧客一覧取得フック
 */
export function useCustomers(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["customers", params],
    queryFn: () => getCustomers(params),
  });
}

/**
 * 顧客詳細取得フック
 */
export function useCustomer(id: string) {
  return useQuery({
    queryKey: ["customers", id],
    queryFn: () => getCustomer(id),
    enabled: !!id,
  });
}

/**
 * 顧客作成フック
 */
export function useCreateCustomer() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateCustomerDto) => createCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      router.push("/customers");
    },
  });
}

/**
 * 顧客更新フック
 */
export function useUpdateCustomer(id: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdateCustomerDto) => updateCustomer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["customers", id] });
      router.push(`/customers/${id}`);
    },
  });
}

/**
 * 顧客削除フック
 */
export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      router.push("/customers");
    },
  });
}
