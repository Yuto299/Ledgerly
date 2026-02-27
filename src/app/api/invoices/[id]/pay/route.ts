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

    const invoice = await markInvoicePaid(userId, id);

    return NextResponse.json(invoice);
  } catch (error) {
    return handleApiError(error);
  }
}
