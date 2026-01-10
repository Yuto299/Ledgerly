import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { getInvoiceById } from "@/application/usecases/invoices/getInvoiceById";
import { updateInvoice } from "@/application/usecases/invoices/updateInvoice";
import { deleteInvoice } from "@/application/usecases/invoices/deleteInvoice";
import { handleApiError } from "@/lib/api/errorHandler";

/**
 * GET /api/invoices/:id
 * 請求書詳細取得
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    const { id } = await params;

    const result = await getInvoiceById(userId, id);

    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/invoices/:id
 * 請求書更新
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    const { id } = await params;
    const body = await request.json();

    const invoice = await updateInvoice(userId, id, body);

    return NextResponse.json(invoice);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/invoices/:id
 * 請求書削除
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    const { id } = await params;

    const result = await deleteInvoice(userId, id);

    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}
