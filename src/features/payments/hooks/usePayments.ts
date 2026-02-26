import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { paymentApi } from "../services/paymentApi";
import { CreatePaymentDto, UpdatePaymentDto } from "../schemas/paymentSchema";

/**
 * 入金一覧取得フック
 */
export function usePaymentsByInvoice(invoiceId: string) {
  return useQuery({
    queryKey: ["payments", "invoice", invoiceId],
    queryFn: () => paymentApi.listByInvoice(invoiceId),
    staleTime: 1000 * 60,
  });
}

/**
 * 入金登録フック
 */
export function useRegisterPayment(invoiceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePaymentDto) =>
      paymentApi.register(invoiceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments", "invoice", invoiceId],
      });
      queryClient.invalidateQueries({ queryKey: ["invoices", invoiceId] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
}

/**
 * 入金更新フック
 */
export function useUpdatePayment(invoiceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      paymentId,
      data,
    }: {
      paymentId: string;
      data: UpdatePaymentDto;
    }) => paymentApi.update(paymentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments", "invoice", invoiceId],
      });
      queryClient.invalidateQueries({ queryKey: ["invoices", invoiceId] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
}

/**
 * 入金削除フック
 */
export function useDeletePayment(invoiceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentId: string) => paymentApi.delete(paymentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments", "invoice", invoiceId],
      });
      queryClient.invalidateQueries({ queryKey: ["invoices", invoiceId] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
}
