import { NextRequest, NextResponse } from "next/server";
import { registerPayment } from "@/application/usecases/payments/registerPayment";
import { listPaymentsByInvoice } from "@/application/usecases/payments/listPaymentsByInvoice";
import { getUserId } from "@/lib/auth/session";
import { handleApiError } from "@/lib/api/errorHandler";

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * POST /api/invoices/:id/payments
 * 入金登録
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const userId = await getUserId();
    const { id: invoiceId } = await context.params;
    const body = await request.json();

    const payment = await registerPayment(userId, invoiceId, body);

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * GET /api/invoices/:id/payments
 * 入金一覧取得
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const userId = await getUserId();
    const { id: invoiceId } = await context.params;

    const result = await listPaymentsByInvoice(userId, invoiceId);

    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}
