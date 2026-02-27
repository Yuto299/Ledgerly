import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { markInvoicePaid } from "@/application/usecases/invoices/markInvoicePaid";
import { handleApiError } from "@/lib/api/errorHandler";

/**
 * POST /api/invoices/:id/pay
 * 請求書を入金済みにする（入金レコードを自動生成）
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = await getUserId();
    const { id } = await params;

    console.log(`[pay] userId=${userId}, invoiceId=${id}`);
    const invoice = await markInvoicePaid(userId, id);
    console.log(
      `[pay] success, paidAmount=${invoice?.paidAmount}, status=${invoice?.status}`,
    );

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("[pay] error:", error);
    return handleApiError(error);
  }
}
