import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { markInvoiceSent } from "@/application/usecases/invoices/markInvoiceSent";
import { handleApiError } from "@/lib/api/errorHandler";

/**
 * POST /api/invoices/:id/send
 * 請求書を送付済みにする
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    const { id } = await params;

    const invoice = await markInvoiceSent(userId, id);

    return NextResponse.json(invoice);
  } catch (error) {
    return handleApiError(error);
  }
}
