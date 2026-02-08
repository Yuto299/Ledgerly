import { NextRequest, NextResponse } from "next/server";
import { duplicateExpense } from "@/application/usecases/expenses/duplicateExpense";
import { getUserId } from "@/lib/auth/session";
import { handleApiError } from "@/lib/api/errorHandler";

/**
 * POST /api/expenses/[id]/duplicate
 * 経費複製
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserId();
    const expenseId = params.id;

    const duplicatedExpense = await duplicateExpense(userId, expenseId);

    return NextResponse.json(duplicatedExpense, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
