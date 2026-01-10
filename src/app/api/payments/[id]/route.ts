import { NextRequest, NextResponse } from "next/server";
import { updatePayment } from "@/application/usecases/payments/updatePayment";
import { deletePayment } from "@/application/usecases/payments/deletePayment";
import { getUserId } from "@/lib/auth/session";
import { handleApiError } from "@/lib/api/errorHandler";

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * PUT /api/payments/:id
 * 入金更新
 */
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const userId = await getUserId();
    const { id: paymentId } = await context.params;
    const body = await request.json();

    const payment = await updatePayment(userId, paymentId, body);

    return NextResponse.json(payment);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/payments/:id
 * 入金削除
 */
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const userId = await getUserId();
    const { id: paymentId } = await context.params;

    const result = await deletePayment(userId, paymentId);

    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}
