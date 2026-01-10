import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { listInvoices } from "@/application/usecases/invoices/listInvoices";
import { createInvoice } from "@/application/usecases/invoices/createInvoice";
import { handleApiError } from "@/lib/api/errorHandler";
import { InvoiceStatus } from "@prisma/client";

/**
 * GET /api/invoices
 * 請求書一覧取得
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();

    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const customerId = searchParams.get("customerId") || undefined;
    const projectId = searchParams.get("projectId") || undefined;
    const status = searchParams.get("status") as InvoiceStatus | undefined;

    const result = await listInvoices(userId, {
      page,
      limit,
      customerId,
      projectId,
      status,
    });

    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/invoices
 * 請求書作成
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId();
    const body = await request.json();

    const invoice = await createInvoice(userId, body);

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
